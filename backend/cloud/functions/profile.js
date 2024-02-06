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