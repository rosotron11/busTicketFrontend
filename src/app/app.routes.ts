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
import { authGuard, conductorGuard, loginAuthGuard } from './guard/auth.guard';
import { MyBusComponent } from './my-bus/my-bus.component';
import { BusPassengersComponent } from './bus-passengers/bus-passengers.component';

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
        path:"my-bus",
        component:MyBusComponent,
        canActivate:[authGuard,conductorGuard]
    },
    {
        path:"bus/:source/:destination/:doj",
        component:BusComponent,
        canActivate:[authGuard]
    },
    {
        path:"bus/create",
        component:BusRegistrationComponent,
        canActivate:[authGuard,conductorGuard]
    },
    {
        path:"my-ticket",
        component:TicketComponent,
        canActivate:[authGuard]
    },
    {
        path:"search",
        component:SearchComponent
    },
    // {
    //     path:"bus/passengers",
    //     component:BusPassengersComponent,
    //     canActivate:[authGuard,conductorGuard]
    // },
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
