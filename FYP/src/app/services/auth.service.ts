

declare var  google : any;
import { Injectable ,inject } from '@angular/core';

import {Router } from '@angular/router';
// import { Router } from 'express';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    isAuthenticated = this.isAuthenticatedSubject.asObservable();
    private isAuthenticatedAppLogin = new BehaviorSubject<boolean>(false);
    isAuthenticatedApp = this.isAuthenticatedAppLogin.asObservable();
  router = inject(Router);
     private isLoggedInKey = 'isLoggedIn';
     private loggedInStatus = new BehaviorSubject<boolean>(this.isUserLoggedIn());
     private userProfileSubject = new BehaviorSubject<any>(null);

    isUserLoggedIn(): boolean {
      return localStorage.getItem(this.isLoggedInKey) === 'true';
    }
    updateAuthenticationStatus(status: boolean) {
      this.isAuthenticatedSubject.next(status);
    }
    updateAuthenticationAppStatus(status: boolean) {
      this.isAuthenticatedAppLogin.next(status);
    }




    signOutGoogle(){
google.accounts.id.disableAutoSelect();
this.router.navigate(['/']);
    }

      logout() {
    localStorage.removeItem(this.isLoggedInKey);
    this.loggedInStatus.next(false);
  }

    login() {
    localStorage.setItem(this.isLoggedInKey, 'true');
    this.loggedInStatus.next(true);
  }


      get isLoggedInStatus(): Observable<boolean> {
    return this.loggedInStatus.asObservable();
  }

    get userProfile(): Observable<any> {
    return this.userProfileSubject.asObservable();
  }
  }
// declare var gapi: any;

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private isLoggedInKey = 'isLoggedIn';
//   private loggedInStatus = new BehaviorSubject<boolean>(this.isUserLoggedIn());
//   private auth2: any;
//   private clientId: string = '97636471110-ul294qidbi6pnruhcn01p7123k8duoh8.apps.googleusercontent.com'; // Replace with your actual client ID
//   private userProfileSubject = new BehaviorSubject<any>(null);


//   private googleUser?: gapi.auth2.GoogleUser;

//   constructor() {
//     this.initGoogleAuth();
//   }

  
//   get userProfile(): Observable<any> {
//     return this.userProfileSubject.asObservable();
//   }

//   initGoogleAuth(): Promise<void> {
//     return new Promise((resolve) => {
//       gapi.load('auth2', () => {
//         this.auth2 = gapi.auth2.init({
//           client_id: this.clientId,
//           cookiepolicy: 'single_host_origin',
//         }).then(() => {
//           resolve();
//         });
//       });
//     });
//   }

//   googleLogin(): Promise<void> {
//     return new Promise((resolve, reject) => {
     
//         this.auth2.signIn().then((user: gapi.auth2.GoogleUser) => {
//         this.googleUser = user; 
//         this.loggedInStatus.next(true);
//         localStorage.setItem(this.isLoggedInKey, 'true');
       
//         resolve();
//       }).catch((error: any) => {
//         console.error('Error signing in with Google:', error);
//         reject(error);
//       });
//     });
//   }

//   googleLogout(): Promise<void> {
//     return new Promise((resolve, reject) => {
//       this.auth2.signOut().then(() => {
//         this.loggedInStatus.next(false);
//         localStorage.removeItem(this.isLoggedInKey);
     
//         this.googleUser = undefined;
   
//         resolve();
//       }).catch((error: any) => {
//         console.error('Error signing out of Google:', error);
//         reject(error);
//       });
//     });
//   }
  
//   login() {
//     localStorage.setItem(this.isLoggedInKey, 'true');
//     this.loggedInStatus.next(true);
//   }

//   logout() {
//     localStorage.removeItem(this.isLoggedInKey);
//     this.loggedInStatus.next(false);
//   }
// isUserLoggedIn(): boolean {
//   return localStorage.getItem(this.isLoggedInKey) === 'true';
// }



//   get isLoggedInStatus(): Observable<boolean> {
//     return this.loggedInStatus.asObservable();
//   }
// }

