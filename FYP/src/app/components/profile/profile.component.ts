
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ParseService } from 'src/app/services/parse.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, NgZone,inject, OnInit  } from '@angular/core';
// import { MapsAPILoader } from '@agm/core';
import { GeocodingService, GeocodeResponse } from 'src/app/services/geocoding.service';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  auth = inject(AuthService);
  
  imageGoogle = JSON.parse(sessionStorage.getItem("loggedInUser")!).picture;
  cnic: number | undefined = undefined;
  phone: number | undefined = undefined;
  age: number | undefined = undefined;
  
  descriptionCount: number | null = null;
  isDescriptionLimitReached: boolean = false;
  selectedFile: File | null = null;
  fileBinaryString: string | null = null;
  userLocation: string = ''; // Initialize the userLocation variable
  gender: string = '';
  location: string = '';
  language: string = '';
  description: string = '';
  selectedgender: string = "";
  pass : string = "";



  ngOnInit() {

    this.pass= this.service.user.pass;
    console.log(this.pass);
  }

  //yaha par jo parse service lagana he yaha ae ga or authentication b
  constructor(private geocodingService: GeocodingService, private ngZone: NgZone, private service: ParseService, private authService: AuthService, private router: Router, private fb: FormBuilder) {}
  


  onDescriptionInput(value: string) {
    this.descriptionCount = value.length;
    this.isDescriptionLimitReached = this.descriptionCount >= 100;
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Use GeocodingService to get the address
        this.geocodingService.getAdressByCoordinates(latitude, longitude).subscribe((data: GeocodeResponse) => {
          const address = data['results'][0]?.formatted_address;
          this.ngZone.run(() => { // Ensure UI update happens in Angular zone
            this.userLocation = address ? address : `Latitude: ${latitude}, Longitude: ${longitude}`;
          });
        }, (error: any) => {
          console.error('Error fetching address:', error);
        });
      }, (error) => {
        console.error('Error fetching location:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  
    
    
  
  async submit_profile( phone : number ,  gender:string , age:number , location:string , language:string , description:string) {
  
 
    if (age === undefined || !Number.isInteger(age) || age < 0 || age > 120) {
      alert('Please enter a valid age');
      return;
    }

    // Assuming phone is a number but checking if it's defined and within a plausible range
    if (phone === undefined || phone.toString().length < 7 || phone.toString().length > 15) {
      alert('Please enter a valid phone number.');
      return;
    }

      
    
      // Validate other inputs as before (age, phone, etc.)
      this.pass= await this.service.user.pass;
      
      if(this.pass === "null")
    {
      try {
        const result = await this.service.submitProfileWithBinaryString(phone, gender, age, location, language, description, this.imageGoogle);
        if (result.status === 1) {
          alert('Profile created successfully');
          this.router.navigate(['/profession-details']);
        } else {
          alert('Error in creating profile');
        }
      } catch (error) {
        console.error('Error submitting profile with binary string:', error);
        alert('Error in processing request');
      }


    }
    if(this.pass !== "null"){
      if (!this.fileBinaryString) {
        alert('No file selected or file processing error.');
        return;
      }
      try {
        const result = await this.service.submitProfileWithBinaryString(phone, gender, age, location, language, description, this.fileBinaryString);
        if (result.status === 1) {
          alert('Profile created successfully');
          this.router.navigate(['/profession-details']);
        } else {
          alert('Error in creating profile');
        }
      } catch (error) {
        console.error('Error submitting profile with binary string:', error);
        alert('Error in processing request');
      }
  }
}

// Updated onFileChanged method with emphasized console logging
 // Updated onFileChanged method
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
        console.log('Generated Base64 String:', this.fileBinaryString.substring(0, 5) + '...');
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

