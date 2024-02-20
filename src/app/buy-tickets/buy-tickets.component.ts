import { Component } from '@angular/core';
import { DataSharingService } from '../data-sharing.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { IframeModalComponent } from '../iframe-modal/iframe-modal.component';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { appApiServices } from '../services/app.services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buy-tickets',
  templateUrl: './buy-tickets.component.html',
  styleUrls: ['./buy-tickets.component.css']
})
export class BuyTicketsComponent {
  showError: boolean = false;
  movieTitle: string = '';
  seats: { seat: string; selected: boolean; isReserved: boolean }[] = [
    { seat: 'A1', selected: false, isReserved: false },
    { seat: 'A2', selected: false, isReserved: false },
    { seat: 'A3', selected: false, isReserved: false },
    { seat: 'A4', selected: false, isReserved: false },
    { seat: 'A5', selected: false, isReserved: false },
    { seat: 'A6', selected: false, isReserved: false },
    { seat: 'A7', selected: false, isReserved: false },
    { seat: 'A8', selected: false, isReserved: false },
    { seat: 'B1', selected: false, isReserved: false },
    { seat: 'B2', selected: false, isReserved: false },
    { seat: 'B3', selected: false, isReserved: false },
    { seat: 'B4', selected: false, isReserved: false },
    { seat: 'B5', selected: false, isReserved: false },
    { seat: 'B6', selected: false, isReserved: false },
    { seat: 'B7', selected: false, isReserved: false },
    { seat: 'B8', selected: false, isReserved: false },
    { seat: 'C1', selected: false, isReserved: false },
    { seat: 'C2', selected: false, isReserved: false },
    { seat: 'C3', selected: false, isReserved: false },
    { seat: 'C4', selected: false, isReserved: false },
    { seat: 'C5', selected: false, isReserved: false },
    { seat: 'C6', selected: false, isReserved: false },
    { seat: 'C7', selected: false, isReserved: false },
    { seat: 'C8', selected: false, isReserved: false },
    { seat: 'E1', selected: false, isReserved: false },
    { seat: 'E2', selected: false, isReserved: false },
    { seat: 'E3', selected: false, isReserved: false },
    { seat: 'E4', selected: false, isReserved: false },
    { seat: 'E5', selected: false, isReserved: false },
    { seat: 'E6', selected: false, isReserved: false },
    { seat: 'E7', selected: false, isReserved: false },
    { seat: 'E8', selected: false, isReserved: false },
    // ... other seats
  ];
  
  selectedSeats: string[] = [];
  selectedAge: string = 'adult'; // Default
  movieList: any = [];
  showSeatPopup: boolean = false;
  count: number = 0;
  adultCount: number = 0;
  childCount: number = 0;
  selectedDate: any ; 
  selectedTime: any ;
  seatSelectionInfo : any;
  totalTickets: number = 0;
  dateChoosen : any;
  movieShowsScheduled : any;
  schedulingMovieID : any;
  tickets: any[] = []; 
  showReviewOrderPopup: boolean = false;
  selectedTimeFormatted: string = '';
  addSeatsError : any;
  showAddSeatsErrorDiv : boolean = false;
  showCantCheckoutPopup : boolean = false;
  totalTicketsPrice : any;
  customerID : any;
  getShowId : any;
  getShowIDlist : any;
  booking : any[] = [];
  movieDetails : any[] = [];
  finalBookingFormData : FormGroup;
  reservedShowId : any;
  reservedSeatsList : any;
  checkUserLoginStatus : any;

  constructor(private fb: FormBuilder,private dataSharingService: DataSharingService, private appService: appApiServices, private dialog: MatDialog, private route: ActivatedRoute, private router: Router) {

    this.finalBookingFormData = this.fb.group({
      "booking": this.fb.group({
          customerId: [null],
          movieId: [null],
          showId: [null],
          bookingDate: [null],
          paymentId : [null],
          promoCode : [null],
          totalPrice : [null],
          bookingStatus : [null],
          paymentStatus : [null]
        }),
      "tickets": this.fb.array([]
      //   {
      //     bookingId: [null],
      //     seatId: [null],
      //     ticketType: [null],
      //     ticketPrice: [null],
      //  }
       )
    })

   }

