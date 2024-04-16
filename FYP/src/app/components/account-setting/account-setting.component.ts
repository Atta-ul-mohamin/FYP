
import { Component, OnInit, inject } from '@angular/core';
import { Router } from 'express';
import { AuthService } from 'src/app/services/auth.service';
import { ParseService } from 'src/app/services/parse.service';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.css']
})
export class AccountSettingComponent {


  constructor(private parseService: ParseService) {}
  currentName: string = '';
  currentEmail : string = '';
  ngOnInit() {
    this.fetchCurrentUserName();
  }

  async fetchCurrentUserName() {
   
  
 
      this.currentName = this.parseService.user.firstname;
      this.currentEmail =  this.parseService.user.email;
      console.log(this.currentName);
       // Set the current name if fetched
    
  }

  async updateUserName(name: string) {
    try {
      await this.parseService.updateCurrentUserName(name);
    } catch (error) {
      console.error('Error while updating account:', error);
    }
  }

  async updateUserEmail(email: string) {
    try {
      await this.parseService.updateCurrentUserEmail(email);
    } catch (error) {
      console.error('Error while updating account:', error);
    }
  }


}
