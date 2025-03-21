import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-conductor-dashboard',
  imports: [FormsModule],
  templateUrl: './conductor-dashboard.component.html',
  styleUrl: './conductor-dashboard.component.css'
})
export class ConductorDashboardComponent implements OnInit{
  loggedData=localStorage.getItem('userDet');
  userData=JSON.parse(this.loggedData!)
  id=this.userData.id;
  totalStats:any;
  dateForTickets:any
  dateForBus:any
  dailyBusStats:any
  dailyTicketStats:any
  dailyTicketStatsPanel:boolean=false
  dailyBusStatsPanel:boolean=false
  constructor(private dashboardService:DashboardService)
  {

  }
  ngOnInit(): void {
    this.dashboardService.getTotalStatsByConductorId(this.id).subscribe(
      (res:any)=>{
        console.log(res)
        this.totalStats=res
      }
    )
  }
  getDailyTicketStats() {
    if(this.dateForTickets!=null)
    {
      this.dashboardService.getDailyTicketStatsByConductorId(this.id,this.dateForTickets).subscribe(
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
      this.dashboardService.getDailyBusStatsByConductorId(this.id,this.dateForBus).subscribe(
        (res:any)=>{
          console.log(res)
          this.dailyBusStats=res
        }
      )
      this.dailyBusStatsPanel=true
    } 
  }

}
