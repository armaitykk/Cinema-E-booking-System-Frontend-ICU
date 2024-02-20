import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cinema-E-booking-System';
  // Initially, don't show the login component
  showLogin: boolean = false;

  // Function to toggle the display of the login component
  toggleLogin() {
    this.showLogin = !this.showLogin;
  }

}
