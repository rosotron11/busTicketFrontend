import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { BusService } from '../../../services/bus.service';
import { SearchResponse } from '../../../interfaces/response/SearchResponse';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit{
  search:Observable<SearchResponse[]>=new Observable<SearchResponse[]>
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
      this.router.navigateByUrl(`search/${source}/${destination}/${doj}`)
    }
    else
    {
      window.alert("error")
    }
  }
}
