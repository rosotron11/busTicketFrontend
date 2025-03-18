import { Component, Input, NgModule } from '@angular/core';
import { TicketService } from '../services/ticket.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  imports: [FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  @Input() activeBus:any
  selectedBoardingPlace: any;
  selectedDropOffPlace:any
  constructor(private ticketService:TicketService, private router:Router)
  {
  }
  payBus(bus:any)
  {
    console.log(bus)
    console.log("paid")
    const id = JSON.parse(localStorage.getItem('userDet')!);
    const jsonID = { id: id.id };

    const ticket = {
      paymentStatus: "paid",
      source: this.selectedBoardingPlace,
      destination: this.selectedDropOffPlace,
      dateOfJourney: bus.dateOfJourney,
      boardingTime: bus.timeOfBoarding,
      passenger: jsonID,
      bus: { id: bus.id }
    }

    console.log(ticket)
    this.ticketService.bookTicket(ticket);
    this.router.navigateByUrl("/my-ticket")
  }
}
