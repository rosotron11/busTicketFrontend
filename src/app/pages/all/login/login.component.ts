import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';

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
    usernameOrEmail:new FormControl('',[Validators.required]),
    password: new FormControl('',[])
  })

  submitForm(){
    if (this.loginForm.valid)
    {
    this.userService.loginUser(this.loginForm.value)
    
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
