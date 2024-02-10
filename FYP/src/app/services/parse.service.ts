import { Injectable } from '@angular/core';
import * as Parse from 'parse' ;
import { Message } from '../chat-page/message.model';
@Injectable({
  providedIn: 'root'
})
export class ParseService {
  private readonly USER_KEY = 'currentUser';
  constructor() {
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

   async login(email: string, password: string) {
    const params ={email,password};
    const response = await Parse.Cloud.run("loginTeacher" , params);
    if(response.status === 1) {
      this.currentUser = response;
          // Save user to local storage on successful login
          localStorage.setItem(this.USER_KEY, JSON.stringify(response));
      console.log(this.currentUser);
    }
    return response.status;
  }
  private currentUser: any;

  get user() {
    return this.currentUser;
  }
  
  set user(value: any) {
    this.currentUser = value;
  }

  
   async submit_profile( phone:string, gender:string,age:string ,location:string,language:string,description:string){
    // let parseFile: Parse.File | null = null;
    // if (file) {
    //   parseFile = new Parse.File(file.name, file);
    //   console.log(file);
    //   console.log('reached');
    //   console.log(parseFile);
    //   try {
    //     await parseFile.save();
    //   } catch (error) {
    //     console.error('Error saving file to Parse:', error);
    //     // Optionally, handle the error or return from the function
    //     return;
    //   }
    // }
    // console.log(file);
    const params = { phone,gender,age,location,language, description ,userId :this.currentUser.objectId}
     const result = await Parse.Cloud.run("profileuser",params)
     return result;
   }
  
   async submit_education_proffesion(schoolName: string , schoolClass : string , schoolType : string , collegeName : string , collegeClass : string , collegeType : string , universityName: string , universityDegree: string  , skills : string , hobbies : string){

    const params = {schoolName,schoolClass , schoolType , collegeName , collegeClass , collegeType, universityName, universityDegree , skills, hobbies,userId :this.currentUser.objectId}
    const result = await Parse.Cloud.run("education_proffesion",params)
    return result
    
   }


   async gig_info_add(title : string , year_Of_Experience: string  , type: string, skillLevel: string , level: string   , level_1_Description: string  ,  level_1_Price: string  , level_2_Description: string  , level_2_Price: string  ,  level_3_Description: string  , level_3_Price: string , homePrice:string){
    const params = {title , year_Of_Experience  , type, skillLevel , level  , level_1_Description  ,  level_1_Price, level_2_Description , level_2_Price  ,  level_3_Description , level_3_Price , homePrice, userId :this.currentUser.objectId };
    console.log(this.currentUser.objectId);
    console.log(this.currentUser);
    const result = await Parse.Cloud.run("giginfo",params)
    await Parse.Cloud.run("createCardsForGigs",params)
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


  // In parse.service.ts

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

