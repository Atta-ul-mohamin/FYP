Parse.Cloud.define("addUser", async (request) => {
    const MUser = Parse.Object.extend("MUser");
    const user = new MUser();
    user.set("firstname", request.params.firstname);
    user.set("email", request.params.email);
    user.set("password", request.params.password);
    const result = await user.save();
    return result;
    });