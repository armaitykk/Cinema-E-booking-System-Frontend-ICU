import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { appApiServices } from '../services/app.services';

@Component({
  selector: 'app-adminaddmovie',
  templateUrl: './adminaddmovie.component.html',
  styleUrls: ['./adminaddmovie.component.css']
})
export class AdminaddmovieComponent implements OnInit {
  logoImg = '../assets/img/webLogo.png';
  movieForm: FormGroup;
  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, private appService: appApiServices) {
    this.movieForm = this.fb.group({
      movieTitle: [''],
      releaseDate: [''],
      synopsis: [''],
      reviews: [''],
      rating: [''],
      posterSrc: [''],
      bannerSrc: [''],
      movieDirector: [''],
      movieCategory: [''],
      movieAvailability : [''],
      trailerLink: [''],
      movieCast: [''],
      movieProducer: [''],
      movieCertificationCode: [''],
      language: ['']
    });
   }

  ngOnInit(): void {
  }
  toggleCheckbox(value: number) {
    const movieAvailabilityControl = this.movieForm.get('movieAvailability');
    
    if (movieAvailabilityControl) {
      movieAvailabilityControl.setValue(value);
    }
  }
  
  addMovieToDatabase()
  {
    const finalFormData = this.movieForm.value;
    console.log("Isplaying response", this.movieForm.value);
    console.log("Entered details are",finalFormData);
    this.appService.addMovieAdmin(finalFormData).subscribe(
      (response: any) => {
        console.log("Added movie to DB", response);
        this.router.navigate(['/admin/home']);
      },
      (error) => {
        console.error('Error:', error);
      })
    }
}
