
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ParseService } from 'src/app/services/parse.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-teacher',
  templateUrl: './profile-teacher.component.html',
  styleUrls: ['./profile-teacher.component.css']
})
export class ProfileTeacherComponent {
 teacherId:any;
 language:string='';
 description:string = '';  
 userLocation: string = ''; 
 age:string = '';
 phone:string='';
 selectedgender:string ="";
 profileId:string="";
 name:string="";
 email:string="";
 created:string=""
 constructor(private service: ParseService, private authService: AuthService, private route: ActivatedRoute , private router: Router) { }



  ngOnInit() {
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
       this.language = result.data.language;
       this.phone = result.data.phone;
       this.description = result.data.description;
       this.userLocation = result.data.location;
       this.age= result.data.age;
       this.selectedgender = result.data.gender;
       this.profileId = result.data.objectId;  
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
         this.email = result.data.email;
         this.created = result.data.created;
        
        } else {
          // Handle the error case
        }
      } catch (error) {
        console.error('Error loading sign up details', error);     
      }   
      }
}

