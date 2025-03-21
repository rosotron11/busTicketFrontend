import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tick } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http:HttpClient) { }

  backend= "http://localhost:8080/tickets"
  
    getTicketbyUserId(id:number)
    {
      return this.http.get<any[]>(`${this.backend}/user/${id}`);
    }

    deleteTicket(id:number)
    {
      return this.http.delete(`${this.backend}/${id}`,{responseType:'text'})
      .subscribe((res:any)=>
      {
        console.log(res)
      })
    }
    bookTicket(ticket:any)
    {
      return this.http.post(this.backend,ticket,{responseType:"text"}).subscribe(
        (res:any)=>{
          console.log(res)
        }
      )
    }
    completePayment(id:number)
    {
      return this.http.put(`${this.backend}/pay`,id,{responseType:'text'})
    }
}
