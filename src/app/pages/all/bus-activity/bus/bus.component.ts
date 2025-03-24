import { Component, Input, OnInit } from '@angular/core';
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
  @Input() buses:IBus[]=[]
  activeBus!:IBus
  ngOnInit():void{
    console.log(this.buses)
    }

 getTimeDifference = (timeOfBoarding: string, timeOfDropping: string) => `${Math.floor((new Date(`1970-01-01T${timeOfDropping}Z`).getTime() - new Date(`1970-01-01T${timeOfBoarding}Z`).getTime()) / 60000 / 60).toString().padStart(2, '0')}hr ${((new Date(`1970-01-01T${timeOfDropping}Z`).getTime() - new Date(`1970-01-01T${timeOfBoarding}Z`).getTime()) / 60000 % 60).toString().padStart(2, '0')}min`;


  bookBus(bus:any)
  {
    this.activeBooking=true;
    this.activeBus=bus;
  }

}
