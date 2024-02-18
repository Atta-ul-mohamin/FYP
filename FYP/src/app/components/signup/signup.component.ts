import { Component } from '@angular/core';
import { ParseService } from 'src/app/services/parse.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private service: ParseService, private authService: AuthService, private router: Router) {}

  onsignup(event: Event, firstnameElement: HTMLInputElement, emailElement: HTMLInputElement, passwordElement: HTMLInputElement, termsCheckbox: HTMLInputElement) {
    // Prevent the default form submission
    event.preventDefault();
  
    // Get the values from the input elements
    const firstname = firstnameElement.value.trim();
    const email = emailElement.value.trim();
    const password = passwordElement.value.trim();
  
    // Check if any field is empty
    if (!firstname || !email || !password) {
      // Show an error message or handle the validation as needed
      alert('Please fill in all the fields.');
      return;
    }
  
    // Check if the checkbox is checked
    if (!termsCheckbox.checked) {
      // Show an error message or handle the validation as needed
      alert('Please agree to the terms and conditions before signing up.');
      return;
    }
  
    // Call the signup method from ParseService
    this.service.signup(firstname, email, password)
      .then(() => {
        // If signup is successful, proceed with login and navigation
        // Call the login() method from the AuthService
        this.authService.login();
  
        // Navigate to the profile page
        this.router.navigate(['/']);
      })
      .catch((error) => {
        // Handle any error that might occur during signup
        console.error('Signup failed:', error);
      });
  }
  

  
}
