import { Component, OnInit,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {appApiServices} from '../services/app.services';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-adminmanagemovies',
  templateUrl: './adminmanagemovies.component.html',
  styleUrls: ['./adminmanagemovies.component.css']
})
export class AdminmanagemoviesComponent implements OnInit {
  movieList: any = [];
  editMovieId: any;
  movieFormData: any;
  scheduleMovieForm: FormGroup;
  scheduleMovieId: any;
  showEditPopup: boolean = false;
  showSchedulePopup: boolean = false;
  movieShowsScheduled: any;
  movieShowsAvailable : any;
  isEditingShowTime = false;
  editedShowTime: any;
  editedShowId: any;
  editedShowDate: any;
  editedMovieId: any;
  editedMovieDuration: any;
  editingMovieData: FormGroup;
  errorSchedulingMovie : boolean = false;
  errorMessageScheduled : any;

  @Input() movies: any[] = [];
  constructor(private fb: FormBuilder, private appService: appApiServices,private router: Router) {
    this.scheduleMovieForm = this.fb.group({
      duration_minutes: [null, Validators.required],
      showDate: [''],
      showTime: [null, Validators.required],
      movieId: [null, Validators.required]
    });

    this.editingMovieData = this.fb.group({
      duration_minutes: [null],
      showDate: [''],
      showTime: [null],
      movieId: [null],
      showId: [null]
    });

   }

  ngOnInit(): void {
   this.getMovies();
  }
  getMovies()
  {
    this.appService.getMoviesList().subscribe(res => 
      {
      if (res) 
      {
        this.movieList = res;
        console.log("Response in admin", this.movieList);
      }
    });
  }
  editMovie(id: any, movieTitle: any)
  {
    this.editMovieId = id;
    this.openEditPopup();
    // const data= { movieTitle : title}
    this.appService.getMovieInfo(movieTitle).subscribe(
      (response: any) => {
        console.log("Movie editing ", response);
        this.movieFormData = response;
        console.log("respons" ,this.movieFormData.movieAvailability);
        this.getShowsByMovie();
        this.router.navigate(['/admin/home']);
      },
      (error) => {
        console.error('Error:', error);
      })
  }
  updateMovie()
  {
    const updatedMovieData = { ...this.movieFormData }; // Movie data
    this.appService.editMovieAdmin(updatedMovieData).subscribe(
      (response: any) => {
        console.log("Movie updated successfully", response);
        this.closeEditPopup();
        this.router.navigate(['/admin/home']);
      },
      (error) => {
        console.error('Error:', error);
      })
  }

  deleteMovie(id: any)
  {
    const data= { id : id}
    this.appService.deleteMovieAdmin(data).subscribe(
      (response: any) => {
        console.log("Movie successfully deleted", response);
        this.getMovies();
        this.router.navigate(['/admin/home']);
      },
      (error) => {
        console.error('Error:', error);
      })
  }
  scheduleMovie(movieID : any)
  {
    this.scheduleMovieId = movieID;
    this.openSchedulePopup();
  }
  addShowSchedule() {
    this.scheduleMovieForm.patchValue({
      movieId: this.scheduleMovieId,
      showTime: +this.scheduleMovieForm.value.showTime
    });
    const scheduleMovieData = this.scheduleMovieForm.value as { duration_minutes: number, showTime: number, movieId: number };
    console.log("Schedule Movie Data inside popup", scheduleMovieData);

    this.appService.scheduleMovieAdmin(scheduleMovieData).subscribe(
      (response: any) => {
        if(response[200])
        {
          console.log("Movie scheduled successfully", response);
        this.closeSchedulePopup();
        this.router.navigate(['/admin/home']);
        this.scheduleMovieForm.reset();
        }
        else if(response[400])
        {
          this.errorSchedulingMovie = true;
          this.errorMessageScheduled = "Cannot schedule the movie."
        }
        
      },
      (error) => {
        console.error('Error:', error);
      });
  }
  editMovieShow(showId: any, showTime: any,showDate: any, movieId: any, duration_minutes:any) 
  {
    this.isEditingShowTime = true;
    this.editedShowTime = showTime;
    this.editedShowId = showId;
    this.editedShowDate = showDate;
    this.editedMovieId = movieId;
    this.editedMovieDuration = duration_minutes;
  }
  
  saveEditedShowTime() {
    const editedShowTimeAsInt = this.getIntScheduleFromFormattedShowTime(this.editedShowTime);
    const data = {
      showId: this.editedShowId,
      showTime: editedShowTimeAsInt,
      showDate: this.editedShowDate,
      movieId: this.editMovieId,
      duration_minutes: this.editedMovieDuration
    } as { showId: number, showTime: number, showDate: string, movieId: number, duration_minutes: number };

    this.appService.updateShowTime(data).subscribe(
      (response: any) => {
        console.log("Show updated successfully", response);
        this.getShowsByMovie();
        this.isEditingShowTime = false;
        this.editedShowTime = null;
        this.editedShowId = null;
        this.editedShowDate = null;
        this.editedMovieId = null;
        this.editedMovieDuration = null;
      },
      (error) => {
        console.error('Error:', error);
      });
  }


