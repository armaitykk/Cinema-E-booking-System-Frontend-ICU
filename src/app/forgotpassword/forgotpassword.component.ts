import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { appApiServices } from '../services/app.services';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  logoImg = '../assets/img/webLogo.png';
  forgotPasswordForm: FormGroup;
  // customerDataForm : FormGroup;
  isAccountCreationSuccessful: boolean = false;
  isAccountCreationUnsuccessful: boolean = false;
  submittedFormData: any;
  verificationCode: number | undefined;
  verificationCustomerData: any;
  verificationUnSuccessful : boolean = false; // Initially verification is successful so, unsuccess is set to false

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, private appService: appApiServices) {
  this.forgotPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });
}
  ngOnInit(): void {
  }

  forgotPassword() {
    const formData = this.forgotPasswordForm.value;   
    if (this.forgotPasswordForm.valid) {
      this.appService.forgotPasswordData(formData).subscribe(
        (response: any) => {
          this.isAccountCreationSuccessful = true;
          this.verificationCustomerData = response;
          this.verificationUnSuccessful = true;
          // const userID = response.userID;
          console.log('forgot password data', response);
          localStorage.setItem("forgotUserEmailID", response.email);
        },
        (error) => {
          this.isAccountCreationSuccessful = false;
          this.isAccountCreationUnsuccessful = true;
          console.error('Error:', error);
          this.router.navigate(['/forgot-password']);
        }
      );
    } else {
      this.forgotPasswordForm.markAllAsTouched();
    }
  }



  submitConfirmationCode() {
    const confirmationData = this.verificationCustomerData;
    confirmationData.verificationCode = this.verificationCode;
    console.log("Verification Code", this.verificationCode);
    console.log("confirmationData", confirmationData);
    this.http.post('http://localhost:3200/verifyCustomer', confirmationData).subscribe(
      (response: any) => {
        this.verificationUnSuccessful = false;
        this.router.navigate(['/resetPassword']);
      },
      (error: any) => {
        console.log('Email confirmation failed', error);
      }
    );
  }


  clearErrors(controlName: string) {
    const control = this.forgotPasswordForm.get(controlName);
    if (control) {
      control.setErrors(null);
    }
  }

  closeConfirmationModal() {
    this.isAccountCreationSuccessful = false;
    this.isAccountCreationUnsuccessful = false;
    this.router.navigate(['/forgot-password']);
  }
}
