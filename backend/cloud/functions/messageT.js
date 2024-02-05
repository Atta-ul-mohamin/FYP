
      Parse.Cloud.define("getStudentIdsByTeacher", async (request) => {
        const teacherId = request.params.teacherId;
        const query = new Parse.Query("Conversation");
        query.equalTo("participant2", teacherId);
      
        // Include the student pointer (assuming 'participant1' is the key for the student pointer)
        query.include("participant1");
      
        const conversations = await query.find();
        return conversations.map(conv => {
          // Extract the objectId of the student from the pointer
          const student = conv.get("participant1");
          return student ? student.id : null;
        }).filter(id => id != null); // Filter out null values
      });
      
      
   

      Parse.Cloud.define("getStudentNamesByIds", async (request) => {
        const studentIds = request.params.studentIds.filter(id => id != null);
      
        // Check if the filtered array is not empty
        if (studentIds.length === 0) {
          return [];  // Return an empty array if no valid IDs are provided
        }
      
        const query = new Parse.Query("MUser");
        query.containedIn("objectId", studentIds);
      
        const students = await query.find();
        
        // Return the full student data
        return students.map(student => {
          // If you want to return the complete object including all fields
          // return student.toJSON();
      
          // Alternatively, if you want to return specific fields only
          return {
            id: student.id,
            name: student.get("name"),
            // other fields you want to include
          };
        });
      });


      Parse.Cloud.define("getStudentDataByIds", async (request) => {
        const { id } = request.params;
        const MUser = Parse.Object.extend("MUser");
        const query = new Parse.Query(MUser);
      
        try {
          const studentdata = await query.get(id);
          return {
            status: 1,
            data: studentdata,
          };
        } catch (error) {
          console.error('Error fetching student data by ID', error);
          return {
            status: 0,
            message: "Error fetching student data by ID",
            error: error.message,
          };
        }
      });
      

      Parse.Cloud.define("sendMessageTeacher", async (request) => {
        const { senderId, receiverId, text } = request.params;
      
        // Find or create a conversation
        let conversation = await findOrCreateConversationTeacher(senderId, receiverId);
      
        // Create a message in the Message class
        const Message = Parse.Object.extend("Message");
        const message = new Message();
      
        message.set("sender1", { "__type": "Pointer", "className": "MUserT", "objectId": senderId });
        message.set("receiver1", { "__type": "Pointer", "className": "MUser", "objectId": receiverId });
        message.set("conversation", { "__type": "Pointer", "className": "Conversation", "objectId": conversation.id });
        const nullPointer = { "__type": "Pointer", "className": "MUserT", "objectId": "nullIndicator" };
        const nullPointer1 = { "__type": "Pointer", "className": "MUser", "objectId": "nullIndicator" };
        message.set("sender", nullPointer1);
        message.set("receiver", nullPointer);
        message.set("text", text);
        
        // Save the message
        await message.save();
      
        // Return the message object
        return {
          message: message,
      
          conversationId: conversation.id
        };
      });


      async function findOrCreateConversationTeacher(senderId, receiverId) {
        const Conversation = Parse.Object.extend("Conversation");
        const query = new Parse.Query(Conversation);
      
        // Use a compound query to find if a conversation already exists between the two users
        const query1 = new Parse.Query(Conversation);
        query1.equalTo("participant1", { "__type": "Pointer", "className": "MUserT", "objectId": senderId });
        query1.equalTo("participant2", { "__type": "Pointer", "className": "MUser", "objectId": receiverId });
      
        const query2 = new Parse.Query(Conversation);
        query2.equalTo("participant1", { "__type": "Pointer", "className": "MUser", "objectId": receiverId });
        query2.equalTo("participant2", { "__type": "Pointer", "className": "MUserT", "objectId": senderId });
      
        const mainQuery = Parse.Query.or(query1, query2);
        let conversation = await mainQuery.first();
      
        if (!conversation) {
          // Create a new conversation if one does not exist
          conversation = new Conversation();
          conversation.set("participant1", { "__type": "Pointer", "className": "MUserT", "objectId": senderId });
          conversation.set("participant2", { "__type": "Pointer", "className": "MUser", "objectId": receiverId });
          await conversation.save();
        }
      
        return conversation;
      }



Parse.Cloud.define("getConversationIDTeacher", async (request) => {
  const { TeacherID, StudentID  } = request.params;

  const query = new Parse.Query("Conversation");
  query.equalTo("participant2", TeacherID);
  query.equalTo("participant1", StudentID);

  const conversation = await query.first();

  if (conversation) {
    
    return {
    
      objectId: conversation.id, 
    };
  } else {
    return { message: 'No conversation found', objectId: null };
   
  }
});


Parse.Cloud.define("getMessagesTeacher", async (request) => {
  const { conversationId } = request.params;
  const Message = Parse.Object.extend("Message");
  const query = new Parse.Query(Message);
  query.equalTo("conversation", { "__type": "Pointer", "className": "Conversation", "objectId": conversationId });
  query.include("sender");
  query.include("receiver");
  query.ascending("createdAt"); // Optionally, sort the messages

  try {
    const messages = await query.find();
    return messages.map(message => {
      const sender = message.get("sender1");
      const receiver = message.get("receiver1");
      return {
        objectId: message.id,
        text: message.get("text"),
       
            senderId: sender ? sender.id : null,
            receiverId: receiver ? receiver.id : null,
         sender:message.get("sender"),
        createdAt: message.get("createdAt"),
      };
    });
  } catch (error) {
    console.error('Error fetching messages', error);
    return [];
  }
});


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              