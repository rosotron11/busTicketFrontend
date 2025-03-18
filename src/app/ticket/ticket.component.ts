import { Component, inject, OnInit } from '@angular/core';
import { TicketService } from '../services/ticket.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-ticket',
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
  providers:[TicketService]
})
export class TicketComponent implements OnInit{
  
  tickets:any[]=[]
  authService=inject(AuthService)
  loggedData=localStorage.getItem('userDet');
  userData=JSON.parse(this.loggedData!)
  constructor(private ticketService:TicketService)
  {
    
  }

  ngOnInit(): void {
      this.fetchData()
  }

  fetchData(){
    this.ticketService.getTicketbyUserId(this.userData.id).subscribe(data=>
      {
        this.tickets=data
        console.log(data)
      }
    )
  }

  deleteTicket(ticket:any)
  {
    this.ticketService.deleteTicket(ticket.id);
    this.tickets = this.tickets.filter(item => item.id != ticket.id);
  }

}
