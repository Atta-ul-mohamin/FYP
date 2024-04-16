
import { Component } from '@angular/core';
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
  age: number | undefined = undefined;
 
  phone:string='';
  selectedgender:string ="";
  profileId:string="";
  pictur:string="";
  
  descriptionCount: number | null = null;
  isDescriptionLimitReached: boolean = false;
  selectedFile: File | null = null;
  fileBinaryString: string | null = null;
  pass : string = '';
  //yaha par jo parse service lagana he yaha ae ga or authentication b
  constructor(private service: ParseService, private route: ActivatedRoute , private router: Router) { }
 
  ngOnInit() {
    this.teacherID = this.route.snapshot.paramMap.get('id') as string;
    this.pass= this.service.user.pass;
    console.log(this.pass);
    this.fetchProfileData();
  }

  onDescriptionInput(value: string) {
    this.descriptionCount = value.length;
    this.isDescriptionLimitReached = this.descriptionCount >= 100;
  }


  async fetchProfileData() {
    try {
      const result = await this.service.getProfileById(this.teacherID);
      
      if (result.status === 1) {

       console.log(result)
       this.pictur = result.data.pictur;
       console.log(this.pictur);
       this.language = result.data.language;
       this.phone = result.data.phone;
       this.description = result.data.description;
       this.userLocation = result.data.location;
       this.age= result.data.age;
       this.selectedgender = result.data.gender;
       this.profileId = result.data.objectId;
       
      } else {
     
      }
    } catch (error) {
      console.error('Error loading card details', error);
    }
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

  
    
    
  
  async submit_profile( phone : string ,  gender:string , age:number , location:string , language:string , description:string) {
  
    const descriptionLength = description.length;
    if (descriptionLength < 100) {
      alert('Description should more than 100 characters.');
      return;
    }

    // if (age === undefined || !Number.isInteger(age) || age < 0 || age > 120) {
    //   alert('Please enter a valid age');
    //   return;
    // }

    // Assuming phone is a number but checking if it's defined and within a plausible range
    if (phone === undefined || phone.toString().length < 7 || phone.toString().length > 15) {
      alert('Please enter a valid phone number.');
      return;
    }

  

  
      if (!this.fileBinaryString) {
        alert('No file selected or file processing error.');
        return;
      }
    


    const result = await this.service.update_submit_profile(this.profileId,this.teacherID, phone, gender, age, location,language, description,this.fileBinaryString)
    if(result.status===1)
    {
      alert('profile edited successfully');
    }

    else{
      alert('error in editing profile');
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

  onFileChanged(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.selectedFile = null;
      this.fileBinaryString = null;
    } else {
      this.selectedFile = input.files[0];
      const blobUrl = URL.createObjectURL(this.selectedFile);
      this.convertBlobUrlToBase64String(blobUrl)
        .then(base64String => {
          this.fileBinaryString = base64String; // Store Base64 string
          console.log('Generated Base64 String:', this.fileBinaryString.substring(0, 50) + '...');
        })
        .catch(error => console.error('Error reading file as Base64 string:', error));
    }
  }
  
  // Method to convert Blob URL to Base64 string
  async convertBlobUrlToBase64String(blobUrl: string): Promise<string> {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result; // This is a Base64 string
        resolve(base64String as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob); // Changed to readAsDataURL for Base64
    });
  }
  
}


