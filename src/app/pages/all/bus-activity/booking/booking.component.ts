import { Component, Input, NgModule, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TicketService } from '../../../../services/ticket.service';
import { FormArray, FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { BusService } from '../../../../services/bus.service';
import { IBus } from '../../../../interfaces/bus';

@Component({
  selector: 'app-booking',
  imports: [ReactiveFormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements  OnInit{
  @Input() activeBus!:IBus
  id = JSON.parse(localStorage.getItem('userDet')!);
  jsonID = { id: this.id.id };
  selectedSeats:number[]=[]
  amount:number=1
  seatArray: number[][] = [];
  bookedSeats:number[]=[]
  paymentGateway:string='';
  constructor(private ticketService:TicketService, private router:Router, private busService:BusService)
  {
  }
  ngOnInit(): void {
    let seatNumber = 1;

    for (let i = 0; i < Math.ceil(this.activeBus.totalSeats / 4); i++) {
        const row = [];
        for (let j = 0; j < 4; j++) {
          if (seatNumber <= this.activeBus.totalSeats) {
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
        this.amount=this.selectedSeats.length*this.activeBus.price
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
      this.amount=this.selectedSeats.length*this.activeBus.price
    }
  }
  payBus(bus:IBus)
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
    this.bookingForm.controls['dateOfJourney'].setValue(bus.dateOfJourney)
    this.bookingForm.controls['dateOfJourney'].setValue(bus.dateOfJourney)
    this.bookingForm.controls['paymentStatus'].setValue("Unpaid")
    this.bookingForm.controls['amount'].setValue(this.amount)
    
    if(this.bookingForm.valid)
    { 
      this.ticketService.bookTicket(this.bookingForm.value);
      console.log(this.bookingForm.value)
      this.router.navigateByUrl("/my-ticket")
    }
    else
    {
      console.log("erorr in booking")
    }
  }
}
