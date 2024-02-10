import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInKey = 'isLoggedIn';
  // Use BehaviorSubject to emit changes and hold the current login state
  private loggedInStatus = new BehaviorSubject<boolean>(this.isUserLoggedIn());

  constructor() {}

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

  // Provide a method to get the Observable for components to subscribe to
  get isLoggedInStatus() {
    return this.loggedInStatus.asObservable();
  }
}