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
      objectId: user.id,
      image:user.get('image')
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


Parse.Cloud.define("update_image_student", async (request) => {
  // Destructure the image and userId from the request parameters
  const { image, userId } = request.params;

  if (!userId || !image) {
    throw new Error("userId and image are required.");
  }

  // Create a query for the MUser class
  const query = new Parse.Query("MUser");

  try {
    // Use the userId to get the specific MUser object
    const user = await query.get(userId, { useMasterKey: true });

    if (!user) {
      throw new Error(`User not found with id: ${userId}`);
    }

    // Update the image field of the MUser object
    user.set("image", image);

    // Save the updated user object back to the database
    // Use the master key if necessary, especially if there are ACL restrictions
    await user.save(null, { useMasterKey: true });

    return { status: 1, message: "Image updated successfully." };
  } catch (error) {
    throw new Error(`Error updating image: ${error.message}`);
  }
});



                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              


Parse.Cloud.define("getMUserById", async (request) => {
  const { id } = request.params;

  if (!id) {
    throw new Error("An ID must be provided.");
  }

  const query = new Parse.Query("MUser");
  try {
    const user = await query.get(id, { useMasterKey: true });

    if (!user) {
      throw new Error(`User not found with id: ${id}`);
    }

    // Assuming 'name' is the field for the user's name and 'image' for the image.
    const name = user.get("name");
    const image = user.get("image"); // This could be a URL or a Parse.File object, depending on your schema

    // Prepare the image data appropriately depending on its type
    let imageData = null;
    if (image) {
      if (typeof image === 'string') {
        // If the image is stored as a URL string
        imageData = image;
      } else if (image.url) {
        // If the image is a Parse.File object
        imageData = image.url();
      }
    }

    return { status:1,name : name, image: imageData };
  } catch (error) {
    throw new Error(`Error fetching user by id: ${error.message}`);
  }
});
