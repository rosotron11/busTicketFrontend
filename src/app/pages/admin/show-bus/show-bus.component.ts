import { Component, Input, output } from '@angular/core';
import { BusService } from '../../../services/bus.service';
import { BusPassengersComponent } from "../../conductor/bus-passengers/bus-passengers.component";
import { IUser } from '../../../interfaces/user';
import { IBus } from '../../../interfaces/bus';

@Component({
  selector: 'app-show-bus',
  imports: [BusPassengersComponent],
  templateUrl: './show-bus.component.html',
  styleUrl: './show-bus.component.css'
})
export class ShowBusComponent {
  @Input() user!: IUser;
  closeChild=output<void>();
  buses:IBus[]=[]
  selectedBus!:IBus
  activatedTicket:boolean=false
  constructor(private busService:BusService)
  {

  }
  ngOnInit(): void {
    this.busService.getBusByUserId(this.user.id).subscribe((res:IBus[])=>{
      this.buses=res
    })
  }
  sendCloseSignal()
  {
    this.closeChild.emit()
  }
  deleteBus(bus:IBus) {
    this.busService.deleteBus(bus.id);
    this.buses = this.buses.filter(item => item.id != bus.id);
  }
  seePassengers(bus: IBus)
  {
    this.activatedTicket=true
    this.selectedBus=bus
  }
  closePanel()
  {
    this.activatedTicket=false
  }
  
}
