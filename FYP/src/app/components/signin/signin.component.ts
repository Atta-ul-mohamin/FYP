
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ParseService } from 'src/app/services/parse.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent {


  constructor(private parseService: ParseService, private authService: AuthService, private router: Router) { }


  async onLogin(email: string, password: string) {

  
    this.authService.login();
    
   
  
   
    const user = await this.parseService.login(email, password);
    console.log(user);
   
    if (user.status == 2) {
   
      alert('Login successful ');
   
      this.router.navigate(['/home-after-login']);
   
    }
    else if (user.status == 3) {
   
      alert('Login successful ');
   
      this.router.navigate(['/profession-details']);
   
    } 
    
    else if (user.status == 4) {
   
      alert('Login successful ');
   
      this.router.navigate(['/profile']);
   
    } 

     
    else if (user.status == 5) {
   
      alert('Login successful ');
   
      this.router.navigate(['/profile']);
   
    } 
     else if (user.status == 0) {
   
      alert('incorrect name or password');
   
    }
  }
  onGoogleLogin() {
    this.authService.googleLogin().then(() => {
      this.router.navigate(['/home-after-login']);
    }).catch((error: any) => {
      console.error('Google Sign-In error:', error);
    });
  }
  


}