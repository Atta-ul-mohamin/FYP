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
 
  //yaha par jo parse service lagana he yaha ae ga or authentication b
  constructor(private service: ParseService, private authService: AuthService, private router: Router) { }
 

  
    
    
  
  async submit_profile(

    cityElement: HTMLSelectElement,  
    locationElement: HTMLSelectElement,  
    genderElement: HTMLSelectElement,  
    Age_profileElement: HTMLSelectElement,  // Make sure this is a select element
    languageElement: HTMLSelectElement,  
    discriptionElement: HTMLTextAreaElement,
    files: FileList | null
  ) {
    let fileToUpload: File | null = null;

    if (files && files.length > 0) {
      fileToUpload = files.item(0);
    }
    const city = cityElement.value;
    const location = locationElement.value;
    const gender = genderElement.value;
    const Age_profile = Age_profileElement.value;
    const language = languageElement.value;
    const discription = discriptionElement.value;
    console.log(fileToUpload);
    await this.service.submit_profile(city, location, gender, Age_profile, language, discription,fileToUpload)
    return true;
  }
  



  profile_to_personal_details() {
    this.router.navigate(['/profession-details']);
  }

}
