import { Component, Input, output } from '@angular/core';
import { TicketService } from '../../../services/ticket.service';
import { IUser } from '../../../interfaces/user';
import { ITicket } from '../../../interfaces/ticket';

@Component({
  selector: 'app-show-ticket',
  imports: [],
  templateUrl: './show-ticket.component.html',
  styleUrl: './show-ticket.component.css'
})
export class ShowTicketComponent {
  @Input() user!: IUser;
  closeChild=output<void>();
  tickets:ITicket[]=[]
  constructor(private ticketService:TicketService)
  {

  }
  ngOnInit(): void {
    this.ticketService.getTicketbyUserId(this.user.id).subscribe((res:any)=>{
      this.tickets=res
    })
  }
  sendCloseSignal()
  {
    this.closeChild.emit()
  }
  deleteTicket(ticket:ITicket) {
    this.ticketService.deleteTicket(ticket.id);
  }
}
