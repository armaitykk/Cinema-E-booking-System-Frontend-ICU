import { Component } from '@angular/core';
import { DataSharingService } from '../data-sharing.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { appApiServices } from '../services/app.services';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-checkout-ui',
    templateUrl: './checkout-ui.component.html',
    styleUrls: ['./checkout-ui.component.css']
})
export class CheckoutUiComponent {
  movieTitle: string = 'Sample Movie';
  showTime: string = 'Show Time 1';
  selectedSeats: string[] = [];
  cardName: string = '';
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  userData : any;
  customerData : any;
  cardUserID : any;
  paymentData : any;
  showCardDetails : any;
  firstNameUser : any;
  lastNameUser : any;
  userCardDetails : FormGroup;
  showAddCardDetails : boolean = false;
  selectedPaymentCardID : any;
  promoCode: string = '';
  bookingDatafromBuy : any;
  movieDetailsDataFromBuy : any;
  promosList : any = [];
  promoCodeForm: FormGroup;
  currentDate : string = '';
  promoCodeError : boolean = false;
  promoCodeSuccess : boolean = false;
  promoCodeErrorMessage : any;
  orderConfirmation : any;
  customerID : any;
  loading : boolean = false;
  


  constructor(private datePipe: DatePipe, private appService: appApiServices, private dataSharingService: DataSharingService,private http: HttpClient, private router: Router, private fb: FormBuilder) {
    this.userCardDetails = this.fb.group({
        "cardID": [null],
        "userID": [null],
        "customerID" : [null],
        // "billing_address": [null],
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
      this.promoCodeForm = this.fb.group({
        promoCode: ['', Validators.required],
      });
      this.getCurrentDate();
  }
  ngOnInit(): void 
  {
    // this.checkUserLoginStatus = localStorage.getItem('isLoggedIn');

    this.fetchUserData();
    this.getAllPromos();
    this.firstNameUser = localStorage.getItem('userFirstName');
    this.lastNameUser = localStorage.getItem('userLastName');
    const userID = localStorage.getItem('userID');
    if (userID !== null) {
      this.customerID = +userID;
      console.log("cust;", this.customerID);
    }
    this.dataSharingService.getBuyTicketSharedData().subscribe((data) => {
        this.bookingDatafromBuy = data;
        console.log("Form data in checkout from buy tickets", this.bookingDatafromBuy.value)
      });
      this.dataSharingService.getBookedMovieDetailsSharedData().subscribe((data) => {
        if (data && data.length > 0) {
            this.movieDetailsDataFromBuy = data[0];
        }
        // this.movieDetailsDataFromBuy = data[0];
        console.log("Movie deatils in checkout from buy tickets", this.movieDetailsDataFromBuy)
      });
  }

  getCurrentDate() {
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;
  }

  cancelOrder() {
    this.router.navigate(['/home']);
      console.log('Order Canceled!');
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
        console.log("card user id in checkout", this.cardUserID);
        this.paymentData = this.userData.cardDetails;
        // const trimmedCard = this.paymentData.cardNumber.substring(this.paymentData.cardNumber.length - 4);

        console.log("Card Data in checkout", this.paymentData);
        this.showCardDetails = new Array(this.paymentData.length).fill(false);

      });
  }
  addCardDetails()
  {
    const addCardDet = this.userCardDetails.value;
   addCardDet.userID = this.cardUserID;
   this.showAddCardDetails = false;
    this.http.post('http://localhost:3200/addCard', addCardDet)
    .subscribe((data: any) => {
      this.paymentData = data[200];
      console.log("Card Data", this.paymentData);
      this.fetchUserData();
    });
  }
  hasReachedCardLimit() {
    return this.paymentData && this.paymentData.length >= 3;
  }
  
  
  toggleAddCardDetails() {
    this.showAddCardDetails = !this.showAddCardDetails;
  }
  selectPaymentCard(cardID: number) {
    this.selectedPaymentCardID = cardID;
    console.log("the card selected is:", this.selectedPaymentCardID)
  }

  getAllPromos()
  {
    this.appService.getAllPromotions().subscribe(res => {
        if (res) {
          this.promosList = res;
          console.log("Promos available", this.promosList);
        }
      });
  }
  checkIfPromoCodeValid() {
    const promoCodeControl = this.promoCodeForm.get('promoCode');
    const promoCodeValue = this.promoCodeForm.get('promoCode')?.value;
  
    if (!this.promosList || this.promosList.length === 0) {
      // promosList is empty or undefined
      console.log('No available promo codes');
      return;
    }
  
    const currentDate = new Date();
  
    const matchingPromo = this.promosList.find((promo:any) => promo.promoCode === promoCodeValue);
  
    if (!matchingPromo) {
      // No matching promo code found
      this.promoCodeError = true;
      this.promoCodeErrorMessage = 'Promo code not found';
      // Reset the promo code value
      promoCodeControl?.reset();
      return;
    }
  
    const startDate = new Date(matchingPromo.startDate);
    const endDate = new Date(matchingPromo.endDate);
  
    if (startDate > currentDate) 
    {
      // Promo code has not started yet
      this.promoCodeError = true;
      this.promoCodeErrorMessage = 'Promo code has not started yet';
      // Reset the promo code value
      promoCodeControl?.reset();
    } 
    else if (endDate < currentDate) 
    {
      // Promo code has expired
      this.promoCodeError = true;
      this.promoCodeErrorMessage = 'Promo code expired';
      // Reset the promo code value
      promoCodeControl?.reset();
    } 
    else 
    {
      // Promo code is valid
      this.promoCodeSuccess = true;
      this.promoCodeErrorMessage = 'Promo code applied successfully!';
      this.bookingDatafromBuy.value['booking']['promoCode'] = promoCodeValue;
        console.log("Data after promocode is valid:", this.bookingDatafromBuy.value)
    }
  }

  confirmOrder() {
    this.loading = true;
    const cardUsedforPayment = this.selectedPaymentCardID;
    this.bookingDatafromBuy.value['booking']['paymentId'] = cardUsedforPayment;
  
    // Check the validity of the promo code again
    const promoCodeValue = this.promoCodeForm.get('promoCode')?.value;
    if (promoCodeValue && this.promoCodeSuccess) {
      // Promo code is still valid, set it in the booking data
      this.bookingDatafromBuy.value['booking']['promoCode'] = promoCodeValue;
    } else {
      // Promo code is either empty or no longer valid, set it to an empty string
      this.bookingDatafromBuy.value['booking']['promoCode'] = '';
    }
  
    this.appService.confirmBookingOrder(this.bookingDatafromBuy.value).subscribe(res => {
      if (res) {
        this.loading = false;
        this.orderConfirmation = res;
        console.log("Order Confirmed", this.orderConfirmation);
        this.dataSharingService.setOrderDetailsSharedData(this.orderConfirmation);
  
        this.router.navigate(['/order-confirmation']);
      }
    });
  }
  
  
  //end
}