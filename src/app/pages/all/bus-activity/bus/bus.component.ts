import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingComponent } from '../booking/booking.component';
import { BusService } from '../../../../services/bus.service';
import { IBus } from '../../../../interfaces/bus';

@Component({
  selector: 'app-bus',
  imports: [ReactiveFormsModule, BookingComponent],
  templateUrl: './bus.component.html',
  styleUrl: './bus.component.css',
  providers:[BusService]
})
export class BusComponent implements OnInit{
  activeBooking: boolean = false;
  constructor(private busService:BusService, private router:Router, private activatedRoute:ActivatedRoute)
  {

  }
  buses:IBus[]=[]
  activeBus!:IBus
  ngOnInit():void{
    const myUrl=this.router.url;
    let source!:string, destination!:string, doj!:Date
    if(myUrl=="/bus")
    {
      this.router.navigateByUrl('/home');
    }
    else
    {
      this.activatedRoute.params.subscribe(p=>{
        source=p['source']
        destination=p['destination']
        doj=p['doj']
      })
      this.searchData(source,destination, doj);
    }
    }

  searchData(source:string, destination:string, doj:Date)
  {
    this.busService.searchBus(source,destination,doj).subscribe(data=>{
      console.log(data)
      this.buses=data;
    })
  }
 getTimeDifference = (timeOfBoarding: string, timeOfDropping: string) => `${Math.floor((new Date(`1970-01-01T${timeOfDropping}Z`).getTime() - new Date(`1970-01-01T${timeOfBoarding}Z`).getTime()) / 60000 / 60).toString().padStart(2, '0')}hr ${((new Date(`1970-01-01T${timeOfDropping}Z`).getTime() - new Date(`1970-01-01T${timeOfBoarding}Z`).getTime()) / 60000 % 60).toString().padStart(2, '0')}min`;

  fetchData()
  {
    this.busService.getBus().subscribe(data=>
      {
        console.log(data)
        this.buses=data
      }
    )
  }


  bookBus(bus:any)
  {
    this.activeBooking=true;
    this.activeBus=bus;
  }

}
