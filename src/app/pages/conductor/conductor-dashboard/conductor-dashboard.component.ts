import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { FormsModule } from '@angular/forms';
import { AllTimeStats } from '../../../interfaces/response/AllTimeStats';
import { DailyBusStats } from '../../../interfaces/response/DailyBusStats';
import { DailyTicketStats } from '../../../interfaces/response/DailyTicketStats';
import Chart from 'chart.js/auto';

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
  totalStats!:AllTimeStats;
  dateForTickets:any
  dateForBus:any
  dailyBusStats!:DailyBusStats
  dailyTicketStats!:DailyTicketStats
  dailyTicketStatsPanel:boolean=false
  dailyBusStatsPanel:boolean=false
  overallChart!: Chart;
  dailyTicketChart!: Chart;
  dailyBusChart!: Chart;
  constructor(private dashboardService:DashboardService)
  {

  }
  ngOnInit(): void {
    this.dashboardService.getTotalStatsByConductorId(this.id).subscribe(
      (res:AllTimeStats)=>{
        console.log(res)
        this.totalStats=res
        this.initOverallChart();
      }
    )
  }
  initOverallChart()
  {
    if(!this.totalStats) return
    const ctx=document.getElementById('overallChart') as HTMLCanvasElement;
    if(this.overallChart)
    {
      this.overallChart.destroy()
    }
    this.overallChart=new Chart(ctx,
      {
        type:"bar",
        data:{
          labels: ['Tickets','Buses','Vendors','Passengers'],
          datasets:[{
            label:'Total Numbers',
            data:[this.totalStats.totalBus,this.totalStats.totalTicket,this.totalStats.totalVendor,this.totalStats.totalPassenger],
            backgroundColor: [
              'rgba(54, 162, 235, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(237, 255, 102, 0.5)'
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(227, 250, 51, 0.5)'
            ],
            borderWidth: 1
          }]
        },
        options:{
          responsive:true,
          maintainAspectRatio:false,
          scales:{
            y:{
              beginAtZero:true
            }
          }
        }
      }
    )
  }

  getDailyTicketStats() {
    if(this.dateForTickets!=null)
    {
      this.dashboardService.getDailyTicketStatsByConductorId(this.id,this.dateForTickets).subscribe(
        (res:DailyTicketStats)=>{
          console.log(res);
          this.dailyTicketStats=res
          this.updateDailyTicketChart();
        }
      )
      this.dailyTicketStatsPanel=true
    }
  }
  updateDailyTicketChart() {
    if(!this.dailyTicketStats) return;
    const ctx=document.getElementById("ticketsChart") as HTMLCanvasElement
    if(this.dailyTicketChart)
    {
      this.dailyTicketChart.destroy();
    }
    this.dailyTicketChart=new Chart(ctx,
      {
        type:"pie",
        data:
        {
          labels:["Paid Tickets","Unpaid Tickets"],
          datasets:[{
            data:[this.dailyTicketStats.paidTicket,this.dailyTicketStats.bookedTicket],
            backgroundColor: [
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 99, 132, 0.5)'
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
          }]
        },
        options:{
          responsive:true,
          maintainAspectRatio:false,
          plugins:{
            title:{
              display:true,
              text:'Daily Ticket Stats Distribution'
            }
          }
        }
      }
    )
  }
  getDailyBusStats() {
    if(this.dateForBus!=null)
    {
      this.dashboardService.getDailyBusStatsByConductorId(this.id,this.dateForBus).subscribe(
        (res:DailyBusStats)=>{
          console.log(res)
          this.dailyBusStats=res
          this.updateDailyBusChart();
        }
      )
      this.dailyBusStatsPanel=true
    } 
  }
  updateDailyBusChart() {
    if(!this.dailyBusStats) return;
    const ctx=document.getElementById("busChart") as HTMLCanvasElement
    if(this.dailyBusChart)
    {
      this.dailyBusChart.destroy()
    }
    this.dailyBusChart=new Chart(ctx,
      {
        type:"bar",
        data:{
          labels: ['Total Buses', 'Total Passengers', 'Avg. Passengers Per Bus'],
          datasets: [{
            label: 'Bus Statistics',
            data: [this.dailyBusStats.totalBus, this.dailyBusStats.totalPassengers, this.dailyBusStats.avPassengerPerBus],
            backgroundColor: [
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            title: {
              display: true,
              text: `Daily Bus Statistics`
            }
          }
        }
      }
    )
  }

}
