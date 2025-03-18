import { Component, OnInit } from '@angular/core';
import { BusService } from '../services/bus.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingComponent } from "../booking/booking.component";

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
  buses:any[]=[]
  activeBus:any=null
  ngOnInit():void{
    const myUrl=this.router.url;
    let source:any, destination:any, doj:any
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
