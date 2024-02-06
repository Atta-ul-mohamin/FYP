
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
    user.set("userID", request.params.userId)
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
