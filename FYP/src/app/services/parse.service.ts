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
}
