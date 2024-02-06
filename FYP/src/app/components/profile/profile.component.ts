import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ParseService } from 'src/app/services/parse.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userLocation: string = ''; // Initialize the userLocation variable
  phone:string='';
  gender:string='';
  age:string = '';
  location:string= '';
  language:string='';
  description:string = '';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
  selectedgender:string ="";
  //yaha par jo parse service lagana he yaha ae ga or authentication b
  constructor(private service: ParseService, private authService: AuthService, private router: Router) { }
 

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Here you can format and store the location as needed
        this.userLocation = `Latitude: ${latitude}, Longitude: ${longitude}`;
      }, (error) => {
        console.error('Error fetching location:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  
    
    
  
  async submit_profile( phone : string ,  gender:string , age:string , location:string , language:string , description:string) {
    const result = await this.service.submit_profile(phone, gender, age, location,language, description)
    if(result.status===1)
    {
      alert('profile maded successfully');
    }

    else{
      alert('error in making profile');
    }
    
  }
  



  profile_to_personal_details() {
    this.router.navigate(['/profession-details']);
  }

}
