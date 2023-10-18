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
    firstnameElement: HTMLInputElement, 
    lastnameElement: HTMLInputElement, 
    emailElement: HTMLInputElement, 
    cityElement: HTMLSelectElement,  
    locationElement: HTMLSelectElement,  
    genderElement: HTMLSelectElement,  
    Age_profileElement: HTMLSelectElement,  // Make sure this is a select element
    languageElement: HTMLSelectElement,  
    discriptionElement: HTMLTextAreaElement
  ) {
    const firstname = firstnameElement.value;
    const lastname = lastnameElement.value;
    const email = emailElement.value;
    const city = cityElement.value;
    const location = locationElement.value;
    const gender = genderElement.value;
    const Age_profile= Age_profileElement.value;  // Make sure this extracts the selected value from the dropdown
    const language = languageElement.value;
    const discription = discriptionElement.value;
  
    await this.service.submit_profile(firstname, lastname, email, city, location, gender, Age_profile, language, discription)
    return true;
  }
  



  profile_to_personal_details() {
    this.router.navigate(['/profession-details']);
  }

}
