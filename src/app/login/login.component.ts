import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private userService:UserService, private router:Router,
    private authService:AuthService
  )
  {

  }
  loginForm:FormGroup= new FormGroup({
    username:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.email]),
    password: new FormControl('',[])
  })

  submitForm(){
    if (this.loginForm.valid)
    {
    this.userService.loginUser(this.loginForm.value)
    const redirectUrl = this.authService.redirectUrl ? this.authService.redirectUrl : "/search"
    this.router.navigateByUrl(redirectUrl)
    }
    else
    {
      console.log("login error")
    }
  }
  newSignUp()
  {
    this.router.navigateByUrl("register")
  }
}
