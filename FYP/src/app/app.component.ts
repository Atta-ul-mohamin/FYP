import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  
  title = 'FYP';
  constructor(private authService: AuthService , private router: Router) {}

  isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }


  shouldShowHeader(): boolean {
    // Define paths where you want to hide the header and footer
    const pathsToHide = ['/home-after-login' ];

    // Get the current route URL
    const currentRoute = this.router.url;

    // Check if the current route is in the pathsToHide array
    return !pathsToHide.includes(currentRoute);
  }

  shouldShowFooter(): boolean {
    // Define paths where you want to hide the header and footer
    const pathsToHide = ['/' , '/signup' , '/signin' ,'/profile' ,'/profession-details' ,'/' ];

    // Get the current route URL
    const currentRoute = this.router.url;

    // Check if the current route is in the pathsToHide array
    return !pathsToHide.includes(currentRoute);
  }


}
