import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IUser } from '../interfaces/user';
import { FormGroup } from '@angular/forms';
import { LoginRequest } from '../interfaces/request/LoginRequest';
import { RegisterRequest } from '../interfaces/request/RegisterRequest';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  backend= "http://localhost:8080/users"
  backendRegister="http://localhost:8080/register"
  backendLogin="http://localhost:8080/login"
    constructor(private http:HttpClient, private router:Router) { }
  
    getUser()
    {
      return this.http.get<IUser[]>(this.backend);
    }

    getUserById(id:number)
    {
      return this.http.get<IUser>(`${this.backend}/${id}`);
    }

    createUser(form:RegisterRequest)
    {
      return this.http.post(this.backendRegister,form,{responseType:'text'})
      .subscribe((res:any)=>{
        if(res==='Username or email exists')
          {
            window.alert("Username or Email exists. Use different.")
          }
          else
          {
            const body= JSON.parse(res).body
            console.log(body)
            localStorage.setItem("userDet",JSON.stringify(body))
            localStorage.setItem('isAuthenticated',"true")
          }
      })
    }

    loginUser(form:LoginRequest)
    {
      return this.http.post(this.backendLogin,form,{responseType:'text'})
      .subscribe((res:any)=>{
        if(res==='Please Enter Correct Details')
        {
          window.alert(res)
        }
        else
        {
          console.log(res)
          localStorage.setItem('userDet',res)
          localStorage.setItem('isAuthenticated',"true")
        }
      })
    }

    deleteUser(id:number)
    {
      return this.http.delete(`${this.backend}/${id}`,{responseType:'text'})
      .subscribe((data:any)=>{
        console.log(data)
      })
    }

    updateUser(id:number, form:FormGroup)
    {
      return this.http.put(`${this.backend}/${id}`,form.value,{responseType:'text'}).subscribe(
        (res:any)=>
        {
          if(res=='Username or Email Already Exists')
          {
            window.alert('Username or Email Already Exists')
          }
          if(res=='Updated')
          {
            this.router.navigateByUrl("/logout")
          }
        }
      )
    }

    changePassword(id:number,form:FormGroup)
    {
      return this.http.post(`${this.backend}/${id}/changepassword`,form.value,{responseType:'text'}).subscribe(
      (res:any)=>{
        console.log(res)
      }
      )
    }
    
    getUserDet(): Observable<JSON> {
      const loggedData=localStorage.getItem('userDet');
      const userData=JSON.parse(loggedData!)
      return of(userData);
    }

    check(jwt:string)
    {
      return this.http.get<String>(`http://localhost:8080/check/${jwt}`)
    }
}
