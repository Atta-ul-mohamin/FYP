// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// declare var gapi: any;

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private isLoggedInKey = 'isLoggedIn';
//   private loggedInStatus = new BehaviorSubject<boolean>(this.isUserLoggedIn());
//   private auth2: any;
//   private clientId: string = '97636471110-ul294qidbi6pnruhcn01p7123k8duoh8.apps.googleusercontent.com'; // Your actual client ID here
//   private userProfileSubject = new BehaviorSubject<any>(null);

//   constructor() {
//     this.initGoogleAuth();
//   }

//   // Observable for components to subscribe to
//   get userProfile(): Observable<any> {
//     return this.userProfileSubject.asObservable();
//   }

//   initGoogleAuth(): Promise<void> {
//     return new Promise((resolve) => {
//       gapi.load('auth2', () => {
//         gapi.auth2.init({
//           client_id: this.clientId,
//           cookiepolicy: 'single_host_origin',
//         }).then(() => resolve());
//       });
//     });
//   }

//   googleLogin(): Promise<void> {
//     return new Promise((resolve, reject) => {
//       gapi.auth2.getAuthInstance().signIn().then((googleUser: gapi.auth2.GoogleUser) => {
//         // Store user profile information
//         const profile = googleUser.getBasicProfile();
//         console.log('User Profile:', profile); // Add this line to log the profile object
//         this.userProfileSubject.next({
//           id: profile.getId(),
//           name: profile.getName(),
//           imageUrl: profile.getImageUrl(),
//           email: profile.getEmail()
//         });
  
//         // Other login logic...
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
//       gapi.auth2.getAuthInstance().signOut().then(() => {
//         this.loggedInStatus.next(false);
//         localStorage.removeItem(this.isLoggedInKey);
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

//   isUserLoggedIn(): boolean {
//     return localStorage.getItem(this.isLoggedInKey) === 'true';
//   }

//   get isLoggedInStatus() {
//     return this.loggedInStatus.asObservable();
//   }
// }



import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInKey = 'isLoggedIn';
  private loggedInStatus = new BehaviorSubject<boolean>(this.isUserLoggedIn());
  private auth2: any;
  private clientId: string = '97636471110-ul294qidbi6pnruhcn01p7123k8duoh8.apps.googleusercontent.com'; // Replace with your actual client ID
  private userProfileSubject = new BehaviorSubject<any>(null);

  // Correctly declaring googleUser as optional
  private googleUser?: gapi.auth2.GoogleUser;

  constructor() {
    this.initGoogleAuth();
  }

  // Observable for components to subscribe to
  get userProfile(): Observable<any> {
    return this.userProfileSubject.asObservable();
  }

  initGoogleAuth(): Promise<void> {
    return new Promise((resolve) => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: this.clientId,
          cookiepolicy: 'single_host_origin',
        }).then(() => {
          resolve();
        });
      });
    });
  }

  googleLogin(): Promise<void> {
    return new Promise((resolve, reject) => {
      // this.auth2.signIn().then(() => {
        this.auth2.signIn().then((user: gapi.auth2.GoogleUser) => {
        this.googleUser = user; // Assign the user upon successful login
        this.loggedInStatus.next(true);
        localStorage.setItem(this.isLoggedInKey, 'true');
        // Additional logic to handle login with Google
        resolve();
      }).catch((error: any) => {
        console.error('Error signing in with Google:', error);
        reject(error);
      });
    });
  }

  googleLogout(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.auth2.signOut().then(() => {
        this.loggedInStatus.next(false);
        localStorage.removeItem(this.isLoggedInKey);
        // Clear the googleUser upon logout
        this.googleUser = undefined;
        // Additional logic to handle logout
        resolve();
      }).catch((error: any) => {
        console.error('Error signing out of Google:', error);
        reject(error);
      });
    });
  }
  
  login() {
    localStorage.setItem(this.isLoggedInKey, 'true');
    this.loggedInStatus.next(true);
  }

  logout() {
    localStorage.removeItem(this.isLoggedInKey);
    this.loggedInStatus.next(false);
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem(this.isLoggedInKey) === 'true';
  }

  get isLoggedInStatus(): Observable<boolean> {
    return this.loggedInStatus.asObservable();
  }
}

