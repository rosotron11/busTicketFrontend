import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from '../../../../services/ticket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ramro-pay',
  imports: [],
  templateUrl: './ramro-pay.component.html',
  styleUrl: './ramro-pay.component.css'
})
export class RamroPayComponent implements OnInit{
  amount: number=0;
  ticketNumber:string='';
  id:number=0;

  constructor(private router: Router,private ticketService:TicketService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    const navigation = history.state;
    
    if (navigation && navigation['amount'] && navigation['ticketId']) {
      this.amount = navigation['amount'];
      this.id= navigation['ticketId']
      this.ticketNumber= navigation['ticketNumber']
    } else {
      this.toastr.error("Error in Processing Payment","Error")
      this.router.navigate(['/tickets']);
    }
  }

  completePayment(){
    this.ticketService.completePayment(this.id).subscribe(
      (res:any)=>{
        this.toastr.success("Payment Succesfully Completed","Success")
      }
    )
    this.router.navigateByUrl('/tickets')
    localStorage.removeItem('paymentProcess')
  }
}
