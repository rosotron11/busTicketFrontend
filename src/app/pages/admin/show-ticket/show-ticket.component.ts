import { Component, Input, output } from '@angular/core';
import { TicketService } from '../../../services/ticket.service';
import { IUser } from '../../../interfaces/user';
import { ITicket } from '../../../interfaces/ticket';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-show-ticket',
  imports: [NgClass],
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
    this.ticketService.getTicketbyUserId(this.user.id).subscribe((res:ITicket[])=>{
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
