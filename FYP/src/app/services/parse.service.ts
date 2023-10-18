import { Injectable } from '@angular/core';
import * as Parse from 'parse' ;
@Injectable({
  providedIn: 'root'
})
export class ParseService {

  constructor() {
    Parse.initialize('myAppId', 'myMasterKey');
    (Parse as any).serverURL = 'http://localhost:1336/parse';
   }
   async signup(firstname:string, email:string , password:string){
    const params = {firstname, email, password};
    await Parse.Cloud.run("addUser",params)
   }
   async submit_profile(firstname:string,lasttname:string, email:string , city:string, location:string,gender:string ,Age_profile:string,language:string,discription:string){

    const params = {firstname,lasttname,email, city,location,gender,Age_profile,language,discription}
    await Parse.Cloud.run("profileuser",params)
   }
  
  //  async submit_proffesion(occupation:string,start_date:Date,end_date:Date,skills:string,university:string,college:string,degreeFile:File, certificatesFile:File){

  //   const params = {occupation,start_date,end_date,skills,university,college,degreeFile, certificatesFile}
  //   await Parse.Cloud.run("addUser",params)
    
  //  }
}
