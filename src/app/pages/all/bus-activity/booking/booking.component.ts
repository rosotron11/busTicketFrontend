import { Component, inject, Input, NgModule, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TicketService } from '../../../../services/ticket.service';
import { FormArray, FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { BusService } from '../../../../services/bus.service';
import { IBus } from '../../../../interfaces/bus';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-booking',
  imports: [ReactiveFormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements  OnInit{
closeUpdatePanel() {
throw new Error('Method not implemented.');
}
  @Input() activeBus!:IBus
  id = JSON.parse(localStorage.getItem('userDet')!);
  jsonID = { id: this.id.id };
  selectedSeats:number[]=[]
  amount:number=0
  seatArray: number[][] = [];
  bookedSeats:number[]=[]
  paymentGateway:string='';
  constructor(private ticketService:TicketService, private router:Router, private busService:BusService,
    private toastr:ToastrService
  )
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
    this.busService.getBookedSeatsFromBusId(this.activeBus.id).subscribe((res:number[])=>{
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

  addPassenger(num:number)
  {
    this.passengers.push(new FormGroup({
      name:new FormControl('',[Validators.required]),
      seatNo:new FormControl(num,[Validators.required])
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

  getBoardingTime(boardingPlaces:Array<{ [key: string]: string }>,place:string)
  {
    const detail = boardingPlaces.find((detail: { [key: string]: string }) => detail['boardingPlace'] === place);
    return detail!['boardingTime'];
  }
  getDroppingTime(droppingPlaces:Array<{ [key: string]: string }>, place:string)
  {
    const detail = droppingPlaces.find((detail: { [key: string]: string }) => detail['droppingPlace'] === place);
    return detail!['droppingTime'];
  }

  selectSeat(num:number)
  {
    if(this.bookedSeats.includes(num))
    {
      this.toastr.error("Seat Booked selected","Error")
    }
    else{
      const selectedIndex = this.selectedSeats.indexOf(num);
  
      if (selectedIndex > -1) {
        this.selectedSeats.splice(selectedIndex, 1);
        this.removePassengerFromSeat(num);
      } else {
        this.selectedSeats.push(num);
        this.addPassenger(num);
      }
    
      this.amount = this.selectedSeats.length * this.activeBus.price;
    }
  }
  removePassengerFromSeat(num: number) {
    const index = this.passengers.controls.findIndex(control => control.get('seatNo')?.value === num);
    if(this.passengers.length>0)
    {
        this.selectedSeats=this.selectedSeats.filter(item => item !== num)
        this.passengers.removeAt(index);
        this.amount=this.selectedSeats.length*this.activeBus.price
    };
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
      setTimeout(() => {
        this.router.navigateByUrl("/my-ticket");
      }, 100);
    }
    else
    {
      this.toastr.error("Error in Booking","Error")
    }
  }
}
