import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IframeModalComponent } from '../iframe-modal/iframe-modal.component';
import { appApiServices } from '../services/app.services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewmovieinfo',
  templateUrl: './viewmovieinfo.component.html',
  styleUrls: ['./viewmovieinfo.component.css']
})
export class ViewmovieinfoComponent implements OnInit {

   // Property to store the iframe URL
   iframeUrl: string | undefined;
   movieList: any = [];
   movieTitle : string ='';
  
  constructor(private appService: appApiServices, private dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.movieTitle = this.route.snapshot.paramMap.get('title') ?? '';
    console.log("movieTitle", this.movieTitle);
    this.appService.viewMovieInfo(this.movieTitle).subscribe(res => {
      if (res) {
        this.movieList = res;
        console.log("Response In View Movie", this.movieList);
      }
    });
  }
  openIframeDialog(movie: any): void {
    // Set the iframe URL
    // this.iframeUrl = movie.trailerLink; 
    this.iframeUrl = this.movieList.trailerLink;
    const dialogRef = this.dialog.open(IframeModalComponent, {
      width: '80%',
      position: { top: '5%' }, // Adjust top value as needed
      data: { iframeUrl: this.iframeUrl }, // Pass the iframe URL to the modal
    });
  }

}
