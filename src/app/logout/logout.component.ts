import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent{
  constructor(private router:Router)
  {
    localStorage.removeItem('userDet')
    localStorage.setItem('isAuthenticated','false')
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 20);
  }
}
