import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-confirm-code',
  templateUrl: './email-confirm-code.component.html',
  styleUrls: ['./email-confirm-code.component.css']
})
export class EmailConfirmCodeComponent implements OnInit {
  logoImg: string = '../assets/img/webLogo.png';
  emailCode: number | undefined;
  email: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    // You can perform any initialization here if needed.
  }

  submitConfirmationCode() {
    const confirmationData = {
      email: this.email,
      confirmationCode: this.emailCode
    };

    this.http.post('/email-confirmation', confirmationData).subscribe(
      (response: any) => { // Specify the type of the response
        // Handle a successful confirmation, e.g., display a success message.
        this.router.navigate(['/home']);
        console.log('Email confirmation successful', response);
        // You can also navigate to another page on success using this.router.navigate(['path']);
      },
      (error: any) => { // Specify the type of the error
        // Handle confirmation error, e.g., display an error message.
        console.error('Email confirmation failed', error);
      }
    );
  }
}
