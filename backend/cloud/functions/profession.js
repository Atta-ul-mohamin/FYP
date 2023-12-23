
Parse.Cloud.define("education_proffesion", async (request) => {
    const profession = Parse.Object.extend("profession");
    const user = new profession();
    user.set("nameSchool", request.params.nameSchool);
    user.set("field", request.params.field);
    user.set("subjectsToTeach", request.params.subjectsToTeach);
    user.set("category", request.params.category);
    user.set("userId", request.params.userId); 
    const result = await user.save();
    return result;
    });
