import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { FormsModule } from '@angular/forms';
import { AllTimeStats } from '../../../interfaces/response/AllTimeStats';
import { DailyBusStats } from '../../../interfaces/response/DailyBusStats';
import { DailyTicketStats } from '../../../interfaces/response/DailyTicketStats';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  totalStats!: AllTimeStats;
  dateForTickets:any
  dateForBus:any
  dailyBusStats:DailyBusStats | undefined
  dailyTicketStats:DailyTicketStats | undefined
  dailyTicketStatsPanel:boolean=false
  dailyBusStatsPanel:boolean=false
  weekStartDateforTicket:any
  weekStartEndforTicket:any
  constructor(private dashboardService:DashboardService)
  {

  }
  ngOnInit(): void {
    this.dashboardService.getTotalStats().subscribe(
      (res:any)=>{
        this.totalStats=res
      }
    )
  }
  getDailyTicketStats() {
    if(this.dateForTickets!=null)
    {
      this.dashboardService.getDailyTicketStats(this.dateForTickets).subscribe(
        (res:any)=>{
          console.log(res);
          this.dailyTicketStats=res
        }
      )
      this.dailyTicketStatsPanel=true
    }
  }
  getDailyBusStats() {
    if(this.dateForBus!=null)
    {
      this.dashboardService.getDailyBusStats(this.dateForBus).subscribe(
        (res:any)=>{
          console.log(res)
          this.dailyBusStats=res
        }
      )
      this.dailyBusStatsPanel=true
    } 
  }

}
