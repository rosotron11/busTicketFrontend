import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  backendURL:string="http://localhost:8080/dashboard"

  constructor(private http:HttpClient) { }

  getTotalStats()
  {
    return this.http.get<any[]>(`${this.backendURL}/total-stats`)
  }

  getDailyTicketStats(date:any)
  {
    return this.http.get<any[]>(`${this.backendURL}/daily-ticket-stats/${date}`)
  }

  getDailyBusStats(date:any)
  {
    return this.http.get<any[]>(`${this.backendURL}/daily-bus-stats/${date}`)
  }
  getTotalStatsByConductorId(id:number)
  {
    return this.http.get<any[]>(`${this.backendURL}/${id}/total-stats`)
  }

  getDailyTicketStatsByConductorId(id:number,date:any)
  {
    return this.http.get<any[]>(`${this.backendURL}/${id}/daily-ticket-stats/${date}`)
  }

  getDailyBusStatsByConductorId(id:number,date:any)
  {
    return this.http.get<any[]>(`${this.backendURL}/${id}/daily-bus-stats/${date}`)
  }
}
