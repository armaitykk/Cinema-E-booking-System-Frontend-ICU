import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from '../data-sharing.service';

@Component({
    selector: 'app-order-confirmation',
    templateUrl: './order-confirmation.component.html',
    styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent {
  orderConfirmationData : any;
  totalTicketPrice : any;
  bookingData : any;
  ticketsData : any;


    constructor(private router: Router,private dataSharingService: DataSharingService) { }
    ngOnInit(): void 
  {
    this.dataSharingService.getOrderDetailsSharedData().subscribe((data) => {
      this.orderConfirmationData = data;
      this.bookingData =  data['booking'];
      this.ticketsData  = data['tickets']
      console.log("data from chekout to order confirmation:", data)
        this.totalTicketPrice = data['booking']['totalPrice'];
        console.log("Form data in order confirmation", this.totalTicketPrice)
      });
      // this.dataSharingService.getBookedMovieDetailsSharedData().subscribe((data) => {
      //   if (data && data.length > 0) {
      //       this.orderConfirmationData = data[0];
      //   }
      //   console.log("Movie deatils in order confirmation", this.orderConfirmationData)
      // });
  
  }
  getSeatNumbers(tickets: any[]): string {
    return tickets.map(ticket => ticket.seatId).join(', ');
  }
  getFormattedShowTime(showTime: number): string {
    switch (showTime) {
      case 10: return '10:00 AM';
      case 13: return '1:00 PM';
      case 16: return '4:00 PM';
      case 19: return '7:00 PM';
      case 22: return '10:00 PM';
      default: return '';
    }
  }

    goHome() {
      this.router.navigate(['/home']);
    }
    
}
