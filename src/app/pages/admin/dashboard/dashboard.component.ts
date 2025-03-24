import { Component, OnChanges, OnInit, SimpleChanges, AfterViewInit } from '@angular/core';
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

  // Existing properties
  totalStats!: AllTimeStats;
  dateForTickets!: Date;
  dateForBus!: Date;
  dailyBusStats!: DailyBusStats;
  dailyTicketStats!: DailyTicketStats;
  dailyTicketStatsPanel: boolean = false;
  dailyBusStatsPanel: boolean = false;
  weekStartDateforTicket: any;
  weekStartEndforTicket: any;
  
  // New properties for additional functionality
  ticketPeriod: string = 'daily';
  busPeriod: string = 'daily';
  weekForTickets: string = '';
  monthForTickets: string = '';
  weekForBus: string = '';
  monthForBus: string = '';
  weeklyTicketStats: any;
  monthlyTicketStats: any;
  weeklyBusStats: any;
  monthlyBusStats: any;
  weeklyTicketStatsPanel: boolean = false;
  monthlyTicketStatsPanel: boolean = false;
  weeklyBusStatsPanel: boolean = false;
  monthlyBusStatsPanel: boolean = false;
  weekStartDateforBus: any;
  weekStartEndforBus: any;
  
  // Chart references
  overallChart: any;
  ticketsChart: any;
  busChart: any;

  constructor(private dashboardService: DashboardService) {
    // Set default dates
    this.dateForTickets = new Date();
    this.dateForBus = new Date();
    
    // Set default month and week values
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    this.monthForTickets = `${year}-${month}`;
    this.monthForBus = `${year}-${month}`;
    
    // Set default week value (approximate)
    const weekNum = Math.ceil(today.getDate() / 7);
    const weekStr = weekNum.toString().padStart(2, '0');
    this.weekForTickets = `${year}-W${weekStr}`;
    this.weekForBus = `${year}-W${weekStr}`;
  }

  ngOnInit(): void {
    this.dashboardService.getTotalStats().subscribe(
      (res: AllTimeStats) => {
        this.totalStats = res;
        // Initialize charts after data is loaded
        this.initOverallChart();
      }
    );
  }
  
  ngAfterViewInit(): void {
    // Initialize charts when view is ready
    setTimeout(() => {
      this.initOverallChart();
    }, 500);
  }

  // Initialize the overall chart
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

  // Update tickets chart
  updateTicketsChart(): void {
    const ctx = document.getElementById('ticketsChart') as HTMLCanvasElement;
    if (!ctx) return;
    
    let stats;
    let period = this.ticketPeriod;
    
    if (period === 'daily' && this.dailyTicketStats) {
      stats = this.dailyTicketStats;
    } else if (period === 'weekly' && this.weeklyTicketStats) {
      stats = this.weeklyTicketStats;
    } else if (period === 'monthly' && this.monthlyTicketStats) {
      stats = this.monthlyTicketStats;
    } else {
      return; // No data available
    }
    
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
            text: `Ticket Status Distribution (${period})`
          }
        }
      }
    });
  }

  // Update bus chart
  updateBusChart(): void {
    const ctx = document.getElementById('busChart') as HTMLCanvasElement;
    if (!ctx) return;
    
    let stats;
    let period = this.busPeriod;
    
    if (period === 'daily' && this.dailyBusStats) {
      stats = this.dailyBusStats;
    } else if (period === 'weekly' && this.weeklyBusStats) {
      stats = this.weeklyBusStats;
    } else if (period === 'monthly' && this.monthlyBusStats) {
      stats = this.monthlyBusStats;
    } else {
      return; // No data available
    }
    
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
            text: `Bus Statistics (${period})`
          }
        }
      }
    });
  }

  // Existing methods
  getDailyTicketStats() {
    if (this.dateForTickets != null) {
      this.dashboardService.getDailyTicketStats(this.dateForTickets).subscribe(
        (res: DailyTicketStats) => {
          console.log(res);
          this.dailyTicketStats = res;
          this.updateTicketsChart();
        }
      );
      this.dailyTicketStatsPanel = true;
      this.weeklyTicketStatsPanel = false;
      this.monthlyTicketStatsPanel = false;
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
      this.dailyBusStatsPanel = true;
      this.weeklyBusStatsPanel = false;
      this.monthlyBusStatsPanel = false;
    }
  }

  // New methods for weekly and monthly stats
  // getWeeklyTicketStats() {
  //   if (this.weekForTickets) {
  //     // Parse the week string (e.g., "2025-W10")
  //     const [year, week] = this.weekForTickets.split('-W');
      
  //     // Calculate start and end dates of the week
  //     const januaryFirst = new Date(parseInt(year), 0, 1);
  //     const dayOffset = januaryFirst.getDay(); // 0 = Sunday, 1 = Monday, etc.
  //     const weekNumber = parseInt(week);
      
  //     // Calculate the first day of the week
  //     const firstDayOfWeek = new Date(parseInt(year), 0, 1 + (weekNumber - 1) * 7 - dayOffset + 1);
      
  //     // Calculate the last day of the week
  //     const lastDayOfWeek = new Date(firstDayOfWeek);
  //     lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
      
  //     this.weekStartDateforTicket = firstDayOfWeek;
  //     this.weekStartEndforTicket = lastDayOfWeek;
      
  //     // Call your service method (you need to implement this in your service)
  //     this.dashboardService.getWeeklyTicketStats(firstDayOfWeek, lastDayOfWeek).subscribe(
  //       (res: any) => {
  //         console.log(res);
  //         this.weeklyTicketStats = res;
  //         this.updateTicketsChart();
  //       }
  //     );
      
  //     this.dailyTicketStatsPanel = false;
  //     this.weeklyTicketStatsPanel = true;
  //     this.monthlyTicketStatsPanel = false;
  //   }
  // }

  // getMonthlyTicketStats() {
  //   if (this.monthForTickets) {
  //     // Parse the month string (e.g., "2025-03")
  //     const [year, month] = this.monthForTickets.split('-');
      
  //     // Create first and last day of the month
  //     const firstDayOfMonth = new Date(parseInt(year), parseInt(month) - 1, 1);
  //     const lastDayOfMonth = new Date(parseInt(year), parseInt(month), 0);
      
  //     // Call your service method (you need to implement this in your service)
  //     this.dashboardService.getMonthlyTicketStats(firstDayOfMonth, lastDayOfMonth).subscribe(
  //       (res: any) => {
  //         console.log(res);
  //         this.monthlyTicketStats = res;
  //         this.updateTicketsChart();
  //       }
  //     );
      
  //     this.dailyTicketStatsPanel = false;
  //     this.weeklyTicketStatsPanel = false;
  //     this.monthlyTicketStatsPanel = true;
  //   }
  // }

  // getWeeklyBusStats() {
  //   if (this.weekForBus) {
  //     // Similar logic as getWeeklyTicketStats
  //     const [year, week] = this.weekForBus.split('-W');
  //     const januaryFirst = new Date(parseInt(year), 0, 1);
  //     const dayOffset = januaryFirst.getDay();
  //     const weekNumber = parseInt(week);
      
  //     const firstDayOfWeek = new Date(parseInt(year), 0, 1 + (weekNumber - 1) * 7 - dayOffset + 1);
  //     const lastDayOfWeek = new Date(firstDayOfWeek);
  //     lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
      
  //     this.weekStartDateforBus = firstDayOfWeek;
  //     this.weekStartEndforBus = lastDayOfWeek;
      
  //     // Call your service method
  //     this.dashboardService.getWeeklyBusStats(firstDayOfWeek, lastDayOfWeek).subscribe(
  //       (res: any) => {
  //         console.log(res);
  //         this.weeklyBusStats = res;
  //         this.updateBusChart();
  //       }
  //     );
      
  //     this.dailyBusStatsPanel = false;
  //     this.weeklyBusStatsPanel = true;
  //     this.monthlyBusStatsPanel = false;
  //   }
  // }

  // getMonthlyBusStats() {
  //   if (this.monthForBus) {
  //     // Similar logic as getMonthlyTicketStats
  //     const [year, month] = this.monthForBus.split('-');
      
  //     const firstDayOfMonth = new Date(parseInt(year), parseInt(month) - 1, 1);
  //     const lastDayOfMonth = new Date(parseInt(year), parseInt(month), 0);
      
  //     // Call your service method
  //     this.dashboardService.getMonthlyBusStats(firstDayOfMonth, lastDayOfMonth).subscribe(
  //       (res: any) => {
  //         console.log(res);
  //         this.monthlyBusStats = res;
  //         this.updateBusChart();
  //       }
  //     );
      
  //     this.dailyBusStatsPanel = false;
  //     this.weeklyBusStatsPanel = false;
  //     this.monthlyBusStatsPanel = true;
  //   }
  // }

  // Methods to switch between periods
  switchTicketsPeriod(period: string) {
    this.ticketPeriod = period;
  }
  switchBusPeriod(period: string) {
    this.busPeriod = period;
  }
}