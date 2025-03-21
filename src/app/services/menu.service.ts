import { Injectable } from '@angular/core';
import { MenuItem } from '../interfaces/nav-items';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
    private menuList: MenuItem[] = [
      { path: '/home', title: 'Home', roles: ['passenger', 'all', 'conductor', 'admin'] },
      { path: '/search', title: 'Search Buses', roles: ['passenger', 'all', 'conductor'] },
      { path: '/bus/create', title: 'Add your Bus', roles: ['conductor'] },
      { path: '/my-ticket', title: 'My Tickets', roles: ['conductor', 'passenger'] },
      { path: '/my-bus', title: 'My Buses', roles: ['conductor'] },
      { path: '/all-users', title: 'All Users', roles: ['admin'] },
      { path: '/dashboard', title: 'Dashboard', roles: ['admin'] },
      { path: '/dashboard/conductor', title: 'Conductor Dashboard', roles: ['conductor'] },
      { path: '/login', title: 'Login', roles: ['all'] },
      { path: '/register', title: 'Register', roles: ['all'] },
      { path: '/profile', title: 'Profile', roles: ['passenger', 'conductor'] },
      { path: '/logout', title: 'Logout', roles: ['passenger', 'conductor', 'admin'] }
    ];
  
    getMenuItems(): Observable<MenuItem[]> {
      return of(this.menuList);
    }
}
