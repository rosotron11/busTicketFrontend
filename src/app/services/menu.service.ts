import { Injectable } from '@angular/core';
import { MenuItem } from '../interfaces/nav-items';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
    private menuList: MenuItem[] = [
      { path: '/home', title: 'Home', roles: ['passenger', 'all', 'operator', 'admin'] },
      { path: '/search', title: 'Search Buses', roles: ['passenger', 'all', 'operator'] },
      { path: '/bus/create', title: 'Add your Bus', roles: ['operator'] },
      { path: '/my-ticket', title: 'My Tickets', roles: ['operator', 'passenger'] },
      { path: '/my-bus', title: 'My Buses', roles: ['operator'] },
      { path: '/all-users', title: 'All Users', roles: ['admin'] },
      { path: '/dashboard', title: 'Dashboard', roles: ['admin'] },
      { path: '/dashboard/operator', title: 'Operator Dashboard', roles: ['operator'] },
      { path: '/login', title: 'Login', roles: ['all'] },
      { path: '/register', title: 'Register', roles: ['all'] },
      { path: '/profile', title: 'Profile', roles: ['passenger', 'operator'] },
      { path: '/logout', title: 'Logout', roles: ['passenger', 'operator', 'admin'] }
    ];
  
    getMenuItems(): Observable<MenuItem[]> {
      return of(this.menuList);
    }
}
