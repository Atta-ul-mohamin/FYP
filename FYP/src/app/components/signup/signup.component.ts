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
  showPassword: boolean = false;
  constructor(private service: ParseService, private authService: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

 async onsignup(event: Event, firstnameElement: HTMLInputElement, emailElement: HTMLInputElement, passwordElement: HTMLInputElement, termsCheckbox: HTMLInputElement) {
    // Prevent the default form submission
    event.preventDefault();
  
    // Get the values from the input elements
    const firstname = firstnameElement.value.trim();
    const email = emailElement.value.trim();
    const password = passwordElement.value.trim();
  
    if (!firstname || !email || !password) {
      alert('Please fill in all the fields.');
      return;
    }
    if (firstname.length < 3 || firstname.length > 20) {
      alert('Name must be between 3 and 20 characters long.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || !email.endsWith('@gmail.com')) {
      alert('Email must be in the format of username@gmail.com');
      return;
    }

    // Validate the password complexity
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+`~{}\[\]:;"'<>,.?\/\\\-]{8,}$/;

    if (!passwordRegex.test(password)) {
      alert('Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, and one number. Special characters are optional.');
      return;
    }
    // Check if the checkbox is checked
    if (!termsCheckbox.checked) {
      alert('Please agree to the terms and conditions before signing up.');
      return;
    }
  
    // Call the signup method from ParseService
   const result= await this.service.signup(firstname, email, password)
   if(result.status===1){  
        alert("Your account created successfully");
        this.router.navigate(['/signin']); 
    }
    if(result.status===0){
      alert('email already exists, try another')
    }
  }
}