import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { appApiServices } from '../services/app.services';
import { NgModel } from '@angular/forms';


// Custom validator function for password match
function passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('password')!;
  const confirmPassword = control.get('confirmPassword')!;

  if (password.value !== confirmPassword.value) {
    return { 'passwordMismatch': true };
  }
  return null;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  logoImg = '../assets/img/webLogo.png';
  signupForm: FormGroup;
  paymentForm: FormGroup;
  finalFormData : FormGroup;
  loading :  boolean = false;
  isAccountCreationSuccessful: boolean = false;
  isAccountCreationUnsuccessful: boolean = false;
  codeValidationError : boolean = false;
  submittedFormData: any;
  verificationCode: number | undefined;
  registerAccountError : any;
  verificationCustomerData: any;
  verifyError : any;



  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, private appService: appApiServices) {

    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.pattern('^[0-9]{16}$')]],
      securityNumber: ['', [Validators.pattern('^[0-9]{3}$')]],
      nameOnCard: [''],
      expiryDate: [''],
      cardType: [''],
      street: [''],
      city: [''],
      state: [''],
      zipcode: [''],
    });


    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: [''],
      lastName: [''],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$')]],
      confirmPassword: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\+1[0-9]{10}$')]],
      promotionsSubscribed: [false],
      userRole: 1,
      customerStatusID: 1,
      verificationCode: null,
      street: [''],
      city: [''],
      state: [''],
      zipcode: null
    }, {
      validator: passwordMatchValidator
    })

    this.finalFormData = this.fb.group({
      customer: this.signupForm,
      cardDetails: this.paymentForm,

    })

   
  }

  ngOnInit(): void {

    

  }

  signup() {
    // const addressData = this.addressForm.value;
    const formData = this.signupForm.value;
    const finalFormData = this.finalFormData.value;
    console.log("Final Form Data", finalFormData);
    // const cardData = this.paymentForm.value;
    // this.appService.saveAddress(addressData).subscribe(
    //   (response: any) => {
    //     console.log('Address data saved successfully:', response);
    //     console.log("Address ID", response.addressID)
    //   },
    //   (error) => {
    //     console.log('Error while saving address data:', error);
    //   }
    // );
    if (this.signupForm.valid && this.paymentForm.valid) {
      this.appService.sendCustomerUserData(finalFormData).subscribe(
        (response: any) => {
          if(response)
          {
            if(response[200])
            {
              this.isAccountCreationSuccessful = true;
              this.verificationCustomerData = response[200];
              console.log("Customer Verification Data", this.verificationCustomerData);
              const userID = response[200].userID;
              console.log('User registered with userID:', userID);
              localStorage.setItem("userID", response[200].userID);
              localStorage.setItem("registerdUserFirstName", response[200].firstName)
              // cardData.userID = response.userID;
            }
            else if(response[208])
            {
              this.isAccountCreationSuccessful = false;
              this.isAccountCreationUnsuccessful = true;
              this.registerAccountError = "Account already exists with this email. Please try logging in."
              console.log("Account already exists with this email. Please try logging in.");
              // this.router.navigate(['/login']);
            }
            else if(response[502])
            {
              this.isAccountCreationSuccessful = false;
              this.isAccountCreationUnsuccessful = true;
              this.registerAccountError = "Unable to send email. Please try after sometime."
              console.log("Unable to send email. Please try after sometime.");
              this.router.navigate(['/signup']);
            }
           
          }
        
        },
        // (error) => {
        //   this.isAccountCreationSuccessful = false;
        //   this.isAccountCreationUnsuccessful = true;
        //   console.error('Error:', error);
        //   this.router.navigate(['/signup']);
        // }
      );
      // this.appService.addPaymentCard(cardData).subscribe(
      //   (response: any) => {    
      //     console.log("card data later", cardData);
      //     console.log('Payment card added successfully:', response);
      //   },
      //   (error) => {
      //     console.error('Error adding payment card:', error);
      //   }
      // );

    } else {
      this.signupForm.markAllAsTouched();
      // this.addressForm.markAllAsTouched();
      this.paymentForm.markAllAsTouched();
    }
  }

  clearErrors(controlName: string) {
    const control = this.signupForm.get(controlName);
    if (control) {
      control.setErrors(null);
    }
  }

  closeConfirmationModal() {
    this.isAccountCreationSuccessful = false;
    this.isAccountCreationUnsuccessful = false;
    this.router.navigate(['/login']);
  }


  submitConfirmationCode() {
    if (this.verificationCode === undefined || this.verificationCode === null) {
      this.codeValidationError = true;
      this.verifyError = "Please enter the confirmation code.";
  }
  else{
    this.codeValidationError = false;
    const confirmationData = this.verificationCustomerData;
    confirmationData.verificationCode = this.verificationCode;
    console.log("Verification Code", this.verificationCode);
    console.log("confirmationData", confirmationData);
    console.log("Payment Card Form", this.paymentForm);
    // console.log("Address Form", this.addressForm);
    this.http.post('http://localhost:3200/verifyCustomer', confirmationData).subscribe(
      (response: any) => {
        if(response[200])
        {
          console.log('Email confirmation successful', response);
          this.router.navigate(['/login']);
        }
        else if(response[400])
        {
          this.codeValidationError = true;
          this.verifyError = "Invalid verification code"
        }
        else if(response[208])
        {
          this.codeValidationError = true;
          this.verifyError = "Account already exists with this email. Please try logging in."
        }
        else if(response[502])
        {
          this.codeValidationError = true;
          this.verifyError = " Unable to send email"
        }
        
      },
      (error: any) => {
        console.log('Email confirmation failed', error);
      }
    );
        
  }

  }
}