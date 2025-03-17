import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl: string | null= null
  isLoggedIn():boolean
  {
    const userAuth=localStorage.getItem('isAuthenticated')
    if(userAuth=='false' || userAuth==null)
      {
        return false;
      }
      return true;
  }
  logOut()
  {
    localStorage.setItem('isAuthenticated','false')
    localStorage.removeItem('userDet')
  }
}
