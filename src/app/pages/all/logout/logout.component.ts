import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.logOut();
    
    this.router.navigateByUrl('/home');
  }
}