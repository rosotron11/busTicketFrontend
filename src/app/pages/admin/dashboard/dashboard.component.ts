import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { FormsModule } from '@angular/forms';
import { AllTimeStats } from '../../../interfaces/response/AllTimeStats';
import { DailyBusStats } from '../../../interfaces/response/DailyBusStats';
import { DailyTicketStats } from '../../../interfaces/response/DailyTicketStats';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, AfterViewInit {

  totalStats!: AllTimeStats;
  dateForTickets!: Date;
  dateForBus!: Date;
  dailyBusStats!: DailyBusStats;
  dailyTicketStats!: DailyTicketStats;
  dailyTicketStatsPanel: boolean = false;
  dailyBusStatsPanel: boolean = false;
  
  overallChart: any;
  ticketsChart: any;
  busChart: any;

  constructor(private dashboardService: DashboardService) {
    this.dateForTickets = new Date();
    this.dateForBus = new Date();
  }

  ngOnInit(): void {
    this.dashboardService.getTotalStats().subscribe(
      (res: AllTimeStats) => {
        this.totalStats = res;
        this.initOverallChart();
      }
    );
  }
  
  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   this.initOverallChart();
    // }, 500);
  }

  initOverallChart(): void {
    if (!this.totalStats) return;
    
    const ctx = document.getElementById('overallChart') as HTMLCanvasElement;
    if (!ctx) return;
    
    if (this.overallChart) {
      this.overallChart.destroy();
    }
    
    this.overallChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Tickets', 'Buses', 'Vendors'],
        datasets: [{
          label: 'Total Numbers',
          data: [this.totalStats.totalTicket, this.totalStats.totalBus, this.totalStats.totalVendor],
          backgroundColor: [
            'rgba(54, 162, 235, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
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
        }
      }
    });
  }

  updateTicketsChart(): void {
    const ctx = document.getElementById('ticketsChart') as HTMLCanvasElement;
    if (!ctx) return;
    
    let stats=this.dailyTicketStats
    
    if (this.ticketsChart) {
      this.ticketsChart.destroy();
    }
    
    this.ticketsChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Paid Tickets', 'Unpaid Tickets'],
        datasets: [{
          data: [stats.paidTicket, stats.bookedTicket],
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
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `Daily Ticket Status Distribution`
          }
        }
      }
    });
  }

  updateBusChart(): void {
    const ctx = document.getElementById('busChart') as HTMLCanvasElement;
    if (!ctx) return;
    
    let stats=this.dailyBusStats;
    
    if (this.busChart) {
      this.busChart.destroy();
    }
    
    this.busChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Total Buses', 'Total Passengers', 'Avg. Passengers Per Bus'],
        datasets: [{
          label: 'Bus Statistics',
          data: [stats.totalBus, stats.totalPassengers, stats.avPassengerPerBus],
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
    });
  }

  getDailyTicketStats() {
    if (this.dateForTickets != null) {
      this.dashboardService.getDailyTicketStats(this.dateForTickets).subscribe(
        (res: DailyTicketStats) => {
          console.log(res);
          this.dailyTicketStats = res;
          this.updateTicketsChart();
        }
      );
    }
  }

  getDailyBusStats() {
    if (this.dateForBus != null) {
      this.dashboardService.getDailyBusStats(this.dateForBus).subscribe(
        (res: DailyBusStats) => {
          console.log(res);
          this.dailyBusStats = res;
          this.updateBusChart();
        }
      );
    }
  }
}