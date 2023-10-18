Parse.Cloud.define("addUser", async (request) => {
    const profession = Parse.Object.extend("profession");
    const user = new profession();
    user.set("occupation", request.params.occupation);
    user.set("start_date", request.params.start_date);
    user.set("end_date", request.params.end_date);
    user.set("skills", request.params.skills);
    user.set("university", request.params.university);
    user.set("college", request.params.college);
    user.set("degree", request.params.degree);
    user.set("certificates", request.params.certificates);
    const result = await user.save();
    return result;
    });

