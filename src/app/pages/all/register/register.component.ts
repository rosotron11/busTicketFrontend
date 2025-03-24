import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [UserService]
})
export class RegisterComponent {
  constructor(private userService:UserService, private router:Router)
  {

  }
  roles:string='passenger'
  registerForm: FormGroup = new FormGroup({
    username: new FormControl('',[Validators.required,Validators.minLength(2)]),
    password: new FormControl('',[Validators.required,Validators.minLength(2)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    roles:new FormControl('')
  })
  submitForm(){
    if(this.registerForm.valid)
    {
      this.userService.createUser(this.registerForm.value)
      this.router.navigateByUrl("/search")
    }
    else{
      console.log("error")
    }
  }
  oldLogin()
  {
    this.router.navigateByUrl("login")
  }
  switchRoles(roles: string) {
    this.roles=roles;
    this.registerForm.controls['roles'].setValue(roles);
  }
}
