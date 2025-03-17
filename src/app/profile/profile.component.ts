import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ProfileUpdateComponent } from "../profile-update/profile-update.component";
import { ProfileChangePasswordComponent } from '../profile-change-password/profile-change-password.component';

@Component({
  selector: 'app-profile',
  imports: [ProfileUpdateComponent, ProfileChangePasswordComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  activeUpdate: boolean = false;
  activeChange: boolean = false;
  updateToAPI: boolean=false;
  constructor(private userService:UserService, private router:Router)
  {

  }
  profile:any=null
  ngOnInit(): void {
      this.profile=JSON.parse(localStorage.getItem('userDet')!)
  }

  delete(id:number)
  {
    this.userService.deleteUser(id);
    this.router.navigateByUrl("/home");
    window.alert("Your Account has been deleted")
  }

  update(id:number,form:any=0)
  {
    console.log("Button clicked")
    this.userService.updateUser(id,form);
  }
  showUpdate(id:number)
  {
    this.activeUpdate=true
  }
  showChange(id:number)
  {
    this.activeChange=true
  }
  change(id:number,form:any=0)
  {
    this.userService.changePassword(id,form)
  }
}
