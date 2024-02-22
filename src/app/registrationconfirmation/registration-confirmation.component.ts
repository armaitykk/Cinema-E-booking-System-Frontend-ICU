import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-confirmation',
  templateUrl: './registration-confirmation.component.html',
  styleUrls: ['./registration-confirmation.component.css']
})
export class RegistrationConfirmationComponent {
  constructor(private router: Router) {}

  login() {
    // Implement login functionality, navigate to login page
    this.router.navigate(['/login']);
  }

  returnHome() {
    // Implement returning home functionality, navigate to home page
    this.router.navigate(['/home']);
  }
}
