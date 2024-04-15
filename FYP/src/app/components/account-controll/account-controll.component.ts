import { Component, OnInit, inject } from '@angular/core';
import { Router } from 'express';
import { AuthService } from 'src/app/services/auth.service';
import { ParseService } from 'src/app/services/parse.service';

@Component({
  selector: 'app-account-controll',
  templateUrl: './account-controll.component.html',
  styleUrls: ['./account-controll.component.css']
})
export class AccountControllComponent implements OnInit {
  auth = inject(AuthService);
  nameGoogle = JSON.parse(sessionStorage.getItem("loggedInUser")!).name;
  imageGoogle = JSON.parse(sessionStorage.getItem("loggedInUser")!).picture;
  emailGoogle = JSON.parse(sessionStorage.getItem("loggedInUser")!).email;

  teacherId:any;
  pictur:string="";
  name : string="";

  constructor(private service: ParseService) { }

  ngOnInit(): void {
    this.teacherId = this.service.user.objectId;
    console.log(this.teacherId);
    this.fetchProfileData();
    this.fetchSignupData();

  }

  async fetchProfileData() {
    
    try {
      const result = await this.service.getProfileById(this.teacherId);
      if (result.status === 1) {
       console.log(result) 
       this.pictur =  result.data.pictur;
      } else {
        // Handle the error case
      }
    } catch (error) {
      console.error('Error loading card details', error);     
    }   
    }

    async fetchSignupData() {
    
      try {
        const result = await this.service.getSignupById(this.teacherId);
        if (result.status === 1) {
            console.log(result)
            this.name = result.data.name;
            // this.email = result.data.email;
            // const createdParts = new Date(result.data.created).toString().split(' ').slice(1, 4).join(' ');
            // this.created = createdParts;
        } else {
            // Handle the error case
        }
      } catch (error) {
        console.error('Error loading sign up details', error);     
      } 
      }

}