  deleteMovieShow(showID : any)
  {
    const data = {showId : showID}
    this.appService.deleteShowTime(data).subscribe(
      (response: any) => {
        console.log("Show deleted successfully", response);
        this.getShowsByMovie();
      },
      (error) => {
        console.error('Error:', error);
      })
  }

  openEditPopup() {
    this.showEditPopup = true;
  }
  
  closeEditPopup() {
    this.showEditPopup = false;
  }
  openSchedulePopup() {
    this.showSchedulePopup = true;
  }
  
  closeSchedulePopup() {
    this.showSchedulePopup = false;
    this.resetForms();
  }
  closeErrorModal()
  {
    this.errorMessageScheduled = false;
    this.errorMessageScheduled = '';
  }

  getShowsByMovie() {
    const data = { movieID: this.editMovieId };
    this.appService.getShowBasedOnMovie(data).subscribe(
      (response: any) => {
        this.movieShowsScheduled = response[400];
        this.sortShowsByDateAndTime();
  
        // Update showTime values to formatted ones
        const formattedShows = this.movieShowsScheduled.map((show: any) => {
          return {
            ...show,
            showTimeFormatted: this.getFormattedShowTime(show.showTime)
          };
        });
  
        this.movieShowsScheduled = formattedShows;
  
        console.log("Shows based on Movie", this.movieShowsScheduled);
      },
      (error) => {
        console.error('Error:', error);
      });
  }
  
  
  
  getFormattedShowTime(showTime: number): string {
    switch (showTime) {
      case 10: return '10:00 AM';
      case 13: return '1:00 PM';
      case 16: return '4:00 PM';
      case 19: return '7:00 PM';
      case 22: return '10:00 PM';
      default: return '';
    }
  }
  resetForms() {
    this.scheduleMovieForm.reset();
  }

  getIntScheduleFromFormattedShowTime(formattedShowTime: string): number {
    switch (formattedShowTime) {
      case '10': return 10;
      case '13': return 13;
      case '16': return 16;
      case '19': return 19;
      case '22': return 22;
      default: return 0; 
    }
  }
  
  getIntFromFormattedShowTime(formattedShowTime: string): number {
    // Assuming the input is in the format 'h:mm AM/PM'
    if (!formattedShowTime) {
      // Handle the case where formattedShowTime is undefined or null
      return 0; // or any other default value
    }
  
    const parts = formattedShowTime.split(/:|\s/);
  
    if (parts.length < 3) {
      // Handle the case where the parts array doesn't have the expected length
      return 0; // or any other default value
    }
  
    const hour = parseInt(parts[0], 10);
    const minute = parseInt(parts[1], 10);
    const isPM = parts[2].toLowerCase() === 'pm';
  
    // Convert to 24-hour format
    return isPM ? (hour === 12 ? 12 : hour + 12) : (hour === 12 ? 0 : hour);
  }
  
  


  sortShowsByDateAndTime() {
    this.movieShowsScheduled.sort((a: any, b: any) => {
      // Sort by showDate
      const dateComparison = new Date(a.showDate).getTime() - new Date(b.showDate).getTime();
      if (dateComparison !== 0) {
        return dateComparison;
      }
  
      // If showDate is the same, sort by showTime
      return a.showTime - b.showTime; // Compare as numbers
    });
  }
  

  onShowDateChange(event: any) {
    const selectedDate = event?.target?.value;
    console.log("Selected Date is:",selectedDate);
    // Call the function to get available shows
    this.getAllAvailableShows(selectedDate);
  }
  
  getAllAvailableShows(showDate: any) {
    const data = { showDate: showDate };
    this.appService.adminGetShowsByDate(data).subscribe(
      (response: any) => {
        this.movieShowsAvailable = response[400];
        // this.sortShowsByDateAndTime();
  
        // Update available show times in the form
        const availableShowTimes = this.movieShowsAvailable.map((show: any) => show.showTime);
        this.updateAvailableShowTimes(availableShowTimes);
  
        console.log("Shows based on Movie", this.movieShowsAvailable);
      },
      (error) => {
        console.error('Error:', error);
      });
  }
  showTimeValidator(availableShowTimes: number[]) {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedShowTime = control.value;
      return availableShowTimes.includes(selectedShowTime) ? null : { invalidShowTime: true };
    };
  }
  
  updateAvailableShowTimes(availableShowTimes: number[]) {
    const showTimeControl = this.scheduleMovieForm.get('showTime');
    if (showTimeControl) {
      // Clear existing options
      showTimeControl.setValue(null);
      // Update available show times in the dropdown
      showTimeControl.setValidators([Validators.required, this.showTimeValidator(availableShowTimes)]);
    }
  }
  

}
