import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { LoginRequest } from '../interfaces/request/LoginRequest';
import { RegisterRequest } from '../interfaces/request/RegisterRequest';
import { IUser } from '../interfaces/user';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  backend = "http://localhost:8080/users";
  backendRegister = "http://localhost:8080/register";
  backendLogin = "http://localhost:8080/login";
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}
  
  getUser() {
    return this.http.get<IUser[]>(this.backend);
  }
  
  getUserById(id: number) {
    return this.http.get<IUser>(`${this.backend}/${id}`);
  }
  
  createUser(form: RegisterRequest) {
    return this.http.post(this.backendRegister, form, { responseType: 'text' })
      .subscribe((res: any) => {
        if (res === 'Username or email exists') {
          this.toastr.error("Username or Email exists. Use different.","Error");
        } else {
          const body = JSON.parse(res).body;
          console.log(body);
          localStorage.setItem("userDet", JSON.stringify(body));
          localStorage.setItem('isAuthenticated', "true");
          
          this.authService.updateAuthState(body);
          
          this.router.navigateByUrl("/home");
          this.toastr.success("Registered Successfully","Success")
        }
      });
  }
  
  loginUser(form: LoginRequest) {
    return this.http.post(this.backendLogin, form, { responseType: 'text' })
      .subscribe((res: any) => {
        if (res === 'Please Enter Correct Details') {
          this.toastr.error('Please Enter Correct Details', 'Error');
        } else {
          console.log(res);
          localStorage.setItem('userDet', res);
          localStorage.setItem('isAuthenticated', "true");
          
          const userData = JSON.parse(res);
          this.authService.updateAuthState(userData);


          this.toastr.success('Login Successful', 'Success');
          
          const redirectUrl = this.authService.redirectUrl || '/home';
          this.router.navigateByUrl(redirectUrl);
          this.authService.redirectUrl = null;
        }
      });
  }
  
  deleteUser(id: number) {
    return this.http.delete(`${this.backend}/${id}`, { responseType: 'text' })
      .subscribe((data: any) => {
        console.log(data);
      });
  }
  
  updateUser(id: number, form: FormGroup) {
    return this.http.put(`${this.backend}/${id}`, form.value, { responseType: 'text' }).subscribe(
      (res: any) => {
        if (res == 'Username or Email Already Exists') {
          this.toastr.error('Username or Email Already Exists','Error');
        }
        if (res == 'Updated') {
          this.router.navigateByUrl("/logout");
          this.toastr.success("Updated. Login Again.","Success")
        }
      }
    );
  }
  
  changePassword(id: number, form: FormGroup) {
    return this.http.post(`${this.backend}/${id}/changepassword`, form.value, { responseType: 'text' }).subscribe(
      (res: any) => {
        this.toastr.success("Password Changed","Success")
      }
    );
  }
  
  getUserDet(): Observable<any> {
    const loggedData = localStorage.getItem('userDet');
    if (!loggedData) return of(null);
    
    try {
      const userData = JSON.parse(loggedData);
      return of(userData);
    } catch (e) {
      console.error('Error parsing user data', e);
      return of(null);
    }
  }
  
  check(jwt: string) {
    return this.http.get<String>(`http://localhost:8080/check/${jwt}`);
  }
}
