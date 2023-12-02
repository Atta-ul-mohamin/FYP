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

   async login(email: string, password: string) {
    const params ={email,password};
    const response = await Parse.Cloud.run("login" , params);
    if(response.status === 1) {
      this.currentUser = response;
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








   
   async next_to_img(params: {
    gigtitle: string, 
    category: string, 
    discription: string, 
    images?: globalThis.File,  // Using globalThis.File for browser's File type
    sampledocument?: globalThis.File,  // Using globalThis.File for browser's File type
    pricediscription: string, 
    dileverytime: string, 
    price: number
  }) {
    let parseImage: Parse.File | undefined;
    let parseSampleDocument: Parse.File | undefined;

    if (params.images) {
      parseImage = new Parse.File(params.images.name, params.images);
      await parseImage.save();
    }

    if (params.sampledocument) {
      parseSampleDocument = new Parse.File(params.sampledocument.name, params.sampledocument);
      await parseSampleDocument.save();
    }

    await Parse.Cloud.run("giginfo", {
      ...params,
      images: parseImage,
      sampledocument: parseSampleDocument
    });
  }


  async getGigs(): Promise<any[]> {
    const query = new Parse.Query('create_gig');
    const results = await query.find();

    // Convert Parse Objects to a simple array
    return results.map(result => ({
      gigtitle: result.get('gigtitle'),
      category: result.get('category'),
      discription: result.get('discription'),
      images: result.get('images') ? result.get('images').url() : null,
      // ... other properties ...
    }));
  }
}