  ngOnInit(): void {
    this.showSeatPopup = true;
    const userI_D = localStorage.getItem('userID');
    if(userI_D !== null)
    {
      this.customerID = +userI_D;
    }
  
    this.movieTitle = this.route.snapshot.paramMap.get('title') ?? '';
    console.log("movieTitle", this.movieTitle);
    this.appService.viewMovieInfo(this.movieTitle).subscribe(res => {
      if (res) {
        this.movieList = res;
        this.schedulingMovieID = this.movieList.id;
        console.log("Response In View Movie", this.movieList);
      }
    });
  }

  selectSeat(seat: string) {
    const index = this.selectedSeats.indexOf(seat);

    if (index === -1 && this.selectedSeats.length < this.totalTickets) {
      // If the seat is not already selected and the total number of selected seats is less than the limit, add it
      this.selectedSeats.push(seat);
    } else if (index !== -1) {
      // If the seat is already selected, remove it
      this.selectedSeats.splice(index, 1);
    }

    // Update the seats array to maintain the highlighting
    this.seats = this.seats.map(s => ({
      seat: s.seat,
      selected: this.selectedSeats.includes(s.seat),
      isReserved: s.isReserved || this.reservedSeatsList.includes(s.seat)
    }));
  }  

  increment(category: string) {
    if (category === 'adult') {
      this.adultCount++;
    } else if (category === 'child') {
      this.childCount++;
    }
  }

  decrement(category: string) {
    if (category === 'adult' && this.adultCount > 0) {
      this.adultCount--;
    } else if (category === 'child' && this.childCount > 0) {
      this.childCount--;
    }
  }

  onAddSeats() {
    // Save selected details and update showSeatPopup
    const totalTickets = this.adultCount + this.childCount;
    const selectedDate = this.selectedDate; 
    const selectedTime = this.selectedTime; 
    const selectedSeats = this.selectedSeats;
    this.totalTickets = this.adultCount + this.childCount;
    this.selectedTimeFormatted = this.formatShowTime(this.selectedTime);
    if (!this.selectedDate) {
    this.showAddSeatsErrorDiv = true;
     this.addSeatsError = 'Please select a show date before adding seats.'; 
      return;
    }
  
    // Check if show time is selected
    if (!this.selectedTime) {
      this.showAddSeatsErrorDiv = true;
      this.addSeatsError =  'Please select a show time before adding seats.';
      return;
    }
  
    // Check if at least one ticket is selected
    if (this.totalTickets < 1) {
      this.showAddSeatsErrorDiv = true;
      this.addSeatsError = 'Please select atleast one ticket';
      return;
    }

  // Log the selectedTimeFormatted value
  console.log('Selected Time Formatted:', this.selectedTimeFormatted);

    // Display selected details in the seatSelectionInfo div
    this.seatSelectionInfo = `Selected Details:
      Date: ${selectedDate}
      Time: ${selectedTime}
      Total Tickets: ${totalTickets}
      Selected Seats: ${selectedSeats.join(', ')}`;
  
    // Update showSeatPopup
    this.showSeatPopup = false;
    this.showAddSeatsErrorDiv = false;
    this.getShowByDateandTime();
  }
  openSeatPopup() {
    this.showSeatPopup = true;
}
  

  getSelectsSelected() {
    // Implement if needed
  }

  changeAge(age: string) {
    this.selectedAge = age;
  }
  onShowDateChange(event: any) {
     this.dateChoosen = event?.target?.value;
    console.log("Selected Date is:",this.dateChoosen);
    console.log("Selected Movie ID is:",this.schedulingMovieID);
    // Call the function to get available shows
    this.getScheduledShowList(this.dateChoosen, this.schedulingMovieID);
  }

