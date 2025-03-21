import { Component, inject, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { TicketService } from '../../../services/ticket.service';
import { AuthService } from '../../../services/auth.service';
import { ITicket } from '../../../interfaces/ticket';

@Component({
  selector: 'app-ticket',
  imports: [FormsModule],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
  providers:[TicketService]
})
export class TicketComponent implements OnInit{
  paymentGateway: string='';
  tickets:ITicket[]=[]
  authService=inject(AuthService)
  constructor(private ticketService:TicketService, private router:Router)
  {
    
  }

  ngOnInit(): void {
    const userDet=JSON.parse(localStorage.getItem('userDet')!)
    this.ticketService.getTicketbyUserId(userDet.id).subscribe(
      (res:ITicket[])=>
      {
        console.log(res)
        this.tickets=res
      }
    )
  }

  deleteTicket(ticket:ITicket)
  {
    this.ticketService.deleteTicket(ticket.id);
    this.tickets = this.tickets.filter(item => item.id != ticket.id);
  }
  paymentChange(event:Event)
  {
    const selectElement = event.target as HTMLSelectElement;
    this.paymentGateway = selectElement.value;
  }
  routeToPayment(amount:number,id:number)
  {
    localStorage.setItem('paymentProcess','true')
    this.router.navigateByUrl(`/${this.paymentGateway}`,
      {state: {amount: amount,ticketId: id}})
  }

}
