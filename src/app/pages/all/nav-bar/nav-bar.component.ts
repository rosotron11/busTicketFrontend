import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MenuItem } from '../../../interfaces/nav-items';
import { MenuService} from '../../../services/menu.service';
import { AuthService } from '../../../services/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports:[RouterLink,AsyncPipe],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  menuList$: Observable<MenuItem[]> | undefined;
  
  constructor(
    private menuService: MenuService,
    private authService: AuthService
  ) {}
  
  ngOnInit(): void {
    this.menuList$ = this.authService.authState$.pipe(
      switchMap(authState => {
        if (authState.isAuthenticated) {
          const userRole = authState.userRole || this.getUserRoleFromStorage();
          
          return this.menuService.getMenuItems().pipe(
            map(menuItems => menuItems.filter(item => 
              item.roles!.includes(userRole)
            ))
          );
        } else {
          return this.menuService.getMenuItems().pipe(
            map(menuItems => menuItems.filter(item => 
              item.roles!.includes('all')
            ))
          );
        }
      })
    );
  }
  
  private getUserRoleFromStorage(): string {
    const userData = localStorage.getItem('userDet');
    if (userData) {
      try {
        return JSON.parse(userData).roles;
      } catch (e) {
        console.error('Error parsing user data from localStorage', e);
      }
    }
    return 'all';
  }
}