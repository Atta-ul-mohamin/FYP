
Parse.Cloud.define("education_proffesion", async (request) => {
    const profession = Parse.Object.extend("profession");
    const user = new profession();
    user.set("schooName", request.params.schoolName);
    user.set("schoolClass", request.params.schoolClass);
    user.set("schoolType", request.params.schoolType);
    user.set("collegeName", request.params.collegeName);
    user.set("collegeClass", request.params.collegeClass);
    user.set("collegeType", request.params.collegeType);
    user.set("universityName", request.params.universityName);
    user.set("universityDegree", request.params.collegeClass);
    user.set("skills", request.params.skills);
    user.set("hobbies", request.params.hobbies); 
    // user.set("userId", request.params.userId)
    user.set("userId", { "__type": "Pointer", "className": "MUserT", "objectId": request.params.userId });
    const result = await user.save();
    if (result)
    return{
        status:1
    };
    else
    return{
        status:0
    }
    });


    
    Parse.Cloud.define("getProfessionById", async (request) => {
        const { id } = request.params;
        const Profession = Parse.Object.extend("profession");
        const query = new Parse.Query(Profession);
      
        // Adjust the query to match 'userId' field with the provided 'id'
        query.equalTo("userId", id); // This line is changed to search by userId
      
        try {
          const profession = await query.first(); // Use first() if you expect a single result for a given userId
      
          if (!profession) {
            // If no profile is found, return a message indicating that
            return {
              status: 0,
              message: "Profession details not found",
            };
          }
      
          // Assuming profile exists, construct response data
          const responseData = {
            objectId: profession.id,
            schoolname:  profession.get("schooName"),
            schoolclass: profession.get("schoolClass"),
            schooltype: profession.get("schoolType"),
            collegename: profession.get("collegeName"),
            collegeclass: profession.get("collegeClass"),
            collegetype: profession.get("collegeType"),
            universityname: profession.get("universityName"),
            universitydegree: profession.get("universityDegree"),
            skills: profession.get("skills"),
            hobbies: profession.get("hobbies"),
            userId: profession.get("userId"), // This should match the provided id
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



      Parse.Cloud.define("update_proffesionuser", async (request) => {
        const { professionId,schoolName,schoolClass , schoolType , collegeName , collegeClass , collegeType, universityName, universityDegree , skills, hobbies,userId  } = request.params;
   
    
            const query = new Parse.Query("profession");
            const profession = await query.get(professionId, { useMasterKey: true });
          
            if (profession) {
                profession.set("schooName", schoolName);
    profession.set("schoolClass", schoolClass);
    profession.set("schoolType", schoolType);
    profession.set("collegeName", collegeName);
    profession.set("collegeClass", collegeClass);
    profession.set("collegeType", collegeType);
    profession.set("universityName", universityName);
    profession.set("universityDegree", universityDegree);
    profession.set("skills", skills);
    profession.set("hobbies", hobbies); 
    // profession.set("userId", userId)
    profession.set("userId", { "__type": "Pointer", "className": "MUserT", "objectId": userId });
      
              await profession.save(null, { useMasterKey: true });
              return { 
                status: 1 
               }; // Indicate success
            } else {
              return { status: 0 }; // User not found
            }
      });



      Parse.Cloud.define("deleteprofession", async (request) => {
        const userId = request.params.userId;
        const query = new Parse.Query("profession");
        console.log(query);
        query.equalTo("userId", userId);
         
        const user = await query.first({ useMasterKey: true });
        console.log(user);
        if (user) {
          await user.destroy({ useMasterKey: true });
          return { status: 1 }; // Indicate success
        } else {
          return { status: 0 }; // User not found
        }
      });
  