import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { BusService } from '../../../services/bus.service';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  search:Observable<any[]>=new Observable<any[]>
  constructor(private router: Router, private busService:BusService)
  {
  }
  ngOnInit(): void {
    this.search=this.busService.getLocation();
  }
  searchForm:FormGroup = new FormGroup({
    source:new FormControl('',[Validators.required]),
    destination: new FormControl('',[Validators.required]),
    dateOfJourney: new FormControl('',[Validators.required])
  })

  submitForm()
  {
    if(this.searchForm.valid)
    {
      console.log(this.searchForm.value)
      const source=this.searchForm.value.source
      const destination=this.searchForm.value.destination
      const doj=this.searchForm.value.dateOfJourney
      this.router.navigateByUrl(`bus/${source}/${destination}/${doj}`)
    }
    else
    {
      window.alert("error")
    }
  }
}
