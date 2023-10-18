Parse.Cloud.define("profileuser", async (request) => {
    const profile = Parse.Object.extend("profile");
    const user = new profile();
    user.set("firstname", request.params.firstname);
    user.set("lastname", request.params.firstname);
    user.set("email", request.params.email);
    user.set("city", request.params.city);
    user.set("location", request.params.location);
    user.set("gender", request.params.gender);
    user.set("Age_profile", request.params.Age_profile);
    user.set("language", request.params.language);
    user.set("discription", request.params.discription);
    const result = await user.save();
    return result;
    });