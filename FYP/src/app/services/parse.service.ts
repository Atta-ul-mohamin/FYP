import { Injectable } from '@angular/core';
import * as Parse from 'parse' ;
import { Message } from '../chat-page/message.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ParseService {
  private readonly USER_KEY = 'currentUser';
  constructor(private http: HttpClient) {
    Parse.initialize('myAppId', 'myMasterKey');
    (Parse as any).serverURL = 'http://localhost:1336/parse';

        // Retrieve the user from local storage on service initialization
        const storedUser = localStorage.getItem(this.USER_KEY);
        if (storedUser) {
          this.currentUser = JSON.parse(storedUser);
        }
   }
   async signup(firstname:string, email:string , password:string){
    const params = {firstname, email, password};
     await Parse.Cloud.run("addUserTeacher",params)

   }

   // In ParseService
async submitProfileWithBinaryString(phone: number, gender: string, age: number, location: string, language: string, description: string, binaryString: string) {
  // Assuming binaryString needs to be converted or handled according to your backend requirements
  const params = {
    phone,
    gender,
    age,
    location,
    language,
    description,
    binaryString, // Pass the binary string
    userId: this.currentUser.objectId
  };

  // Adjust your cloud function or server-side logic to handle the binaryString
  const result = await Parse.Cloud.run("profileWithBinaryString", params);
  console.log(result,"result from image js file is");
  return result;
}


   async submitProfileWithImage(phone: number, gender: string, age: number, location: string, language: string, description: string, file: File) {
    const maxFileSizeAllowedInBytes = 10485760; // Example: 10 MB limit (in bytes)
    if (file.size > maxFileSizeAllowedInBytes) {
      throw new Error('File size exceeds the maximum limit allowed.');
    }
    try {
      const parseFile = new Parse.File(file.name, file);
      await parseFile.save();
      const params = {
        phone,
        gender,
        age,
        location,
        language,
        description,
        image: parseFile, // Pass the Parse.File object
        userId: this.currentUser.objectId
      };
  
      const result = await Parse.Cloud.run("profileuser", params);
      return result;
    } catch (error) {
      console.error('Error while saving file:', error);
      throw error; // Rethrow the error to propagate it to the caller
    }
  }
  

   async login(email: string, password: string)  {
    const params ={email,password};
    const response = await Parse.Cloud.run("loginTeacher" , params);
    if(response.status === 2  || response.status === 3 || response.status === 4   ) {
      this.currentUser = response;
          // Save user to local storage on successful login
          localStorage.setItem(this.USER_KEY, JSON.stringify(response));
      console.log(this.currentUser.objectId);
    }
    return response;
  }
  private currentUser: any;

  get user() {
    return this.currentUser;
  }
  
  set user(value: any) {
    this.currentUser = value;
  }

  async getCurrentUserData() {
    if (this.currentUser && this.currentUser.objectId) {
      const params = { objectId: this.currentUser.objectId };
      const result = await Parse.Cloud.run('current_user_data' , params)
      return result;
     
  }
}
async updateCurrentUserName(name: string) {
  if (this.currentUser && this.currentUser.objectId) {
    const params = { objectId: this.currentUser.objectId , name};
    alert('User name Updated Successfully !!!');
    await Parse.Cloud.run('updateUserName', params);
  } else {
    alert('No user is currently logged in.');
  }
}

async updateCurrentUserEmail(email: string) {
  if (this.currentUser && this.currentUser.objectId) {
    const params = { objectId: this.currentUser.objectId , email};
    alert('email  Updated Successfully !!!');
    await Parse.Cloud.run('updateUserEmail', params);
  } else {
    alert('No user is currently logged in.');
  }
}

  
   async submit_profile( phone:number, gender:string,age:number ,location:string,language:string,description:string){
   
    const params = { phone,gender,age,location,language, description ,userId :this.currentUser.objectId}
    console.log(this.currentUser.objectId);
     const result = await Parse.Cloud.run("profileuser",params)
     return result;
   }

   async update_submit_profile( profileId : string, teacherid: string ,phone:string, gender:string,age:number,location:string,language:string,description:string,stringImage:string){
   
    const params = { profileId,teacherid,phone,gender,age,location,language, description ,stringImage ,userId :this.currentUser.objectId}
     const result = await Parse.Cloud.run("update_profileuser",params)
     return result;
   }
  
   async submit_education_proffesion(schoolName: string , schoolClass : string , schoolType : string , collegeName : string , collegeClass : string , collegeType : string , universityName: string , universityDegree: string  , skills : string , hobbies : string){

    const params = {schoolName,schoolClass , schoolType , collegeName , collegeClass , collegeType, universityName, universityDegree , skills, hobbies,userId :this.currentUser.objectId}
    const result = await Parse.Cloud.run("education_proffesion",params)
    console.log(result)
    return result
    
   }

   async update_submit_education_proffesion(professionId:string,schoolName: string , schoolClass : string , schoolType : string , collegeName : string , collegeClass : string , collegeType : string , universityName: string , universityDegree: string  , skills : string , hobbies : string){

    const params = {professionId,schoolName,schoolClass , schoolType , collegeName , collegeClass , collegeType, universityName, universityDegree , skills, hobbies,userId :this.currentUser.objectId}
    const result = await Parse.Cloud.run("update_proffesionuser",params)
    console.log(result)
    return result
    
   }


   async gig_info_add(title : string , year_Of_Experience: string  , type: string, skillLevel: string , level: string   , level_1_Description: string  ,  level_1_Price: string  , level_2_Description: string  , level_2_Price: string  ,  level_3_Description: string  , level_3_Price: string , homePrice:string , selectedCategory1: string, selectedSubcategory: string , profileId : string ){
    const params = {title , year_Of_Experience  , type, skillLevel , level  , level_1_Description  ,  level_1_Price, level_2_Description , level_2_Price  ,  level_3_Description , level_3_Price , homePrice, selectedCategory1 , selectedSubcategory, profileId ,userId :this.currentUser.objectId  ,  };
    console.log(title);
    console.log(this.currentUser.objectId);
    console.log(this.currentUser);
    const result = await Parse.Cloud.run("giginfo",params)
    return result;
   }

   async update_gig_info_add(gigId : string ,title : string , year_Of_Experience: string  , type: string, skillLevel: string , level: string   , level_1_Description: string  ,  level_1_Price: string  , level_2_Description: string  , level_2_Price: string  ,  level_3_Description: string  , level_3_Price: string , homePrice:string , selectedCategory1: string, selectedSubcategory: string ){
    const params = {gigId ,title , year_Of_Experience  , type, skillLevel , level  , level_1_Description  ,  level_1_Price, level_2_Description , level_2_Price  ,  level_3_Description , level_3_Price , homePrice, selectedCategory1 , selectedSubcategory, userId :this.currentUser.objectId  };
    console.log(title);
    console.log(this.currentUser.objectId);
    console.log(this.currentUser);
    const result = await Parse.Cloud.run("updateGiginfo",params)
    return result;
   }


 async getGigs(): Promise<any[]> {
  try {
      console.log(this.user.objectId);
      const params = {userId: this.user.objectId}
      const results = await Parse.Cloud.run("getGigs", params);
      console.log('Results from Cloud Code:', results);
      
      return results;
  } catch (error) {
      console.error('Error fetching gigs from Cloud Code', error);
      throw error; // Propagate the error to the calling code if needed
  }
}

