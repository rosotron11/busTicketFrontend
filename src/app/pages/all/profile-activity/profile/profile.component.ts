import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileUpdateComponent } from "../profile-update/profile-update.component";
import { ProfileChangePasswordComponent } from '../profile-change-password/profile-change-password.component';
import { UserService } from '../../../../services/user.service';
import { IUser } from '../../../../interfaces/user';
import { FormGroup } from '@angular/forms';

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
  profile!: IUser;
  ngOnInit(): void {
    const id=JSON.parse(localStorage.getItem('userDet')!).id
    this.userService.getUserById(id).subscribe((res:IUser)=>
    {
      console.log(res)
      this.profile=res;
    })
  }

  delete(id:number)
  {
    this.userService.deleteUser(id);
    this.router.navigateByUrl("/home");
    window.alert("Your Account has been deleted")
  }

  update(id:number,form:FormGroup)
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
  change(id:number,form:FormGroup)
  {
    this.userService.changePassword(id,form)
  }
}
