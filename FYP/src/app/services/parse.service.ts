import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Parse from 'parse';
import { Message } from '../chat-page/message.model';
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
    const result =  await Parse.Cloud.run("addUserTeacher",params);
    return result;
   }

   // In ParseService
async submitProfile(phone: number, gender: string, age: number, location: string, language: string[], description: string, binaryString: string , cnic: number, cnicImage:string) {
  // Assuming binaryString needs to be converted or handled according to your backend requirements
  const params = {
    phone,
    gender,
    age,
    location,
    language,
    description,
    binaryString, 
    cnic,
    cnicImage,// Pass the binary string
    userId: this.currentUser.objectId
  };

  // Adjust your cloud function or server-side logic to handle the binaryString
  const result = await Parse.Cloud.run("submitProfile", params);

  return result;
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

  
  

   async update_submit_profile( profileId : string, teacherid: string ,phone:number, gender:string,age:number,location:string,language:string[],description:string,stringImage:string , cnic:number , cnicImage:string){
   const params = { profileId,teacherid,phone,gender,age,location,language, description ,stringImage ,userId :this.currentUser.objectId,cnic, cnicImage}
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


   async gig_info_add(title : string , year_Of_Experience: number  , type: string, skillLevel: string , level: string   , level_1_Description: string  ,  level_1_Price:number , level_2_Description: string  , level_2_Price:number   ,  level_3_Description: string  , level_3_Price: number  , homePrice:string , selectedCategory1: string, selectedSubcategory: string , profileId : string  , image1:string , image2:string, image3:string ,orderDay1:number,orderDay2:number,orderDay3:number){
    const params = {title , year_Of_Experience  , type, skillLevel , level  , level_1_Description  ,  level_1_Price, level_2_Description , level_2_Price  ,  level_3_Description , level_3_Price , homePrice, selectedCategory1 , selectedSubcategory, profileId ,userId :this.currentUser.objectId  , image1,image2,image3,orderDay1,orderDay2,orderDay3 };
    console.log(title);
    console.log(this.currentUser.objectId);
    console.log(this.currentUser);
    const result = await Parse.Cloud.run("giginfo",params)
    return result;
   }

   async update_gig_info_add(gigId : string ,title : string , year_Of_Experience: string  , type: string, skillLevel: string , level: string   , level_1_Description: string  ,  level_1_Price: string  , level_2_Description: string  , level_2_Price: string  ,  level_3_Description: string  , level_3_Price: string , homePrice:string , selectedCategory1: string, selectedSubcategory: string ,orderDay1:string,orderDay2:string,orderDay3:string){
    const params = {gigId ,title , year_Of_Experience  , type, skillLevel , level  , level_1_Description  ,  level_1_Price, level_2_Description , level_2_Price  ,  level_3_Description , level_3_Price , homePrice, selectedCategory1 , selectedSubcategory, userId :this.currentUser.objectId,orderDay1,orderDay2,orderDay3  };
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

async getOrders(): Promise<any[]> {
  try {
      const params = {userId: this.user.objectId}
      const results = await Parse.Cloud.run("getOrdersTeacher", params);
      console.log('Results from Cloud Code:', results);
      return results;
  } catch (error) {
      console.error('Error fetching orders from Cloud Code', error);
      throw error; // Propagate the error to the calling code if needed
  }
}

async getHistoryOrders(): Promise<any[]> {
  try {
      const params = {userId: this.user.objectId}
      const results = await Parse.Cloud.run("getHistoryOrdersTeacher", params);
      console.log('Results from Cloud Code:', results);
      return results;
  } catch (error) {
      console.error('Error fetching orders from Cloud Code', error);
      throw error; // Propagate the error to the calling code if needed
  }
}

async onCompleteFunction(orderId:string){
  try{
        const params = {orderId};
        const result = await Parse.Cloud.run("CompleteOrdersTeacher" , params);
        return result;
    }
  catch(error){
    throw error;
  }
}


async onLoginGoogle(name : string , email : string , pass : string ){
  try{
    const params = {name,email,pass};
    const response  = await Parse.Cloud.run("onLoginGoogle" , params);
    if(response.status === 2  || response.status === 3 || response.status === 4   ) {
      this.currentUser = response;
          // Save user to local storage on successful login
          localStorage.setItem(this.USER_KEY, JSON.stringify(response));
      console.log(this.currentUser.objectId);
    }
    return response;
  }

catch(error){
throw error;
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

async getStudentIdsByTeacherIdInConversation(teacherId: string): Promise<string[]> {
  const params = { teacherId };
  const studentIds = await Parse.Cloud.run('getStudentIdsByTeacherInConversation', params);
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

  async getStudentDataByIds(id: string): Promise<any> {
    try {
      const response = await Parse.Cloud.run('getStudentDataByIds', { id });
      return response;
    } catch (error) {
      console.error('Error fetching card by ID from Cloud Code', error);
      throw error;
    }
  }

  async getCancelOrders(): Promise<any[]> {
    try {
      const params = { userId: this.user.objectId }
      const results = await Parse.Cloud.run("getCancelOrdersTeacher", params);
      console.log('Results from Cloud Code:', results);
      return results;
    } catch (error) {
      console.error('Error fetching orders from Cloud Code', error);
      throw error; // Propagate the error to the calling code if needed
    }
  }

  async getIncompleteOrders(): Promise<any[]> {
    try {
      const params = { userId: this.user.objectId }
      const results = await Parse.Cloud.run("getIncompleteOrdersTeacher", params);
      console.log('Results from Cloud Code:', results);
      return results;
    } catch (error) {
      console.error('Error fetching orders from Cloud Code', error);
      throw error; // Propagate the error to the calling code if needed
    }
  }


  async moveToIncompleteOrders(orderId: string) {
    return Parse.Cloud.run("MoveToIncompleteOrders", { orderId });
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

