import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { TicketService } from '../../../services/ticket.service';
import { BusService } from '../../../services/bus.service';
import { ShowBusComponent } from "../show-bus/show-bus.component";
import { ShowTicketComponent } from "../show-ticket/show-ticket.component";
import { IUser } from '../../../interfaces/user';
import { NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-users',
  imports: [ShowBusComponent, ShowTicketComponent, CommonModule],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent implements OnInit{

  users:IUser[]=[]
  displayUsers:IUser[]=[]
  selectedUser!: IUser;
  activatedBusPanel:boolean=false
  activatedTicketPanel:boolean=false
  constructor(private userService:UserService,private ticketService:TicketService, private busService:BusService)
  {
    this.userService.getUser().subscribe(
      (res:IUser[])=>{
        this.users=res
        this.displayUsers=this.users
        console.log(this.displayUsers)
      }
    );
  }
  ngOnInit(): void {
    this.showAll()
  }
  showPassengers()
  {
    this.displayUsers=this.users.filter(user=>user.roles==='passenger')
  }
  showConductors()
  {
    this.displayUsers=this.users.filter(user=>user.roles==='conductor')
  }
  showAll()
  {
    this.displayUsers=this.users
  }
  showTicket(user: IUser) 
  {
    this.selectedUser=user
    this.activatedTicketPanel=true
  }
    
  showBus(user: IUser) 
  {
    this.selectedUser=user;
    this.activatedBusPanel=true
  }
  closeTicketPanel()
  {
    this.activatedTicketPanel=false
  }
  closeBusPanel()
  {
    this.activatedBusPanel=false
  }
  delete(user:IUser)
  {
    if(user.roles=='admin')
    {
      window.alert("Cannot Delete Admin")
    }
    else
    {
      this.userService.deleteUser(user.id)
      this.displayUsers = this.displayUsers.filter(item => item.id != user.id);
    }
  }
}
