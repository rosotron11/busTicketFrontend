import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { BusComponent } from './bus/bus.component';
import { TicketComponent } from './ticket/ticket.component';
import { BusRegistrationComponent } from './bus-registration/bus-registration.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { LogoutComponent } from './logout/logout.component';
import { authGuard, loginAuthGuard } from './guard/auth.guard';

export const routes: Routes = [
    {
        path:"home",
        component:HomeComponent
    },
    {
        path:"login",
        component:LoginComponent,
        canActivate:[loginAuthGuard]
    },
    {
        path:"register",
        component:RegisterComponent,
        canActivate:[loginAuthGuard]
    },
    {
        path:"user",
        component:UserComponent,
        canActivate:[authGuard]
    },
    {
        path:"bus",
        component:BusComponent
    },
    {
        path:"bus/:source/:destination/:doj",
        component:BusComponent,
        canActivate:[authGuard]
    },
    {
        path:"bus/create",
        component:BusRegistrationComponent,
        canActivate:[authGuard]
    },
    {
        path:"ticket",
        component:TicketComponent,
        canActivate:[authGuard]
    },
    {
        path:"search",
        component:SearchComponent
    },
    {
        path:"profile",
        component:ProfileComponent,
        canActivate:[authGuard]
    },
    {
        path:"logout",
        component:LogoutComponent,
        canActivate:[authGuard]
    },
    {
        path:"**",
        redirectTo:"home"
    }
];
