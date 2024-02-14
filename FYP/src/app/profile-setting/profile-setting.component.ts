
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ParseService } from 'src/app/services/parse.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-profile-setting',
    templateUrl: './profile-setting.component.html',
    styleUrls: ['./profile-setting.component.css']
  })
export class ProfileSettingComponent  {
  // Initialize the userLocation variable
  
  teacherID : string = '';
  language:string='';
  description:string = '';  
  userLocation: string = ''; 
  age:string = '';
  phone:string='';
  selectedgender:string ="";
  profileId:string="";
  //yaha par jo parse service lagana he yaha ae ga or authentication b
  constructor(private service: ParseService, private authService: AuthService, private route: ActivatedRoute , private router: Router) { }
 
  ngOnInit() {
    this.teacherID = this.route.snapshot.paramMap.get('id') as string;
    this.fetchProfileData();
  }


  async fetchProfileData() {
    
    try {
      const result = await this.service.getProfileById(this.teacherID);
      
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
      // Handle the error
    }
      
      // this.currentName = result.name;
      // console.log(this.currentName);
       // Set the current name if fetched
    }
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
    const result = await this.service.update_submit_profile(this.profileId,this.teacherID, phone, gender, age, location,language, description)
    if(result.status===1)
    {
      alert('profile maded successfully');
    }

    else{
      alert('error in making profile');
    }
    
  }


  async deleteProfile(TeacherId : string) {
    // Ask the user for confirmation before deleting the account
    
    const confirmation = confirm('Are you sure you want to delete your Profile? This action cannot be undone.');
    if (confirmation) {
      const result = await this.service.deleteProfile(TeacherId);
      
    if(result.status===1){
        console.log("in delete");
       
        
        alert('Profile deleted successfully.');
        this.router.navigate(['/home-after-login']);
        // Navigate the user away from the current page or refresh the application state as needed
          
    } else {
      // User clicked 'Cancel', do not delete the account
      alert('error in Profile deletion');
    }
  }
  else{
   
    console.log("Profile deletion cancelled.");
  }
  }

  



  

}


