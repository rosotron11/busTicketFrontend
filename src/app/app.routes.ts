import { Routes } from '@angular/router';
import { HomeComponent } from './pages/all/home/home.component';
import { LogoutComponent } from './pages/all/logout/logout.component';
import { adminGuard, authGuard, conductorGuard, loginAuthGuard, paymentGuard } from './guard/auth.guard';
import { AllUsersComponent } from './pages/admin/all-users/all-users.component';
import { SajiloPayComponent } from './pages/all/payment-gateway/sajilo-pay/sajilo-pay.component';
import { LoginComponent } from './pages/all/login/login.component';
import { SearchComponent } from './pages/all/search/search.component';
import { ProfileComponent } from './pages/all/profile-activity/profile/profile.component';
import { RegisterComponent } from './pages/all/register/register.component';
import { MyBusComponent } from './pages/conductor/my-bus/my-bus.component';
import { BusRegistrationComponent } from './pages/conductor/bus-registration/bus-registration.component';
import { TicketComponent } from './pages/all/ticket/ticket.component';
import { RamroPayComponent } from './pages/all/payment-gateway/ramro-pay/ramro-pay.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ConductorDashboardComponent } from './pages/conductor/conductor-dashboard/conductor-dashboard.component';

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
        path:"my-bus",
        component:MyBusComponent,
        canActivate:[authGuard,conductorGuard]
    },
    {
        path:"search",
        component:SearchComponent,
        canActivate:[authGuard]  
    },
    {
        path:"search/:source/:destination/:doj",
        component:SearchComponent,
        canActivate:[authGuard],
        pathMatch:"full"
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
        path:"all-users",
        component:AllUsersComponent,
        canActivate:[authGuard,adminGuard]
    },
    {
        path:"dashboard",
        component:DashboardComponent,
        canActivate:[authGuard,adminGuard]
    },
    {
        path:"dashboard/operator",
        component:ConductorDashboardComponent,
        canActivate:[authGuard,conductorGuard]
    },
    {
        path:"RamroPay",
        component:RamroPayComponent,
        canActivate:[authGuard,paymentGuard]
    },
    {
        path:"SajiloPay",
        component:SajiloPayComponent,
        canActivate:[authGuard,paymentGuard]
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
