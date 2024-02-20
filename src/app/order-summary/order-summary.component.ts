import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent {
  // static temporary data
  tickets: any[] = [
    {
      movieTitle: 'Avengers: Endgame',
      showTime: 'Show Time 1',
      seat: 'A1',
      age: 'Adult',
      price: '$12'
    },
    {
      movieTitle: 'Avengers: Endgame',
      showTime: 'Show Time 1',
      seat: 'A2',
      age: 'Child',
      price: '$8'
    }
  ];

  deleteTicket(index: number) {
    this.tickets.splice(index, 1);
  }

  updateOrder() {
    // For demo, just navigate back to buy tickets
    window.location.href = '/buy-tickets';
  }

  constructor(private router: Router) { }

  checkout() {
    this.router.navigate(['/checkout']);
  }
}
