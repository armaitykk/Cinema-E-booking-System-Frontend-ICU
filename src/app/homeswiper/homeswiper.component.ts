import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IframeModalComponent } from '../iframe-modal/iframe-modal.component';
import { SwiperConfigInterface, SwiperPaginationInterface, SwiperNavigationInterface } from 'ngx-swiper-wrapper';
import { appApiServices } from '../services/app.services';

@Component({
  selector: 'app-homeswiper',
  templateUrl: './homeswiper.component.html',
  styleUrls: ['./homeswiper.component.css']
})
export class HomeswiperComponent implements OnInit {
  movieList: any = [];
  imageSrc1 = '../assets/img/Wish_Nov_23.jpg';

  // Define Swiper configuration options as variables
  slidesPerView = 1.5;
  spaceBetween = 20;
  delay = 2500;
  disableOnInteraction = false;
  paginationConfig: SwiperPaginationInterface = {
    el: '.swiper-pagination', // Pagination container
    clickable: true, // Enable pagination clickable
  };
  navigationConfig: SwiperNavigationInterface = {
    nextEl: '.swiper-button-next', // Next button selector
    prevEl: '.swiper-button-prev', // Previous button selector
  };

  // Define Swiper configuration as an object
  config!: SwiperConfigInterface;

  // Property to store the iframe URL
  iframeUrl: string | undefined;

  @Input() movies: any[] = [];

  constructor(private appService: appApiServices, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.appService.getMoviesList().subscribe(res => {
      if (res) {
        this.movieList = res;
        console.log("Response In Swipper", this.movieList);

        // Set the Swiper configuration based on data
        this.config = {
          slidesPerView: this.slidesPerView,
          spaceBetween: this.spaceBetween,
          // autoplay: {
          //   delay: this.delay,
          //   disableOnInteraction: this.disableOnInteraction,
          // },
          pagination: this.paginationConfig,
          navigation: this.navigationConfig,
        };
      }
    });
  }

  openIframeDialog(movie: any): void {
    // Set the iframe URL
    this.iframeUrl = movie.trailerLink; 
    // this.iframeUrl = "https://www.youtube.com/embed/pBk4NYhWNMM?si=5UU5E32b1N4p8grq"
    const dialogRef = this.dialog.open(IframeModalComponent, {
      width: '80%',
      position: { top: '5%' }, // Adjust top value as needed
      data: { iframeUrl: this.iframeUrl }, // Pass the iframe URL to the modal
    });
  }
}
