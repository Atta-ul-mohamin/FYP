Parse.Cloud.define("addUserStudent", async (request) => {
    const MUser = Parse.Object.extend("MUser");
    const user = new MUser(); 

    user.set("name", request.params.name);
    user.set("email", request.params.email);
    user.set("password", request.params.password);

    // Perform a query to check if the email already exists in the dashboard
    const query = new Parse.Query(MUser);
    query.equalTo("email", request.params.email);
    const existingUser = await query.first();

    if (existingUser) {
        // Email already exists, return status 0
        return { status: 0, message: "Email already exists." };
    } else {
        // Email does not exist, save the new user
        const result = await user.save();
        return result;
    }
});




Parse.Cloud.define("loginStudent", async (request) => {
  const { email, password } = request.params;

  const query = new Parse.Query("MUser");
  query.equalTo("email", email);
  query.equalTo("password", password);

  const user = await query.first();

  if (user) {
    user.set("lastLogin", new Date()); // Set the last login date
    await user.save(null, { useMasterKey: true });

    return {
      status: 1,
      name: user.get('name'),
      objectId: user.id 
    };
  } else {
    console.log('error 2');
    return { status: 0 };
  }
});



Parse.Cloud.define("deleteUserStudent", async (request) => {
  const objectId = request.params.objectId;
  console.log(objectId);
  const query = new Parse.Query("MUser");
  console.log(query);
  query.equalTo("objectId", objectId);
   
  const user = await query.first({ useMasterKey: true });
  console.log(user);
  if (user) {
    await user.destroy({ useMasterKey: true });
    return { status: 1 }; // Indicate success
  } else {
    return { status: 0 }; // User not found
  }
});



Parse.Cloud.define("updateUserStudent", async (request) => {
  const { objectId, name } = request.params;

  const query = new Parse.Query("MUser");
  const user = await query.get(objectId, { useMasterKey: true });

  if (user) {
    user.set("name", name);
    await user.save(null, { useMasterKey: true });
    return { 
      status: 1 
     }; // Indicate success
  } else {
    return { status: 0 }; // User not found
  }
});

Parse.Cloud.define("current_user_name", async (request) => {
  const { objectId  } = request.params;
  const query = new Parse.Query("MUser");
  query.equalTo("objectId", objectId);

  const user = await query.first();
  
  if (user) {
    
    return { 
      status: 1,
      name: user.get('name'),
     }; // Indicate success
  } else {
    return { status: 0 }; // User not found
  }
});

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              