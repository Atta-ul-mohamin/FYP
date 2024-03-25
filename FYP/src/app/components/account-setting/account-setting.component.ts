import { Component } from '@angular/core';
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
    const result = await this.parseService.getCurrentUserData();
    if (result.status===1) {
      
      this.currentName = result.name;
      this.currentEmail =  result.email;
      console.log(this.currentName);
       // Set the current name if fetched
    }
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
