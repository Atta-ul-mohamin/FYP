
Parse.Cloud.define("TeacherDataByIds", async (request) => {
  const { id } = request.params;
  const MUserT = Parse.Object.extend("MUserT");
  const query = new Parse.Query(MUserT);

  try {
    const teacherdata = await query.get(id);
    return {
      status: 1,
      data: teacherdata,
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


Parse.Cloud.define("getTeacherIdsByStudent", async (request) => {
  const studentId = request.params.studentId;
  const query = new Parse.Query("Conversation");
  query.equalTo("participant1", studentId);

  // Include the student pointer (assuming 'participant1' is the key for the student pointer)
  query.include("participant2");

  const conversations = await query.find();
  return conversations.map(conv => {
    // Extract the objectId of the student from the pointer
    const teacher = conv.get("participant2");
    return teacher ? teacher.id : null;
  }).filter(id => id != null); // Filter out null values
});








Parse.Cloud.define("getTeacherNamesByIds", async (request) => {
  const teacherIds = request.params.teacherIds.filter(id => id != null);

  // Check if the filtered array is not empty
  if (teacherIds.length === 0) {
    return [];  // Return an empty array if no valid IDs are provided
  }

  const query = new Parse.Query("MUserT");
  query.containedIn("objectId", teacherIds);

  const teachers = await query.find();
  
  // Return the full student data
  return teachers.map(teacher => {
    // If you want to return the complete object including all fields
    // return student.toJSON();

    // Alternatively, if you want to return specific fields only
    return {
      id: teacher.id,
      name: teacher.get("firstname"),
      // other fields you want to include
    };
  });
});

Parse.Cloud.define("getConversationIDStudent", async (request) => {
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




Parse.Cloud.define("sendMessageStudent", async (request) => {
  const { senderId, receiverId, text } = request.params;
 
  // Find or create a conversation
  let conversation = await findOrCreateConversationStudent(senderId, receiverId);

  // Create a message in the Message class
  const Message = Parse.Object.extend("Message");
  const message = new Message();


  message.set("sender", { "__type": "Pointer", "className": "MUser", "objectId": senderId });
  message.set("receiver", { "__type": "Pointer", "className": "MUserT", "objectId": receiverId });
  message.set("conversation", { "__type": "Pointer", "className": "Conversation", "objectId": conversation.id });
  const nullPointer = { "__type": "Pointer", "className": "MUser", "objectId": "nullIndicator" };
  const nullPointer1 = { "__type": "Pointer", "className": "MUserT", "objectId": "nullIndicator" };
  message.set("sender1", nullPointer1);
  message.set("receiver1", nullPointer);

  message.set("text", text);
  
  // Save the message
  await message.save();

  // Return the message object
  return {
    message: message,

    conversationId: conversation.id
  };
});

async function findOrCreateConversationStudent(senderId, receiverId) {
  const Conversation = Parse.Object.extend("Conversation");
  const query = new Parse.Query(Conversation);

  // Use a compound query to find if a conversation already exists between the two users
  const query1 = new Parse.Query(Conversation);
  query1.equalTo("participant1", { "__type": "Pointer", "className": "MUser", "objectId": senderId });
  query1.equalTo("participant2", { "__type": "Pointer", "className": "MUserT", "objectId": receiverId });

  const query2 = new Parse.Query(Conversation);
  query2.equalTo("participant1", { "__type": "Pointer", "className": "MUserT", "objectId": receiverId });
  query2.equalTo("participant2", { "__type": "Pointer", "className": "MUser", "objectId": senderId });

  const mainQuery = Parse.Query.or(query1, query2);
  let conversation = await mainQuery.first();

  if (!conversation) {
    // Create a new conversation if one does not exist
    conversation = new Conversation();
    conversation.set("participant1", { "__type": "Pointer", "className": "MUser", "objectId": senderId });
    conversation.set("participant2", { "__type": "Pointer", "className": "MUserT", "objectId": receiverId });
    await conversation.save();
  }

  return conversation;
}


// In your Cloud Code (user.js)
Parse.Cloud.define("getMessagesStudent", async (request) => {
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
      const sender = message.get("sender");
      const receiver = message.get("receiver");
      return {
        objectId: message.id,
        text: message.get("text"),
       
        senderId: sender ? sender.id : null,
        receiverId: receiver ? receiver.id : null,
         sender1:message.get("sender1"),
        createdAt: message.get("createdAt"),
      };
    });
  } catch (error) {
    console.error('Error fetching messages', error);
    return [];
  }
});

