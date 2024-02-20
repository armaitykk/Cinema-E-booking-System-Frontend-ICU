import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  // Define your properties for user data, payment data, etc.
  imageSrc = '../assets/img/webLogo.png';
  userData: any;
  customerData: any;
  paymentData: any;
  addressData: any;
  billingData: any;
  isPopupVisible: boolean = false; // Flag to control popup visibility
  isSaveSuccessful: boolean = false;
  firstNameUser : any;
  lastNameUser : any;
  cardUserID : any;
  userCardDetails : FormGroup;
  showCardDetails: boolean[] = [];
  passwordForm: FormGroup;
  isOldPasswordIncorrect: boolean = false;
  isPasswordChangeSuccessful: boolean = false;
  showAddCardError : boolean = false;
  // Message variables
  successMessage: any;
  errorMessage: any;
  addCardError : any;

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) { 
 
    this.userCardDetails = this.fb.group({
      "cardID": [null],
      "userID": [null],
      "billing_address": [null],
      "cardType": [null, Validators.required],
      "cardNumber": ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      "expiryDate": [null, Validators.required],
      "securityNumber": ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
      "nameOnCard": [null, Validators.required],
      "street": [null, Validators.required],
      "city": [null, Validators.required],
      "state": [null, Validators.required],
      "zipcode": [null, Validators.required]
    });
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$')]],
    });
  }

  ngOnInit(): void {
    // Fetch user data from the API
    this.fetchUserData();
    this.firstNameUser = localStorage.getItem('userFirstName');
    this.lastNameUser = localStorage.getItem('userLastName');
    // this.showCardDetails = new Array(this.paymentData.length).fill(false);

    // Optionally, you can add logic to check for user authentication or other conditions before fetching data.
  }
  hasReachedCardLimit() {
    return this.paymentData.length >= 3;
  }
  

  fetchUserData() {
    // Fetch user data from the API based on the userID in local storage
    const emailID = localStorage.getItem('userEmailID');
    const password = localStorage.getItem('userPassword');
    const cred = {
      "email": emailID,
      "password": password,
      "userRole": null,
      "firstName": "",
      "lastName": "",
      "phoneNumber": "",
      "address": 0,
      "customerStatusID": null,
      "verificationCode": null,
      "promotionsSubscribed": null
    };
 

    this.http.post('http://localhost:3200/getCustomer', cred)
      .subscribe((data: any) => {
        this.userData = data[200];
        this.customerData = this.userData.customer;
        this.cardUserID = this.customerData.userID;
        console.log("card user id", this.cardUserID);
        this.paymentData = this.userData.cardDetails;
        // const trimmedCard = this.paymentData.cardNumber.substring(this.paymentData.cardNumber.length - 4);

        console.log("Card Data", this.paymentData);
        this.showCardDetails = new Array(this.paymentData.length).fill(false);

      });
  }
 
  showAddCardDetails = false;

  toggleCardDetails(toggleID : any) {
    console.log("toogle Id", toggleID);
    localStorage.setItem('editIndexID', toggleID);
    this.showCardDetails[toggleID] = !this.showCardDetails[toggleID];
  }
  toggleAddCardDetails() {
    console.log("Inside Toogle")
    this.showAddCardDetails = !this.showAddCardDetails;
    console.log("After toogling", this.showAddCardDetails);
    this.addCardError = '';
    this.userCardDetails.reset();
  }
  isEditing = false;

  toggleEditing() {
    this.isEditing = !this.isEditing;
  }

  // Call this function to navigate to the edit profile page
  navigateToEditProfile() {
    this.router.navigate(['/edit-profile']);
  }

  closeConfirmationModal() {
    this.isSaveSuccessful = false; // Close the success modal
    // Add any additional logic needed here.
    this.router.navigate(['/edit-profile']); // Redirect to the home page
  }
  //Change Password
  isEditingPassword = false;
  oldPassword = '';
  newPassword = '';

  openPasswordChangePopup() {
    this.isEditingPassword = true;
    // Reset the old and new passwords
    this.oldPassword = '';
    this.newPassword = '';
  }

  closePasswordChangePopup() {
    this.isEditingPassword = false;
    this.errorMessage = '';
    this.successMessage = '';
  }
  changePassword() {
    if (this.oldPassword === this.customerData.password) {
      // Update the password
      this.customerData.password = this.newPassword;
      
      // Send a POST request to change the password
      this.http.post('http://localhost:3200/changePassword', {
        email: this.customerData.email,
        password: this.newPassword
      }).subscribe((response) => {
        // Password change success
        this.successMessage = 'Password changed successfully.';
        // Clear error message
        this.errorMessage = '';

        // Close the password change popup
        this.closePasswordChangePopup();
      });
    } else {
      // Handle incorrect old password
      this.errorMessage = 'Incorrect old password. Please try again.';
      // Clear success message
      this.successMessage = '';
    }
  }

   
    
  

  // Call this function after a successful update
  updateUser() 
  {
    const updatedUserData = { ...this.customerData }; // User data
    // const updatedPaymentData = { ...this.paymentData }; // Payment data
    // const updatedBillingData = { ...this.billingData }; // Billing address data
    // const updatedAddressData = { ...this.addressData }; // Address data

    // Prepare the data to be sent to the server
    // const updatedCustomerData = {
    //   updatedUserData
    //   // cardDetails: updatedPaymentData,
    //   // billingAddress: updatedBillingData,
    //   // address: updatedAddressData
    // };
    this.http.post('http://localhost:3200/updateCustomer', updatedUserData).subscribe((response) => {
      // Handle the response or show a success message
      this.isSaveSuccessful = true;
      this.fetchUserData();
      this.navigateToEditProfile();   
     });
  }
  addCardDetails(event: Event)
  {
    event.preventDefault();

    const addCardDet = this.userCardDetails.value;
   addCardDet.userID = this.cardUserID;
    this.http.post('http://localhost:3200/addCard', addCardDet)
    .subscribe((data: any) => {
      if(data[200])
      {
        console.log("popup status before:", this.showAddCardDetails);
        this.showAddCardDetails = false;
        console.log("popup status after:", this.showAddCardDetails);
      // this.toggleAddCardDetails();
      this.paymentData = data;
      // this.toggleAddCardDetails();
      console.log("Card Data", this.paymentData);
     
      }
      else if (data[208])
      {
        this.showAddCardError  = true;
        this.addCardError  = "Card already exists";
        this.userCardDetails.reset();
        // this.toggleAddCardDetails();
      }
      
    });
  }
  updateCardDetails(indexID: any)
  {
    const updatedUserData = { ...this.customerData }; // User data
    const updatedPaymentData = { ...this.paymentData }; // Payment data
    // const updatedBillingData = { ...this.billingData }; // Billing address data
    // const updatedAddressData = { ...this.addressData }; // Address data
    console.log("index", indexID);
  
    // Prepare the data to be sent to the server
    const updatedCardData = updatedPaymentData[indexID];
    // const updatedCardData = {
    //   customer: updatedUserData,
    //   cardDetails: updatedPaymentData,
    //   billingAddress: updatedBillingData,
    //   address: updatedAddressData
    // };
    this.http.post('http://localhost:3200/updateCard', updatedCardData).subscribe((response) => {
      // Handle the response or show a success message
      console.log("Card Details Updated ", response);
      this.isSaveSuccessful = true;
      this.fetchUserData();
      this.showCardDetails[indexID] = false;
      this.navigateToEditProfile();  
      
     });
  }
  deleteCard(indexID: any)
  {
    const updatedPaymentData = { ...this.paymentData }; // Payment data
    const deletedCard = updatedPaymentData[indexID];
    const deletedCardID  = deletedCard.cardID;
    // updatedPaymentData.cardID = deletedCardID;
    console.log("index", indexID);
    console.log("deleting the card with info", deletedCard);
    console.log("card ID", deletedCardID);
    // Prepare the data to be sent to the server
    // const deletedCardData = {

    //   cardDetails: updatedPaymentData,
    // };
    this.http.post('http://localhost:3200/deleteCard', deletedCard).subscribe((response) => {
      // Handle the response or show a success message
      console.log("Deleted Card Response", response);
      this.isSaveSuccessful = true;
      this.fetchUserData();
      this.navigateToEditProfile();   
     });
  }
}
