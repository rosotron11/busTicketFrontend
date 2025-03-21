import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BusService } from '../../../services/bus.service';
@Component({
  selector: 'app-bus-registration',
  imports: [ReactiveFormsModule],
  templateUrl: './bus-registration.component.html',
  styleUrl: './bus-registration.component.css'
})
export class BusRegistrationComponent implements OnInit{

    constructor(private busService:BusService, private router:Router)
    {
      
    }    
    ngOnInit(): void {
      this.addBoardingPlace();
      this.addDropOffPlace();
    }
      busRegistration:FormGroup = new FormGroup({
      busNumber: new FormControl('',[Validators.required]),
      vendorName: new FormControl('',[Validators.required]),
      source: new FormControl('',[Validators.required]),
      destination: new FormControl('',[Validators.required]),
      timeOfBoarding: new FormControl('',[Validators.required]),
      timeOfDropping: new FormControl('',[Validators.required]),
      dateOfJourney: new FormControl('',[Validators.required]),
      totalSeats: new FormControl('',[Validators.required]),
      boardingPlaces: new FormArray([]),
      dropOffPlaces: new FormArray([]),
      price:new FormControl('',[Validators.required]),
      conductor: new FormControl('',[Validators.required])
    })

    get boardingPlaces() {
      return this.busRegistration.get('boardingPlaces') as FormArray;
    }
  
    get dropOffPlaces() {
      return this.busRegistration.get('dropOffPlaces') as FormArray;
    }
  
    addBoardingPlace() {
      this.boardingPlaces.push(new FormGroup({
        boardingPlace:new FormControl('',[Validators.required]),
        boardingTime:new FormControl('',[Validators.required,this.boardingTimeValidator.bind(this)])
      }));
    }
  
    removeBoardingPlace(index: number) {
      if (this.boardingPlaces.length > 1) {
        this.boardingPlaces.removeAt(index);
      }
    }
  
    addDropOffPlace() {
      this.dropOffPlaces.push(new FormGroup({
        droppingPlace:new FormControl('',[Validators.required]),
        droppingTime:new FormControl('',[Validators.required, this.droppingTimeValidator.bind(this)])
      }));
    }
  
    removeDropOffPlace(index: number) {
      if (this.dropOffPlaces.length > 1) {
        this.dropOffPlaces.removeAt(index);
      }
    }

    boardingTimeValidator(control: AbstractControl): { [key: string]: boolean } | null {
      const timeOfBoarding = new Date(`1970-01-01T${this.busRegistration.controls['timeOfBoarding'].value}:00`);
      const timeOfDropping = new Date(`1970-01-01T${this.busRegistration.controls['timeOfDropping'].value}:00`);
      const boardingTime = new Date(`1970-01-01T${control.value}:00`);
    
      if (boardingTime < timeOfBoarding || boardingTime > timeOfDropping || (boardingTime.getTime() - timeOfBoarding.getTime()) > 2 * 60 * 60 * 1000) {
        return { invalidBoardingTime: true };
      }
      return null;
    }
    
    droppingTimeValidator(control: AbstractControl): { [key: string]: boolean } | null {
      const timeOfBoarding = new Date(`1970-01-01T${this.busRegistration.controls['timeOfBoarding'].value}:00`);
      const timeOfDropping = new Date(`1970-01-01T${this.busRegistration.controls['timeOfDropping'].value}:00`);
      const droppingTime = new Date(`1970-01-01T${control.value}:00`);
    
      if (droppingTime > timeOfDropping || droppingTime < timeOfBoarding || (timeOfDropping.getTime() - droppingTime.getTime()) > 2 * 60 * 60 * 1000) {
        return { invalidDroppingTime: true };
      }
      return null;
    }

    submitForm()
    {
      const id=JSON.parse(localStorage.getItem('userDet')!)
      const jsonID=JSON.parse(`{"id":${id.id}}`)
      console.log(this.busRegistration.value)
      this.busRegistration.controls['conductor'].setValue(jsonID)
      if(this.busRegistration.valid){
        console.log(this.busRegistration.value)
        this.busService.addBus(this.busRegistration)
        setTimeout(() => {
          this.router.navigateByUrl("/my-bus");
        }, 100);
      }
      else
      {
        console.log("error")
      }
    }
}
