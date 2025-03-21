import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from '../../../../services/ticket.service';

@Component({
  selector: 'app-ramro-pay',
  imports: [],
  templateUrl: './ramro-pay.component.html',
  styleUrl: './ramro-pay.component.css'
})
export class RamroPayComponent implements OnInit{
  amount: any;
  id:any;

  constructor(private router: Router,private ticketService:TicketService) {
  }

  ngOnInit(): void {
    const navigation = history.state;
    
    if (navigation && navigation['amount'] && navigation['ticketId']) {
      this.amount = navigation['amount'];
      this.id= navigation['ticketId']
    } else {
      window.alert("Error in Processing Payment")
      this.router.navigate(['/tickets']);
    }
  }

  completePayment(){
    this.ticketService.completePayment(this.id).subscribe(
      (res:any)=>{
        window.alert("Payment Succesfully Completed")
      }
    )
    this.router.navigateByUrl('/tickets')
    localStorage.removeItem('paymentProcess')
  }
}