  getScheduledShowList(showDate: any, movieId: any) {
    const data = { showDate: showDate, movieId: movieId };
    this.appService.customerGetShowsByData(data).subscribe(
        (response: any) => {
            this.movieShowsScheduled = response[400];

            console.log("checking if i get show id:", this.movieShowsScheduled);

            // Ensure that each showTime is a number before formatting
            this.movieShowsScheduled = this.movieShowsScheduled.filter((show : any) => typeof show === 'number');
            
            if (this.movieShowsScheduled.length === 0) {
                // If no shows are available, add a default option
                this.movieShowsScheduled.push({
                    showTime: null,
                    showTimeFormatted: 'No shows available',
                });
            } else {
                // Format and assign showTimeFormatted property for valid shows
                this.movieShowsScheduled.forEach((show : any, index : any) => {
                    this.movieShowsScheduled[index] = {
                        showTime: show,
                        showTimeFormatted: this.formatShowTime(show),
                    };
                });
            }

            console.log("Shows based on Movie", this.movieShowsScheduled);
        },
        (error) => {
            console.error('Error:', error);
        });
}






  formatShowTime(time: number): string {
    // Assuming the time is in 24-hour format, convert it to 12-hour format
    const hours = time % 12 === 0 ? 12 : time % 12;
    const ampm = time < 12 ? 'AM' : 'PM';

    // Pad single-digit hours with leading zero
    const formattedHours = hours.toString().padStart(2, '0');

    return `${formattedHours}:00 ${ampm}`;
}


getTicketType(): string {
  const remainingAdultCount = this.adultCount - this.tickets.filter(t => t.ticketType === 'Adult').length;
  const remainingChildCount = this.childCount - this.tickets.filter(t => t.ticketType === 'Child').length;

  // Randomly decide whether to assign the seat to an adult or child based on remaining counts
  if (remainingAdultCount > 0 && remainingChildCount > 0) {
    const isAdult = Math.random() > 0.5; // Adjust the threshold for your preference

    return isAdult ? 'Adult' : 'Child';
  } else {
    // If there are no more remaining tickets for one type, assign the seat to the other type
    return remainingAdultCount > 0 ? 'Adult' : 'Child';
  }
}



onClickReviewOrder() {
  // Call the method to save tickets
  this.saveTickets();

  // Check if the number of selected seats matches the total number of seats chosen in the popup
  if (this.selectedSeats.length === this.totalTickets) {
    // If they match, navigate to the next page
    this.showReviewOrderPopup = true;
    // this.router.navigate(['/order-summary']);
  } else {
    // If they don't match, show the error message
    this.showError = true;
  }
}
onUpdateOrder() {
  // Handle update order logic
  // For example, navigate back to the seat selection section
  this.showReviewOrderPopup = false;
  this.showSeatPopup = true;
}

onProceedToCheckout() {
  // Handle proceed to checkout logic
  // For example, navigate to the checkout page

  this.checkUserLoginStatus = localStorage.getItem('isLoggedIn');
  if(this.checkUserLoginStatus === null)
  {
    this.showReviewOrderPopup = false;
    this.showCantCheckoutPopup = true;
    console.log("Cannot continue")
  }
  else
  {
    this.router.navigate(['/checkout']);
  }

}

saveTickets() {
  const customerId = this.customerID;
  const movieId = this.schedulingMovieID;
  const bookingDate = this.dateChoosen;
  const showTime = +this.selectedTime;
  const paymentId = 1;
  const promoCode = "";
  const totalPrice = 0;
  const bookingStatus = 1;
  const paymentStatus = 1;

  const data = { showDate: bookingDate, showTime: this.selectedTime };
  console.log("data sent to getShowIDByShowDateandTime", data);

  this.appService.getShowIDByShowDateandTime(bookingDate, showTime).subscribe(res => {
    if (res) {
      this.getShowIDlist = res[400];
      console.log("Response In getShowIDByShowDateandTime:", this.getShowIDlist);
      this.getShowId = this.getShowIDlist.showId;
      const showId = this.getShowId;
      console.log("ID In getShowIDByShowDateandTime:", this.getShowId);

      const booking = {
        customerId,
        movieId,
        showId,
        bookingDate,
        paymentId,
        promoCode,
        totalPrice,
        bookingStatus,
        paymentStatus
      };

      this.finalBookingFormData.get('booking')?.patchValue(booking);
      console.log("Final form booking data in buy tickets", this.finalBookingFormData.value);
    }
  });

  const movieName = this.movieList.movieTitle;
  const seats = this.selectedSeats.join(', ');
  const showTimeFormatted = this.selectedTimeFormatted;

  // Movie Details
  const movieDetails = {
    movieName,
    bookingDate,
    showTimeFormatted,
    seats,
  };
  this.movieDetails.push(movieDetails);

  // Clear the existing tickets array
  this.tickets = [];

  // Initialize variables for total prices
  let totalAdultPrice = 0;
  let totalChildPrice = 0;

  // Get the 'tickets' FormArray from the finalBookingFormData
  const ticketsFormArray = this.finalBookingFormData.get('tickets') as FormArray;
  console.log("ticketsFormArray" ,ticketsFormArray);
  ticketsFormArray.clear();

  // Loop through selected seats and create tickets
  this.selectedSeats.forEach((seat, index) => {
    const ticketType = this.getTicketType();
    const ticketPrice = this.calculateTicketPrice(ticketType);

    // Create a FormGroup for each ticket
    const ticketGroup = this.fb.group({
      bookingId: [0],
      seatId: [seat],
      ticketType: [ticketType],
      ticketPrice: [ticketPrice],
    });

    // Push the ticket FormGroup into the 'tickets' FormArray
    ticketsFormArray.push(ticketGroup);

    // Update the total price based on the ticket type
    if (ticketType === 'Adult') {
      totalAdultPrice += ticketPrice;
    } else {
      totalChildPrice += ticketPrice;
    }
  });

  // Calculate the total price for all tickets
  this.totalTicketsPrice = totalAdultPrice + totalChildPrice;

  // Log the ticket information and total ticket price
  console.log('Tickets Info:', this.tickets);
  console.log('Booking Info:', this.booking);
  console.log("this.finalBookingFormData" ,this.finalBookingFormData);
  this.dataSharingService.setBookedMovieDetailsSharedData(this.movieDetails);
  this.dataSharingService.setBuyTicketSharedData(this.finalBookingFormData);
  console.log('Total Tickets Price:', this.totalTicketsPrice);
}


calculateTicketPrice(ticketType: string): number {
  // Define the ticket prices
  const adultTicketPrice = 11.00;
  const childTicketPrice = 9.00;

  // Calculate the total price based on the number of adult and child tickets selected
  const totalAdultPrice = this.adultCount * adultTicketPrice;
  const totalChildPrice = this.childCount * childTicketPrice;

  // Return the price for the new ticket based on ticket type
  return ticketType === 'Adult' ? adultTicketPrice : childTicketPrice;
}


getShowByDateandTime()
{
  const showID = this.selectedDate; 
  const showTime = +this.selectedTime;
  this.appService.getShowIDByShowDateandTime(showID, showTime ).subscribe(res => {
    if (res) {
      this.reservedShowId = res[400].showId;
      console.log("Get reserved show ID", this.reservedShowId);
      this.getSeatsReserved(this.reservedShowId);
    }
  });

}
getSeatsReserved(getShowID : any)
{
  const data = {"showID" : getShowID};
  console.log("Data being sent to get res", data);
  this.appService.getReservedSeats(data).subscribe(res => {
    if (res) {
      this.reservedSeatsList = res[400];
      console.log("Getting reserved seats", this.reservedSeatsList);
      this.seats = this.seats.map(seat => ({
        seat: seat.seat,
        selected: seat.selected,
        isReserved: this.reservedSeatsList.includes(seat.seat) || seat.isReserved
      }));
    }
  });
}


//Ends here
}