async deleteGig( gigId : string) {

  if (this.currentUser && this.currentUser.objectId) {
    console.log(this.currentUser.id);
    const params = {gigId}
     const result =await  Parse.Cloud.run('deleteGig', params); 
     return result ;
    // Remove user from local storage on logout
    
  } else {
    alert('No user is currently logged in.');
  }
}

async deleteProfile( ProfileId : string) {

  if (this.currentUser && this.currentUser.objectId) {
    console.log(this.currentUser.id);
    const params = {ProfileId}
     const result =await  Parse.Cloud.run('deleteProfile', params); 
     return result ;
    // Remove user from local storage on logout
    
  } else {
    alert('No user is currently logged in.');
  }
}

async deleteProfession( userId : string) {

  if (this.currentUser && this.currentUser.objectId) {
    console.log(this.currentUser.id);
    const params = {userId}
     const result =await  Parse.Cloud.run('deleteprofession', params); 
     return result ;
    // Remove user from local storage on logout
    
  } else {
    alert('No user is currently logged in.');
  }
}


async getGigById(id: string): Promise<any> {
  try {
    const response = await Parse.Cloud.run('getGigById', { id });
    return response;
  } catch (error) {
    console.error('Error fetching card by ID from Cloud Code', error);
    throw error;
  }
}

async getProfileById(id: string): Promise<any> {
  try {
    const response = await Parse.Cloud.run('getProfileById', { id });
    return response;
  } catch (error) {
    console.error('Error fetching profile by ID from Cloud Code', error);
    throw error;
  }
}

async get_ProfileId() : Promise<any>{
  try {
    const response = await Parse.Cloud.run('getProfilId', {  objectId :this.currentUser.objectId});
    return response;
  } catch (error) {
    console.error('Error fetching profileid by ID from Cloud Code', error);
    throw error;
  }
}

async getProfessionById(id: string): Promise<any> {
  try {
    const response = await Parse.Cloud.run('getProfessionById', { id });
    return response;
  } catch (error) {
    console.error('Error fetching profession by ID from Cloud Code', error);
    throw error;
  }
}

async getSignupById(id: string): Promise<any> {
  try {
    const response = await Parse.Cloud.run('getSignupById', { id });
    return response;
  } catch (error) {
    console.error('Error fetching card by ID from Cloud Code', error);
    throw error;
  }
}


  // In parse.service.ts

async getStudentIdsByTeacherId(teacherId: string): Promise<string[]> {
  const params = { teacherId };
  const studentIds = await Parse.Cloud.run('getStudentIdsByTeacher', params);
  // Filter out any null or undefined values just in case
  // return studentIds.filter(id => id != null && id !== undefined);
  // In parse.service.ts

  return studentIds;
}



  
  
  // In parse.service.ts
  
  async getStudentNamesByIds(studentIds: string[]): Promise<string[]> {

    const params = { studentIds };
    const response = await Parse.Cloud.run('getStudentNamesByIds', params);
    console.log(response, 'name gets in parse')
    return response;
  }

  async getStudentById(id: string): Promise<any> {
    try {
      const response = await Parse.Cloud.run('getStudentDataByIds', { id });
      return response;
    } catch (error) {
      console.error('Error fetching card by ID from Cloud Code', error);
      throw error;
    }
  }
  

  async sendMessage(senderId: string, receiverId: string, text: string) {
    try {
      const message = await Parse.Cloud.run('sendMessageTeacher', { senderId, receiverId, text });
      return message;
    } catch (error) {
      console.error('Error sending message', error);
      throw error;
    }
  }

  async getConversationID(TeacherID: string, StudentID: string) {
    const params = { TeacherID, StudentID };
    const response = await Parse.Cloud.run('getConversationIDTeacher', params);
    return response.objectId;
  }


  async getMessages(conversationId: string): Promise<Message[]> {
    try {
      const messages = await Parse.Cloud.run('getMessagesTeacher', { conversationId });
      console.log(messages);
      return messages;
    } catch (error) {
      console.error('Error getting messages', error);
      throw error;
    }
  }

  
}




// In your Parse Server JavaScript file

