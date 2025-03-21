import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllTimeStats } from '../interfaces/response/AllTimeStats';
import { DailyTicketStats } from '../interfaces/response/DailyTicketStats';
import { DailyBusStats } from '../interfaces/response/DailyBusStats';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  backendURL:string="http://localhost:8080/dashboard"

  constructor(private http:HttpClient) { }

  getTotalStats()
  {
    return this.http.get<AllTimeStats>(`${this.backendURL}/total-stats`)
  }

  getDailyTicketStats(date:Date)
  {
    return this.http.get<DailyTicketStats>(`${this.backendURL}/daily-ticket-stats/${date}`)
  }

  getDailyBusStats(date:Date)
  {
    return this.http.get<DailyBusStats>(`${this.backendURL}/daily-bus-stats/${date}`)
  }
  getTotalStatsByConductorId(id:number)
  {
    return this.http.get<AllTimeStats>(`${this.backendURL}/${id}/total-stats`)
  }

  getDailyTicketStatsByConductorId(id:number,date:Date)
  {
    return this.http.get<DailyTicketStats>(`${this.backendURL}/${id}/daily-ticket-stats/${date}`)
  }

  getDailyBusStatsByConductorId(id:number,date:Date)
  {
    return this.http.get<DailyBusStats>(`${this.backendURL}/${id}/daily-bus-stats/${date}`)
  }
}
