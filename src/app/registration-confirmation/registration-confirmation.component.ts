import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration-confirmation',
  templateUrl: './registration-confirmation.component.html',
  styleUrls: ['./registration-confirmation.component.css']
})
export class RegistrationConfirmationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goHome() {
    this.router.navigate(['/home']);
  }
}
