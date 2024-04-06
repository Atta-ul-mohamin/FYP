import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ParseService } from 'src/app/services/parse.service';

@Component({
  selector: 'app-home-after-login',
  templateUrl: './home-after-login.component.html',
  styleUrls: ['./home-after-login.component.css']
})
export class HomeAfterLoginComponent implements OnInit {
  user: any;
  userName!: string; 
  teacherId:any;
  pictur:string="";

  constructor(private service: ParseService, private authService: AuthService) {}

  ngOnInit() {
    this.teacherId = this.service.user.objectId;
    console.log(this.teacherId);
    this.fetchProfileData();

    // Subscribe to the userProfile observable to get the user's name
    this.authService.userProfile.subscribe(profile => {
      if (profile) {
        this.userName = profile.name;
      }
    });

    // Assuming you're also fetching user data from ParseService
    this.user = this.service.user;
  }

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);



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
}



