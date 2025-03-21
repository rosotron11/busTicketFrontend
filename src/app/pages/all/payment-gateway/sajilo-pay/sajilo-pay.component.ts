import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from '../../../../services/ticket.service';

@Component({
  selector: 'app-sajilo-pay',
  imports: [],
  templateUrl: './sajilo-pay.component.html',
  styleUrl: './sajilo-pay.component.css'
})
export class SajiloPayComponent implements OnInit{
  amount: number=0;
  id:number=0;

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
