import { Component, Input } from '@angular/core';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-booking',
  imports: [],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  @Input() activeBus:any
  constructor(private ticketService:TicketService)
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
      source: bus.source,
      destination: bus.destination,
      dateOfJourney: bus.dateOfJourney,
      boardingTime: bus.timeOfBoarding,
      passenger: jsonID,
      bus: { id: bus.id }
    }

    console.log(ticket)
    this.ticketService.bookTicket(ticket);
  }
}
