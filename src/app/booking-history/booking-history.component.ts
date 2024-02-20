import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../data-sharing.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { appApiServices } from '../services/app.services';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {
  customerID: any;
  bookingDataForm: any;
  currentDate: any;
  orderCounter: number = 1;
  activeOrders: any[] = [];
  pastOrders: any[] = [];

  // Add declarations for noActiveOrders and noPastOrders
  noActiveOrders: boolean = false;
  noPastOrders: boolean = false;

  constructor(
    private datePipe: DatePipe,
    private appService: appApiServices,
    private dataSharingService: DataSharingService,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.customerID = localStorage.getItem('userID');
    this.getCustomerBookings();
    this.getCurrentDate();
  }

  getCurrentDate() {
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;
  }

  getMovieInfoById(movieID: any)
  {
    const id = movieID;
    const data = { movieID: id };
    this.appService.getBookingByCustomerID(data).subscribe(res => {
      if (res) {
        this.bookingDataForm = res;
        this.categorizeOrders();
      }
    });
  }
  getSeatNumbers(tickets: any[]): string {
    return tickets.map(ticket => ticket.seatId).join(', ');
  }

  getTicketTypes(tickets: any[]): string {
    const ticketTypeCounts = new Map<string, number>();

    // Count occurrences of each ticket type
    tickets.forEach(ticket => {
      const count = ticketTypeCounts.get(ticket.ticketType) || 0;
      ticketTypeCounts.set(ticket.ticketType, count + 1);
    });

    // Convert the map to a string representation
    return Array.from(ticketTypeCounts.entries())
      .map(([type, count]) => `${count} ${count > 1 ? type + 's' : type}`)
      .join(', ');
  }

  categorizeOrders() {
    const currentDate = this.currentDate;
    // const currentDate = new Date('2023-12-11');

    console.log("Current Date", currentDate);

    this.bookingDataForm.forEach((order : any) => {
      const orderDate = new Date(order.booking.bookingDate);

      if (orderDate < currentDate) {
        this.pastOrders.push(order);
      } else {
        this.activeOrders.push(order);
      }
    });

    // Set noActiveOrders and noPastOrders based on the length of the arrays
    this.noActiveOrders = this.activeOrders.length === 0;
    this.noPastOrders = this.pastOrders.length === 0;
  }

  getCustomerBookings() {
    const id = +this.customerID;
    const data = { customerID: id };

    this.appService.getBookingByCustomerID(data).subscribe(res => {
      if (res) {
        this.bookingDataForm = res;
        this.categorizeOrders();
      }
    });
  }
}
