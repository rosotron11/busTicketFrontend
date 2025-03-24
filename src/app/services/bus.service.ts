import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBus } from '../interfaces/bus';
import { FormGroup } from '@angular/forms';
import { SearchResponse } from '../interfaces/response/SearchResponse';
import { ITicket } from '../interfaces/ticket';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  backend= "http://localhost:8080/bus"
  constructor(private http:HttpClient, private toaster:ToastrService) { }

  getBus()
  {
    const somethiing= this.http.get<IBus[]>(this.backend);
    return somethiing;
  }

  deleteBus(id:number)
  {
    console.log(id)
    this.http.delete(`${this.backend}/${id}`,{responseType:'text'})
    .subscribe(data=>{
      console.log(data)
    })
  }

  addBus(form:FormGroup)
  {
    this.http.post(this.backend,form.value,{responseType:'text'})
    .pipe(catchError((error:HttpErrorResponse)=>{
      return throwError(()=>error)
    }))
    .subscribe(
      (res:any)=>{
        if(res=='Drop before Board'){
          this.toaster.error('Dropping Time is Before Boarding Time','Error')
        }
        else if(res=='Created')
        {
          this.toaster.success('Bus Created Successfully','Success')
        }
      }
    )
  }

  searchBus(source:string,destination:string,doj:Date)
  {
    return this.http.get<IBus[]>(`${this.backend}/${source}/${destination}/${doj}`)
  }

  getLocation()
  {
    return this.http.get<SearchResponse[]>(`${this.backend}/location`)
  }

  getBusByUserId(id:number)
  {
    return this.http.get<IBus[]>(`${this.backend}/user/${id}`)
  }

  getTicketsFromBus(id: number) {
    return this.http.get<ITicket[]>(`${this.backend}/${id}/tickets`);
  }
  getBookedSeatsFromBusId(id:number)
  {
    return this.http.get<number[]>(`${this.backend}/${id}/seats`)
  }
}
