import { Component, Input, NgModule, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TicketService } from '../services/ticket.service';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BusService } from '../services/bus.service';

@Component({
  selector: 'app-booking',
  imports: [ReactiveFormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnChanges, OnInit{
  @Input() activeBus:any
  id = JSON.parse(localStorage.getItem('userDet')!);
  jsonID = { id: this.id.id };
  selectedSeats:number[]=[]
  seatArray: number[][] = [];
  bookedSeats:number[]=[]
  constructor(private ticketService:TicketService, private router:Router, private busService:BusService)
  {
  }
  ngOnInit(): void {
    let seatNumber = 1;

    for (let i = 0; i < Math.ceil(this.activeBus.seats / 4); i++) {
        const row = [];
        for (let j = 0; j < 4; j++) {
          if (seatNumber <= this.activeBus.seats) {
            row.push(seatNumber);
            seatNumber++;
          }
        }
        this.seatArray.push(row);
    }
    this.busService.getBookedSeatsFromBusId(this.activeBus.id).subscribe((res:any)=>{
      this.bookedSeats=res
      console.log(this.bookedSeats)
    }
    )
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.bookingForm.controls['amount'].setValue(this.activeBus.price*this.selectedSeats.length);
  }
  bookingForm:FormGroup=new FormGroup({
    passengers:new FormArray([]),
    source:new FormControl('',[Validators.required]),
    destination:new FormControl('',[Validators.required]),
    bookingUser:new FormControl(this.jsonID),
    bus:new FormControl('',[Validators.required]),
    paymentStatus:new FormControl('',Validators.required),
    boardingTime:new FormControl('',[Validators.required]),
    droppingTime:new FormControl('',[Validators.required]),
    dateOfJourney:new FormControl('',[Validators.required]),
    amount:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email])
  })

  get passengers() {
    return this.bookingForm.get('passengers') as FormArray;
  }

  addPassenger()
  {
    this.passengers.push(new FormGroup({
      name:new FormControl('',[Validators.required]),
      seatNo:new FormControl('',[Validators.required])
    }))
  }
  removePassenger(index:number)
  {
    const seat=this.passengers.at(index).value.seatNo
    if(this.passengers.length>1)
    {
        this.selectedSeats=this.selectedSeats.filter(item => item !== seat)
        this.passengers.removeAt(index);
    }
  }

  getBoardingTime(boardingPlaces:any[],place:string)
  {
    const detail = boardingPlaces.find((detail: any) => detail.boardingPlace === place);
    return detail.boardingTime;
  }
  getDroppingTime(droppingPlaces:any[], place:string)
  {
    const detail = droppingPlaces.find((detail: any) => detail.droppingPlace === place);
    return detail.droppingTime;
  }

  selectSeat(num:number)
  {
    if(this.selectedSeats.includes(num))
    {
      window.alert("Seat Already selected")
    }
    else if(this.bookedSeats.includes(num))
    {
      window.alert("Seat Booked selected")
    }
    else{
      this.passengers.push(new FormGroup({
        name:new FormControl('',[Validators.required]),
        seatNo:new FormControl(num,[Validators.required])
      }))
      this.selectedSeats.push(num)
    }
  }
  payBus(bus:any)
  {
    this.bookingForm.controls['bus'].setValue(JSON.parse(`{"id":${bus.id}}`))
    this.bookingForm.controls['boardingTime'].setValue(this.getBoardingTime(
      this.activeBus.boardingPlaces,
      this.bookingForm.controls['source'].value
    ))
    this.bookingForm.controls['droppingTime'].setValue(this.getDroppingTime(
      this.activeBus.dropOffPlaces,
      this.bookingForm.controls['destination'].value
    ))
    this.getBoardingTime(this.activeBus.boardingPlaces,'Balkot')
    this.bookingForm.controls['dateOfJourney'].setValue(bus.dateOfJourney)
    this.bookingForm.controls['dateOfJourney'].setValue(bus.dateOfJourney)
    this.bookingForm.controls['amount'].setValue(this.passengers.length*bus.price)
    console.log(this.bookingForm.value)
    if(this.bookingForm.valid)
    { 
      this.ticketService.bookTicket(this.bookingForm.value);
      this.router.navigateByUrl("/my-ticket")
    }
    else
    {
      console.log("erorr in booking")
    }
  }
}
