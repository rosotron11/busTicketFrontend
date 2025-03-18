import { Component, Input, OnInit, output} from '@angular/core';
import { BusService } from '../services/bus.service';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-bus-passengers',
  imports: [],
  templateUrl: './bus-passengers.component.html',
  styleUrl: './bus-passengers.component.css'
})
export class BusPassengersComponent implements OnInit{

  @Input() bus:any
  closeChild=output<void>();
  tickets:any[]=[]
  constructor(private busService:BusService, private ticketService:TicketService)
  {

  }
  ngOnInit(): void {
    this.busService.getTicketsFromBus(this.bus.id).subscribe((res:any)=>{
      console.log(res)
      this.tickets=res
    })
  }
  sendCloseSignal()
  {
    this.closeChild.emit()
  }
  deleteTicket(ticket:any) {
    this.ticketService.deleteTicket(ticket.id);
  }
}
