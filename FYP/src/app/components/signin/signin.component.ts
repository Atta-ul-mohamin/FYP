declare var google : any
import { Component, OnInit, inject, resolveForwardRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ParseService } from 'src/app/services/parse.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit{
  auth = inject(AuthService);
  nameGoogle: string ='';
  emailGoogle : string = '';
  imageGoogle : string = '';

  
private router = inject(Router);
ngOnInit(): void {
    google.accounts.id.initialize({
      client_id:'66603945155-dfvk6kum2qrsu3igtd8e2qfj00k40ts3.apps.googleusercontent.com',
      callback:(resp:any)=>this.handleLogin(resp)
      
   

    });


    google.accounts.id.renderButton(document.getElementById("google-btn"),{
      theme: 'filled_blue',
      size:  'large',
      shape: 'rectangle',
      width: 350,

    })

    this.auth.updateAuthenticationAppStatus(false);
    this.auth.updateAuthenticationStatus(false);


}
  constructor(private parseService: ParseService , private authservice : AuthService) { }


  async onLogin(email: string, password: string) {
    // this.authService.login();
    const user = await this.parseService.login(email, password);
    console.log(user);
   
    if (user.status == 2) {
      alert('Login successful ');
      // this.auth.updateAuthenticationAppStatus(true);
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
 

  private decodeToken(token:string){
    return JSON.parse(atob(token.split(".")[1]));
  }

  handleLogin(response:any){


    if(response){
      const payLoad = this.decodeToken(response.credential);
      sessionStorage.setItem("loggedInUser",JSON.stringify(payLoad));
      this.nameGoogle = JSON.parse(sessionStorage.getItem("loggedInUser")!).name;
      this.imageGoogle = JSON.parse(sessionStorage.getItem("loggedInUser")!).picture;
      this.emailGoogle = JSON.parse(sessionStorage.getItem("loggedInUser")!).email;
      
      this.onLogin(this.emailGoogle,"null")
      // this.router.navigate(['/home-after-login']);
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
  


}