import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AuthState {
  isAuthenticated: boolean;
  userRole?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl: string | null = null;
  
  private authStateSubject = new BehaviorSubject<AuthState>(this.getInitialAuthState());
  authState$: Observable<AuthState> = this.authStateSubject.asObservable();
  
  constructor() {}
  
  private getInitialAuthState(): AuthState {
    const isAuthenticated = this.isLoggedIn();
    let userRole;
    
    if (isAuthenticated) {
      const userDet = localStorage.getItem('userDet');
      if (userDet) {
        try {
          userRole = JSON.parse(userDet).roles;
        } catch (e) {
          console.error('Error parsing user data', e);
        }
      }
    }
    
    return { isAuthenticated, userRole };
  }
  
  isLoggedIn(): boolean {
    const userAuth = localStorage.getItem('isAuthenticated');
    return !(userAuth === 'false' || userAuth === null);
  }
  
  updateAuthState(userData: any = null): void {
    if (userData) {
      this.authStateSubject.next({
        isAuthenticated: true,
        userRole: userData.roles
      });
    } else {
      this.authStateSubject.next({
        isAuthenticated: false
      });
    }
  }
  
  logOut(): void {
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.setItem('userDet','{roles: "all"}');
    
    this.updateAuthState();
  }
}
