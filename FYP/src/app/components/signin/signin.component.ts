declare var google : any
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ParseService } from 'src/app/services/parse.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  nameGoogle: string = '';
  emailGoogle: string = '';
  imageGoogle: string = '';

  constructor(
    private parseService: ParseService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initGoogleSignIn();
  }

  private initGoogleSignIn(): void {
    google.accounts.id.initialize({
      client_id: '66603945155-dfvk6kum2qrsu3igtd8e2qfj00k40ts3.apps.googleusercontent.com',
      callback: (response: any) => this.handleGoogleLogin(response)
    });

    google.accounts.id.renderButton(
      document.getElementById('google-btn'), {
        theme: 'filled_blue',
        size: 'large',
        shape: 'rectangle',
        width: 350,
      }
    );

    this.authService.updateAuthenticationAppStatus(false);
    this.authService.updateAuthenticationStatus(false);
  }

  async onLogin(email: string, password: string) {
    const user = await this.parseService.login(email, password);
    console.log(user);

    if (user && user.status >= 2 && user.status <= 5) {
      this.setSessionStorage(user);
      this.navigateToRoute(user.status);
    } else {
      alert('Incorrect name or password');
    }
  }

  private handleGoogleLogin(response: any) {
    if (response) {
      const payload = this.decodeToken(response.credential);
      sessionStorage.setItem("loggedInUser", JSON.stringify(payload));
      this.updateUserProperties();
      this.onLogin(payload.email, "null"); // Assuming 'null' password is handled by your logic
    }
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]));
  }

  private setSessionStorage(user: any) {
    sessionStorage.setItem("loggedInUser", JSON.stringify({
      name: user.name,
      picture: user.picture || 'default-image-url',
      email: user.email
    }));
    this.updateUserProperties();
  }

  private updateUserProperties() {
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser")!);
    this.nameGoogle = loggedInUser?.name;
    this.imageGoogle = loggedInUser?.picture;
    this.emailGoogle = loggedInUser?.email;
  }

  private navigateToRoute(status: number) {
    let route = '';
    switch (status) {
      
      case 3:
        route = '/profession-details';
        break;
        case 2:
          route = '/home-after-login';
          break;
      case 4:
      case 5:
        route = '/profile';
        break;
      default:
        route = '/home-after-login';
        break;
    }
    this.router.navigate([route]);
  }
}

//   async signup(name: string , email:string  , password:string )
//   {
  
// const user = await this.parseService.signupGoogle(name,email,password);
// console.log(user.status)
// if (user.status == 2) {
//   alert('Login successful ');
//   this.auth.updateAuthenticationStatus(true);
//   this.router.navigate(['/home-after-login']);
// }

// else if (user.status == 3) {
//   alert('Login successful ');
//   this.auth.updateAuthenticationStatus(true);
//   this.router.navigate(['/profession-details']); 
// } 

// else if (user.status == 4) {
//   alert('Login successful ');
//   this.auth.updateAuthenticationStatus(true);
//   this.router.navigate(['/profile']);
// } 

 
// else if (user.status == 5) {
//   alert('Login successful '); 
//   this.auth.updateAuthenticationStatus(true);
//   this.router.navigate(['/profile']);
// } 

//  else if (user.status == 0) {
//   // alert('incorrect name or password');
// }
  // }
  


