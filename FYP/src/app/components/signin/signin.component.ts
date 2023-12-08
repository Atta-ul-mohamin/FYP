
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ParseService } from 'src/app/services/parse.service';

// Adjust the import path accordingly
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  constructor(private parseService: ParseService, private authService: AuthService, private router: Router) { }

  async onLogin(email: string, password: string) {
    // Call the login() method from the AuthService
    this.authService.login();
    // this.router.navigate(['/home-after-login']);
    // Navigate to the desired page after login
    // (e.g., navigate to 'home-after-login')
    // This should be handled based on your routing setup
    const user = await this.parseService.login(email, password);
    if (user == 1) {
      alert('Login successful ');
      this.router.navigate(['/home-after-login']);
    } if (user == 0) {
      alert('incorrect name or password');
    }
  }
}
