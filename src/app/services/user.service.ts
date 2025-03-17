import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  backend= "http://localhost:8080/users"
  backendRegister="http://localhost:8080/register"
  backendLogin="http://localhost:8080/login"
    constructor(private http:HttpClient) { }
  
    getUser()
    {
      return this.http.get<any[]>(this.backend);
    }

    getUserById(id:number)
    {
      return this.http.get<any>(`${this.backend}/${id}`);
    }

    createUser(form:any)
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

    loginUser(form:any)
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

    updateUser(id:number, form:any)
    {
      return this.http.put(`${this.backend}/${id}`,form,{responseType:'text'}).subscribe(
        (res:any)=>
        {
          console.log(res)
        }
      )
    }

    changePassword(id:number,form:any)
    {
      return this.http.post(`${this.backend}/${id}/changepassword`,form,{responseType:'text'}).subscribe(
      (res:any)=>{
        console.log(res)
      }
      )
    }
    
    getUserDet(): Observable<any> {
      const loggedData=localStorage.getItem('userDet');
      const userData=JSON.parse(loggedData!)
      return of(userData);
    }
}
