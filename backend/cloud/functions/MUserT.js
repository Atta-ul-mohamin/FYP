Parse.Cloud.define("addUserTeacher", async (request) => {

    const MUserT = Parse.Object.extend("MUserT");
    const user = new MUserT();
    user.set("firstname", request.params.firstname);
    user.set("email", request.params.email);
    user.set("password", request.params.password);
    const result = await user.save();
    return result;
    });

    // Parse.Cloud.define("loginTeacher", async (request) => {
    //     const { email, password } = request.params;
      
    //     const query = new Parse.Query("MUserT");
    //     query.equalTo("email", email);
    //     query.equalTo("password", password);
      
    //     const user = await query.first();
      
    //     if (user) {

    //       return {
    //         status: 1,
    //         firstname: user.get('firstname'),
    //          objectId: user.id 
    //       };
    //     } else {
    //       console.log('error 2');
          
    //       return {
    //         status: 0
    //       };
    //     }
    //   });


      Parse.Cloud.define("loginTeacher", async (request) => {
        const { email, password } = request.params;
    
        const query = new Parse.Query("MUserT");
        query.equalTo("email", email);
        query.equalTo("password", password);
    
        const user = await query.first();
    
        if (user) {
            // Initialize queries for profile and profession
            const profileQuery = new Parse.Query("profile");
            const professionQuery = new Parse.Query("profession");
            console.log(user);
            // Set queries to check for pointer to the MUserT object
            profileQuery.equalTo("userId", user.id); // Assuming MUserTPtr is the pointer field in Profile
            professionQuery.equalTo("userId", user.id); // Assuming MUserTPtr is the pointer field in Profession
    
            // Execute both queries concurrently
            const [profile, profession] = await Promise.all([profileQuery.first(), professionQuery.first()]);
    
            // Determine the presence of MUserT in profile and profession
            if (profile && profession) {
                // Present in both
                return { status: 2, firstname: user.get('firstname'), objectId: user.id };
            } 
            else if (profile && !profession) {
                // Present only in profile
                return { status: 3, firstname: user.get('firstname'), objectId: user.id };
            } 
            else if (!profile && profession) {
              // Present only in profile
              return { status: 5, firstname: user.get('firstname'), objectId: user.id };
          } 
            else if (!profile && !profession) {
                // Not present in both
                return { status: 4, firstname: user.get('firstname'), objectId: user.id };
            }
        } else {
            console.log('error 2');
            // Login failed. You can return an error message.
            return { status: 0 };
        }
    });
    


      Parse.Cloud.define("getSignupById", async (request) => {
        const { id } = request.params;
        const signup = Parse.Object.extend("MUserT");
        const query = new Parse.Query(signup);
      
        // Adjust the query to match 'userId' field with the provided 'id'
        query.equalTo("objectId", id); // This line is changed to search by userId
      
        try {
          const Signup = await query.first(); // Use first() if you expect a single result for a given userId
      
          if (!Signup) {
            // If no profile is found, return a message indicating that
            return {
              status: 0,
              message: "Sign up teacher data not found",
            };
          }
      
          // Assuming profile exists, construct response data
          const responseData = {
            objectId: Signup.id,
            name: Signup.get("firstname"),
            email: Signup.get("email"),
            created: Signup.get("createdAt"),
           
          };
      
          // Return the response data with status code indicating success
          return {
            status: 1,
            data: responseData,
          };
        } catch (error) {
          console.error('Error fetching Signup teacher data by ID', error);
          return {
            status: 0,
            message: "Error fetching  Signup teacher data by ID",
            error: error.message,
          };
        }
      });