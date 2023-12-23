Parse.Cloud.define("profileuser", async (request) => {
    const profile = Parse.Object.extend("profile");
    const user = new profile();
    user.set("city", request.params.city);
    user.set("location", request.params.location);
    user.set("gender", request.params.gender);
    user.set("Age_profile", request.params.Age_profile);
    user.set("language", request.params.language);
    user.set("description", request.params.discription);
    user.set("userId", request.params.userId); 
    if (request.params.image) {
        user.set("image", request.params.image);
      }
    const result = await user.save();
    return result;
    });