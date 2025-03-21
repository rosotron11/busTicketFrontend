import { Component, inject, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { TicketService } from '../../../services/ticket.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-ticket',
  imports: [FormsModule],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
  providers:[TicketService]
})
export class TicketComponent implements OnInit{
  paymentGateway: string='';
  tickets:any[]=[]
  authService=inject(AuthService)
  loggedData=localStorage.getItem('userDet');
  userData=JSON.parse(this.loggedData!)
  constructor(private ticketService:TicketService, private router:Router)
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
  paymentChange(event:Event)
  {
    const selectElement = event.target as HTMLSelectElement;
    this.paymentGateway = selectElement.value;
  }
  routeToPayment(amount:any,id:number)
  {
    localStorage.setItem('paymentProcess','true')
    this.router.navigateByUrl(`/${this.paymentGateway}`,
      {state: {amount: amount,ticketId: id}})
  }

}
