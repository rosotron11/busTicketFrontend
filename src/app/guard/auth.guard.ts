import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router=inject(Router)
  const authService=inject(AuthService)
  if(authService.isLoggedIn())
  {
    return true;
  }
  authService.redirectUrl=state.url
  router.navigateByUrl("/login")
  return false;
};

export const conductorGuard: CanActivateFn = (route, state) => {
  const router=inject(Router)
  const authService=inject(AuthService)
  const loggedData=localStorage.getItem('userDet');
  const userData=JSON.parse(loggedData!)
  if(userData.roles=="operator")
  {
    return true;
  }
  router.navigateByUrl("/home")
  return false;
};


export const loginAuthGuard: CanActivateFn = (route, state) => {
  const router=inject(Router)
  const authService=inject(AuthService)
  if(authService.isLoggedIn())
  {
    router.navigateByUrl("/home")
    return false;
  }
  return true;
};

export const adminGuard: CanActivateFn = (route, state) => {
  const router=inject(Router)
  const authService=inject(AuthService)
  const loggedData=localStorage.getItem('userDet');
  const userData=JSON.parse(loggedData!)
  if(userData.roles=="admin")
  {
    return true;
  }
  router.navigateByUrl("/home")
  return false;
};

export const notAdminGuard: CanActivateFn = (route, state) => {
  const router=inject(Router)
  const authService=inject(AuthService)
  const loggedData=localStorage.getItem('userDet');
  const userData=JSON.parse(loggedData!)
  if(userData.roles=="admin")
  {
    return false;
  }
  router.navigateByUrl("/home")
  return true;
};

export const paymentGuard: CanActivateFn = (route, state) => {
  const router=inject(Router)
  const paymentProcess=localStorage.getItem('paymentProcess');
  if(paymentProcess=='true')
  {
    return true;
  }
  router.navigateByUrl("/home")
  return false;
};
