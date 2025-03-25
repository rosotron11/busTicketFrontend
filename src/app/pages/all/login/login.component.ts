import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;
  constructor(private userService:UserService, private router:Router,
    private authService:AuthService, private toastr:ToastrService
  )
  {
    this.loginForm= new FormGroup({
      usernameOrEmail:new FormControl('',[Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
        ),
      ])
    })
  }
  

  submitForm(){
    console.log(this.loginForm)
    if (this.loginForm.valid)
    {
    this.userService.loginUser(this.loginForm.value)
    
    }
    if (this.loginForm.controls['passenger'].invalid)
    {
      this.toastr.error("Atleast 1 Capital Letter, 1 Number & 1 Special Character",'Error')
    }
  }
  newSignUp()
  {
    this.router.navigateByUrl("register")
  }
}
