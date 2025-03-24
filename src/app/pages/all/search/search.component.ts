import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { BusService } from '../../../services/bus.service';
import { SearchResponse } from '../../../interfaces/response/SearchResponse';
import { BusComponent } from "../bus-activity/bus/bus.component";
import { IBus } from '../../../interfaces/bus';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, AsyncPipe, BusComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  buses: IBus[] = [];
  search: Observable<SearchResponse[]> = new Observable<SearchResponse[]>();
  
  searchForm: FormGroup = new FormGroup({
    source: new FormControl('', [Validators.required]),
    destination: new FormControl('', [Validators.required]),
    dateOfJourney: new FormControl('', [Validators.required])
  });

  constructor(
    private router: Router, 
    private busService: BusService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.search = this.busService.getLocation();
    
    this.activatedRoute.params.subscribe(params => {
      if (params['source'] && params['destination'] && params['doj']) {
        const source = params['source'];
        const destination = params['destination'];
        const doj = params['doj'];
        
        this.searchForm.patchValue({
          source: source,
          destination: destination,
          dateOfJourney: doj
        });
        
        this.searchData(source, destination, doj);
      }
    });
  }

  searchData(source: string, destination: string, doj: Date) {
    this.busService.searchBus(source, destination, doj).subscribe(data => {
      console.log(data);
      this.buses = data;
    });
  }

  submitForm() {
    if (this.searchForm.valid) {
      const source = this.searchForm.value.source;
      const destination = this.searchForm.value.destination;
      const doj = this.searchForm.value.dateOfJourney;
      
      this.router.navigateByUrl(`/search/${source}/${destination}/${doj}`);
      
    } else {
      window.alert("Please fill all required fields");
    }
  }
}