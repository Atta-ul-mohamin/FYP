import { Injectable } from '@angular/core';
import * as Parse from 'parse' ;
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
    await Parse.Cloud.run("addUser",params)
   }

   async login(email: string, password: string) {
    const params ={email,password};
    const response = await Parse.Cloud.run("login" , params);
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

  
   async submit_profile(firstname:string,lasttname:string, email:string , city:string, location:string,gender:string ,Age_profile:string,language:string,discription:string){

    const params = {firstname,lasttname,email, city,location,gender,Age_profile,language,discription}
    await Parse.Cloud.run("profileuser",params)
   }
  
   async submit_proffesion(occupation:string,start_date:Date,end_date:Date,skills:string,university:string,college:string,degreeFile:File, certificatesFile:File){

    const params = {occupation,start_date,end_date,skills,university,college,degreeFile, certificatesFile}
    await Parse.Cloud.run("userprofession",params)
    
   }


   async gig_info_add(gigtitle:string, category:string , discription:string , pricediscription:string, dileverytime:string , price:number){
    const params = {gigtitle, category, discription,pricediscription,dileverytime,price,  userId :this.currentUser.objectId };
    console.log(this.currentUser.objectId);
    console.log(this.currentUser);
    await Parse.Cloud.run("giginfo",params)
   }



//   async getGigs(sessionToken: string): Promise<any[]> {
//     try {
//         const results = await Parse.Cloud.run("getGigs", {}, { sessionToken });
//         console.log('Results from Cloud Code:', results);

//         return results;
//     } catch (error) {
//         console.error('Error fetching gigs from Cloud Code', error);
//         throw error; // Propagate the error to the calling code if needed
//     }
// }

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
}
