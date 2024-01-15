Parse.Cloud.define("addUser", async (request) => {

    const MUserT = Parse.Object.extend("MUserT");
    const user = new MUserT();
    user.set("firstname", request.params.firstname);
    user.set("email", request.params.email);
    user.set("password", request.params.password);
    const result = await user.save();
    return result;
    });

    Parse.Cloud.define("login", async (request) => {
        const { email, password } = request.params;
      
        const query = new Parse.Query("MUserT");
        query.equalTo("email", email);
        query.equalTo("password", password);
      
        const user = await query.first();
      
        if (user) {
          return {
            status: 1,
            firstname: user.get('firstname'),
             objectId: user.id 
          };
        } else {
          console.log('error 2');
          // Login failed. You can return an error message.
          return {
            status: 0
          };
        }
      });



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
      

      Parse.Cloud.define("sendMessage", async (request) => {
        const { senderId, receiverId, text } = request.params;
      
        // Find or create a conversation
        let conversation = await findOrCreateConversation(senderId, receiverId);
      
        // Create a message in the Message class
        const Message = Parse.Object.extend("Message");
        const message = new Message();
      
        message.set("sender1", { "__type": "Pointer", "className": "MUserT", "objectId": senderId });
        message.set("receiver1", { "__type": "Pointer", "className": "MUser", "objectId": receiverId });
        message.set("conversation", { "__type": "Pointer", "className": "Conversation", "objectId": conversation.id });
        message.set("text", text);
        
        // Save the message
        await message.save();
      
        // Return the message object
        return {
          message: message,
      
          conversationId: conversation.id
        };
      });


      async function findOrCreateConversation(senderId, receiverId) {
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
      