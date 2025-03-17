import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{

  users:any[]=[]

  constructor(private userService:UserService)
  {

  }

  ngOnInit(): void {
      this.userService.getUser().subscribe(data=>
      {
        this.users=data
      }
      )
  }

  deleteUser(user:any)
  {
    console.log(user.id)
    this.userService.deleteUser(user.id);
    this.users=this.users.filter(item=>item.id!=user.id);
  }
}
