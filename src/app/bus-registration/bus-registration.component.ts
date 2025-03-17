import { Component } from '@angular/core';
import { BusService } from '../services/bus.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bus-registration',
  imports: [ReactiveFormsModule],
  templateUrl: './bus-registration.component.html',
  styleUrl: './bus-registration.component.css'
})
export class BusRegistrationComponent {

    constructor(private busService:BusService, private router:Router)
    {
      
    }

    busRegistration:FormGroup = new FormGroup({
      busNumber: new FormControl('',[Validators.required]),
      source: new FormControl('',[Validators.required]),
      destination: new FormControl('',[Validators.required]),
      timeOfBoarding: new FormControl('',[Validators.required]),
      timeOfDropping: new FormControl('',[Validators.required]),
      dateOfJourney: new FormControl('',[Validators.required]),
      seats: new FormControl('',[Validators.required]),
      conductor: new FormControl('',[Validators.required])
    })

    submitForm()
    {
      const id=JSON.parse(localStorage.getItem('userDet')!)
      const jsonID=JSON.parse(`{"id":${id.id}}`)
      console.log(this.busRegistration.value)
      this.busRegistration.controls['conductor'].setValue(jsonID)
      if(this.busRegistration.valid){
        console.log(this.busRegistration.value)
        this.busService.addBus(this.busRegistration.value)
        this.router.navigateByUrl("")
      }
      else
      {
        console.log("error")
      }
    }
}
