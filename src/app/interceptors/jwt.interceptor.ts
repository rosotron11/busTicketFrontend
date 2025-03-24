
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn:"root"
})
export class JWTInterceptor implements HttpInterceptor
{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService=inject(AuthService)
    const router=inject(Router)
    if((localStorage.getItem('isAuthenticated')=='false'))
    {
      return next.handle(req)
    }
    else
    {
      const token=JSON.parse(localStorage.getItem('userDet')!)
      const newCloneRequest= req.clone(
        {
          setHeaders:{
            Authorization: `Bearer ${token.jwt}`
          }
        }
      )
      return next.handle(newCloneRequest).pipe(
        catchError((error:HttpErrorResponse)=>{
          console.log(error)
          if(error.status==403)
          {
            router.navigate(['/logout']);
          }
          return throwError(()=>error)
        })
      )
    }
  }
  
}