
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
  userChecked : any;
  userBoolean: boolean =false;
  teacherID : string = '';
  availableLanguages: string[] = ['Urdu', 'English', 'Punjabi', 'Saraiki', 'Sindhi', 'Balochi', 'Arabi', 'Pushto'];
  selectedLanguages: string[] = [];
  selectedLanguage: string = '';
  language:string[]=[];
  selectedFile1: File | null = null;
  fileBinaryString1: string ='';
  descriptions:string = '';  
  userLocation: string = ''; 
  age: number | undefined = undefined;
  phone: number | undefined = undefined;
  cnic: number | undefined = undefined;
  selectedgender:string ="";
  profileId:string="";
  pictur:string="";
  cnicImage:string=""
  
  descriptionCount: number | null = null;
  isDescriptionLimitReached: boolean = false;
  selectedFile: File | null = null;
  fileBinaryString: string ='';
  pass : string = '';
  //yaha par jo parse service lagana he yaha ae ga or authentication b
  constructor(private service: ParseService, private route: ActivatedRoute , private router: Router) { }
 
  ngOnInit() {
    this.teacherID = this.route.snapshot.paramMap.get('id') as string;
    this.userChecked = this.service.user.status;
    if(this.userChecked==2){
      this.userBoolean=true;
    }
    this.pass= this.service.user.pass;
    console.log(this.pass);
    this.fetchProfileData();
  }

  addLanguage() {
    if (this.selectedLanguage && !this.selectedLanguages.includes(this.selectedLanguage)) {
      this.selectedLanguages.push(this.selectedLanguage);
      this.selectedLanguage = ''; // Reset the dropdown
    }
  }

  resetLanguages() {
    this.selectedLanguages = [];
    this.selectedLanguage = '';
  }


  onDescriptionInput(value: string) {
    this.descriptionCount = value.length;
    this.isDescriptionLimitReached = this.descriptionCount >= 100;
  }


  async fetchProfileData() {
    try {
      const result = await this.service.getProfileById(this.teacherID);
      
      if (result.status === 1) {

       this.pictur = result.data.pictur;
       this.language = result.data.language;
       console.log(this.language);
       this.phone = result.data.phone;
       this.descriptions = result.data.description;
       this.userLocation = result.data.location;
       this.age= result.data.age;
       this.selectedgender = result.data.gender;
       this.profileId = result.data.objectId;
       this.cnic=result.data.cnicNumber;
       this.cnicImage=result.data.cnicImage;
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




  

  
    
    
  
  async submit_profile( phone :number ,  gender:string , age:number , location:string , language:string[] , description:string, cnic:number) {
  
  

    if (!age || !phone || !gender || !location || !language || !description || !cnic) {
      alert('Please fill in all the fields.');
      return;
    }
   
    if (age === undefined || age.toString().length < 0 || age.toString().length > 120 ) {
      alert('Please enter a valid age.');
      return;
    }
     
    if (cnic === undefined || cnic.toString().length < 13 || cnic.toString().length > 13 ) {
      alert('Please enter a valid cnic number.');
      return;
    }
     
   
    if (phone === undefined || phone.toString().length < 10 || phone.toString().length>10 ) {
      alert('phone number digits should be equal to 10');
      return;
    }

    if(description.length<100 || description.length >250)
      {
        alert('please enter description between 99 and 251 characters');
        return;
      }

  

    
if(!this.fileBinaryString){
 this.fileBinaryString = this.pictur;
}
if(!this.fileBinaryString1){
  this.fileBinaryString1 = this.cnicImage
}
    const result = await this.service.update_submit_profile(this.profileId,this.teacherID, phone, gender, age, location,language,description,this.fileBinaryString , cnic , this.fileBinaryString1)
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
      this.fileBinaryString ;
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
  
  onFileChanged1(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.selectedFile1 = null;
      this.fileBinaryString1 ;
    } else {
      this.selectedFile1 = input.files[0];
      const blobUrl = URL.createObjectURL(this.selectedFile1);
      this.convertBlobUrlToBase64String1(blobUrl)
        .then(base64String => {
          this.fileBinaryString1 = base64String; // Store Base64 string
          console.log('Generated Base64 String:', this.fileBinaryString1.substring(0, 5) + '...');
        })
        .catch(error => console.error('Error reading file as Base64 string:', error));
    }
  }
  async convertBlobUrlToBase64String1(blobUrl: string): Promise<string> {
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


