import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusService } from '../../../services/bus.service';
import { BusPassengersComponent } from '../bus-passengers/bus-passengers.component';

@Component({
  selector: 'app-my-bus',
  imports: [BusPassengersComponent],
  templateUrl: './my-bus.component.html',
  styleUrl: './my-bus.component.css'
})
export class MyBusComponent implements OnInit{
  buses:any[]=[]
  selectedBus:any
  activatedTicket:boolean=false
  constructor(private busService:BusService, private router:Router)
  {

  }
  ngOnInit(): void {
      const userDet=JSON.parse(localStorage.getItem('userDet')!)
      this.busService.getBusByUserId(userDet.id).subscribe((res:any)=>{
        console.log(res)
        this.buses=res
      })
  }
  deleteBus(bus:any)
  {
    this.busService.deleteBus(bus.id)
  }
  seePassengers(bus: any)
  {
    this.activatedTicket=true
    this.selectedBus=bus
  }
  closePanel()
  {
    this.activatedTicket=false
  }

}
