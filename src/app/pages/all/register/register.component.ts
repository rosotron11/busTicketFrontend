import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [UserService],
})
export class RegisterComponent {
  constructor(private userService: UserService, private router: Router, private toastr:ToastrService) {}
  roles: string = 'passenger';
  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
      Validators.pattern('^[a-zA-Z0-9_]+$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
      ),
    ]),
    email: new FormControl('', [Validators.required,
      Validators.email,
      Validators.maxLength(50)]),
    roles: new FormControl('', [Validators.required,
      Validators.pattern('^(passenger|operator)$')
    ]),
  });
  submitForm() {
    this.registerForm.controls['roles'].setValue(this.roles);
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      this.userService.createUser(this.registerForm.value);
      this.router.navigateByUrl('/search');
    } else {
      this.toastr.error("Form Not Valid","Error")
    }
  }
  oldLogin() {
    this.router.navigateByUrl('login');
  }
  switchRoles(roles: string) {
    this.roles = roles;
    this.registerForm.controls['roles'].setValue(roles);
  }
}
