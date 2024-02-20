import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;

  logoImg = '../assets/img/webLogo.png';
  username: string = '';
  password: string = '';
  isLoginSuccessful: boolean = false;
  isLoginUnsuccessful: boolean = false;
  verificationUnSuccessful: boolean = false;
  verificationCode: number | undefined;
  verificationCustomerData: any;
  rememberMe: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
    const rememberMeEmailID = localStorage.getItem('rememberMeEmailID');

    if (rememberMeEmailID) {
      this.username = rememberMeEmailID;
      this.rememberMe = true;
    }
  }

  onRememberMeChange() {
    if (!this.rememberMe) {
      localStorage.removeItem('rememberMeEmailID');
    }
  }

  login() {
    this.isLoginSuccessful = false;
    this.isLoginUnsuccessful = false;
    this.errorMessage = '';

    const cred = {
      "userID": null,
      "email": this.username,
      "password": this.password,
      "userRole": null,
      "firstName": null,
      "lastName": null,
      "phoneNumber": null,
      "address": null,
      "customerStatusID": null,
      "verificationCode": null
    };

    this.httpClient.post('http://localhost:3200/getCustomer', cred).subscribe(
      (response: any) => {
        if (response[200]) 
        {
          this.verificationCustomerData = response[200].customer;
          if (response[200].customer.customerStatusID == "Active") 
          {
            this.verificationUnSuccessful = false;
            this.isLoginSuccessful = true;
            this.router.navigate(['/home']);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userFirstName', response[200].customer.firstName);
            localStorage.setItem('userLastName', response[200].customer.lastName);
            localStorage.setItem('userID', response[200].customer.userID);
            localStorage.setItem('userEmailID', response[200].customer.email);
            localStorage.setItem('userPassword', response[200].customer.password);
            console.log("Logged in firstName", response[200].customer.email);
            console.log("Logged in password", response[200].customer.password);
            if (this.rememberMe) {
              localStorage.setItem('rememberMeEmailID', response[200].customer.email);
              console.log('Remember Me is checked');
            } else {
              
              console.log('Remember Me is not checked');
            }
          } 
          else {
            this.isLoginUnsuccessful = true;
            this.errorMessage = 'User account is not active!Please contact us at: popcornpicks.verify@gmail.com';
            this.verificationUnSuccessful = true;
          }
        }
        else if(response[203])
        {
          this.isLoginUnsuccessful  = true;
          this.errorMessage = 'Incorrect password. Click on Forgot Password to reset your credentials.';
        } 
        else if(response[204])
        {
          this.isLoginUnsuccessful  = true;
          this.errorMessage = 'No account associated with this email is found.';
        } 
        else {
          this.errorMessage = 'Invalid username or password. Please try again.';
          this.username = '';
          this.password = '';
          this.isLoginUnsuccessful = true;
          this.loginForm.resetForm();
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        }
      },
      (error) => {
        if (error.status === 204) {
          // User does not exist, set a specific error message
          this.errorMessage = 'User does not exist. Please check your credentials and try again.';
          console.error('204 error', this.errorMessage);
        } 
        console.error('Error validating credentials:', error);
        this.isLoginUnsuccessful = true;
      
      }
    );
  }

  closeConfirmationModal() {
    this.isLoginSuccessful = false;
    this.router.navigate(['/home']);
  }

  closeErrorModal() {
    this.isLoginUnsuccessful = false;
    this.router.navigate(['/login']);
  }

  submitConfirmationCode() {
    const confirmationData = this.verificationCustomerData;
    confirmationData.verificationCode = this.verificationCode;
    console.log("Verification Code", this.verificationCode);
    console.log("confirmationData", confirmationData);
    this.httpClient.post('http://localhost:3200/verifyCustomer', confirmationData).subscribe(
      (response: any) => {
        console.log('Email confirmation successful', response);
        this.verificationUnSuccessful = false;
        this.username = '';
        this.password = '';
        this.loginForm.resetForm();
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.log('Email confirmation failed', error);
      }
    );
  }
}
