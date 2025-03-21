import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusService } from '../../../services/bus.service';
import { BusPassengersComponent } from '../bus-passengers/bus-passengers.component';
import { IBus } from '../../../interfaces/bus';

@Component({
  selector: 'app-my-bus',
  imports: [BusPassengersComponent],
  templateUrl: './my-bus.component.html',
  styleUrl: './my-bus.component.css'
})
export class MyBusComponent implements OnInit{
  buses:IBus[]=[]
  selectedBus!:IBus
  activatedTicket:boolean=false
  constructor(private busService:BusService, private router:Router)
  {

  }
  ngOnInit(): void {
      const userDet=JSON.parse(localStorage.getItem('userDet')!)
      this.busService.getBusByUserId(userDet.id).subscribe((res:IBus[])=>{
        console.log(res)
        this.buses=res
      })
  }
  deleteBus(bus:IBus)
  {
    this.busService.deleteBus(bus.id)
    this.buses=this.buses.filter(item=>item.id!=bus.id)
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
