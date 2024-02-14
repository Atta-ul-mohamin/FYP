Parse.Cloud.define("profileuser", async (request) => {
    const profile = Parse.Object.extend("profile");
    const user = new profile();
    user.set("phone", request.params.phone);
    user.set("gender", request.params.gender);
    user.set("age", request.params.age);
    user.set("location", request.params.location);
    user.set("language", request.params.language);
    user.set("description", request.params.description);
    user.set("userId", request.params.userId); 
    // if (request.params.image) {
    //     user.set("image", request.params.image);
    //   }

    const result = await user.save();
    if(result)
     return{ status:1
  }
  else
  return{
    status : 0  }
    });

    Parse.Cloud.define("update_profileuser", async (request) => {
      const { profileId, teacherid,phone,gender,age,location,language, description ,userId  } = request.params;
    
  
      
  
          const query = new Parse.Query("profile");
          const profile = await query.get(profileId, { useMasterKey: true });
        
          if (profile) {
   
        profile.set("phone", phone);
    profile.set("gender", gender);
    profile.set("age", age);
    profile.set("location", location);
    profile.set("language", language);
    profile.set("description", description);
    profile.set("userId", request.params.userId); 
            await profile.save(null, { useMasterKey: true });
            return { 
              status: 1 
             }; // Indicate success
          } else {
            return { status: 0 }; // User not found
          }
  
        
    });



    Parse.Cloud.define("getProfileById", async (request) => {
      const { id } = request.params;
      const Profile = Parse.Object.extend("profile");
      const query = new Parse.Query(Profile);
    
      // Adjust the query to match 'userId' field with the provided 'id'
      query.equalTo("userId", id); // This line is changed to search by userId
    
      try {
        const profile = await query.first(); // Use first() if you expect a single result for a given userId
    
        if (!profile) {
          // If no profile is found, return a message indicating that
          return {
            status: 0,
            message: "Profile not found",
          };
        }
    
        // Assuming profile exists, construct response data
        const responseData = {
          objectId: profile.id,
          phone: profile.get("phone"),
          gender: profile.get("gender"),
          age: profile.get("age"),
          location: profile.get("location"),
          language: profile.get("language"),
          description: profile.get("description"),
          userId: profile.get("userId"), // This should match the provided id
        };
    
        // Return the response data with status code indicating success
        return {
          status: 1,
          data: responseData,
        };
      } catch (error) {
        console.error('Error fetching profile by ID', error);
        return {
          status: 0,
          message: "Error fetching profile by ID",
          error: error.message,
        };
      }
    });
    

    Parse.Cloud.define("deleteProfile", async (request) => {
      const ProfileId = request.params.ProfileId;
      const query = new Parse.Query("profile");
      console.log(query);
      query.equalTo("userId", ProfileId);
       
      const user = await query.first({ useMasterKey: true });
      console.log(user);
      if (user) {
        await user.destroy({ useMasterKey: true });
        return { status: 1 }; // Indicate success
      } else {
        return { status: 0 }; // User not found
      }
    });


    