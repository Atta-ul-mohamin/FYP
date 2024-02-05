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

  
   async submit_profile( city:string, location:string,gender:string ,Age_profile:string,language:string,discription:string,file: File | null){
    let parseFile: Parse.File | null = null;
    if (file) {
      parseFile = new Parse.File(file.name, file);
      console.log(file);
      console.log('reached');
      console.log(parseFile);
      try {
        await parseFile.save();
      } catch (error) {
        console.error('Error saving file to Parse:', error);
        // Optionally, handle the error or return from the function
        return;
      }
    }
    console.log(file);
    const params = { city,location,gender,Age_profile,language,discription, userId :this.currentUser.objectId, image: parseFile}
    await Parse.Cloud.run("profileuser",params)
   }
  
   async submit_education_proffesion(nameSchool:string,field:string,subjectsToTeach:string,category:string){

    const params = {nameSchool,field,subjectsToTeach,category,userId :this.currentUser.objectId}
    await Parse.Cloud.run("education_proffesion",params)
    
   }


   async gig_info_add(category:string , gigtitle:string, discription_about_work:string ,  price : string ,discription_about_price:string ,  type:string ,min_days:string, max_days:string  ){
    const params = {category , gigtitle , discription_about_work , price ,discription_about_price,type,min_days,max_days,  userId :this.currentUser.objectId };
    console.log(this.currentUser.objectId);
    console.log(this.currentUser);
    await Parse.Cloud.run("giginfo",params)
    await Parse.Cloud.run("createCardsForGigs",params)
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

