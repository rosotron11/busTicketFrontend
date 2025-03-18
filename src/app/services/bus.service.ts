import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  backend= "http://localhost:8080/bus"
  constructor(private http:HttpClient) { }

  getBus()
  {
    const somethiing= this.http.get<any[]>(this.backend);
    return somethiing;
  }

  deleteBus(id:any)
  {
    console.log(id)
    this.http.delete(`${this.backend}/${id}`,{responseType:'text'})
    .subscribe(data=>{
      console.log(data)
    })
  }

  addBus(form:any)
  {
    this.http.post(this.backend,form,{responseType:'text'}).subscribe(
      (res:any)=>{
        if(res=='Drop before Board')
        window.alert("Dropping Time is Before Boarding Time")
      }
    )
  }

  searchBus(source:string,destination:string,doj:Date)
  {
    return this.http.get<any[]>(`${this.backend}/${source}/${destination}/${doj}`)
  }

  getLocation()
  {
    return this.http.get<any[]>(`${this.backend}/location`)
  }

  getBusByUserId(id:number)
  {
    return this.http.get<any[]>(`${this.backend}/user/${id}`)
  }

  getTicketsFromBus(id: number) {
    return this.http.get<any[]>(`${this.backend}/${id}/tickets`);
  }
}
