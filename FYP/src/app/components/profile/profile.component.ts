

import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ParseService } from 'src/app/services/parse.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  phone: number | undefined = undefined;
  age: number | undefined = undefined;
  selectedFile: File | null = null;
  descriptionCount: number | null = null;
  isDescriptionLimitReached: boolean = false;

  onDescriptionInput(value: string) {
      this.descriptionCount = value.length;
      this.isDescriptionLimitReached = this.descriptionCount >= 100;
  }






  userLocation: string = ''; // Initialize the userLocation variable

  gender: string = '';

  location: string = '';
  language: string = '';
  description: string = '';
  selectedgender: string = "";
  //yaha par jo parse service lagana he yaha ae ga or authentication b
  constructor(private service: ParseService, private authService: AuthService, private router: Router, private fb: FormBuilder) {


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






  async submit_profile(phone: number, gender: string, age: number, location: string, language: string, description: string) {

    // for words
    // const descriptionWordCount = description.split(/\s+/).length;
    // if (descriptionWordCount < 100) {
    //     alert('Description cannot exceed 100 words.');
    //     return;
    // }
    
    // for character
    const descriptionLength = description.length;
   if (descriptionLength < 100) {
    alert('Description should more than 100 characters.');
    return;
   }

  
    



    if (age === undefined || !Number.isInteger(age) || age < 0 || age > 120) {
      alert('Please enter a valid age');
      return;
    }

    // Assuming phone is a number but checking if it's defined and within a plausible range
    if (phone === undefined || phone.toString().length < 7 || phone.toString().length > 15) {
      alert('Please enter a valid phone number.');
      return;
    }

    // if (this.selectedFile) {
    //   const result = await this.service.submitProfileWithImage(phone, gender, age, location, language, description, this.selectedFile);
    //   console.log("hello");
    //   if (result.status === 1) {
    //     alert('profile maded successfully');
    //     this.router.navigate(['/profession-details']);
    //   }
  
    //   else {
    //     alert('error in making profile');
    //   }
    
    // } else {
    //   alert('file not seleced');

    // }

    



    const result = await this.service.submit_profile(phone, gender, age, location, language, description)

       if (result.status === 1) {
        alert('profile maded successfully');
        this.router.navigate(['/profession-details']);
      }
  
      else {
        alert('error in making profile');
      }
  



  }

  // onFileChanged(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (!input.files || input.files.length === 0) {
  //     this.selectedFile = null;
  //   } else {
  //     this.selectedFile = input.files[0];
  //   }
  // }


}

