import { Component, Input, OnInit } from '@angular/core';
import { DataSharingService } from '../data-sharing.service';
import {appApiServices} from '../services/app.services'

@Component({
  selector: 'app-nowshowinglist',
  templateUrl: './nowshowinglist.component.html',
  styleUrls: ['./nowshowinglist.component.css']
})
export class NowshowinglistComponent implements OnInit {
  img1 = '../assets/img/jawan_now.jpg'
  img2 = '../assets/img/barbie_now.jpg'
  movieList: any = [];
  searchData: string = '';

  @Input() searchValueChanged: any;
  searchNew: string = "";

   @Input() movies: any[] = [];


  movieImages = [
    '../assets/img/jawan_now.jpg',
    '../assets/img/jawan_now.jpg',
    '../assets/img/jawan_now.jpg',
    '../assets/img/jawan_now.jpg',
    '../assets/img/jawan_now.jpg',
  ]
  constructor(private dataSharingService: DataSharingService, private appService: appApiServices) { }

  ngOnInit(): void {
    this.appService.getMoviesList().subscribe(res => 
      {
      if (res) 
      {
        this.movieList = res;
        console.log("Response", this.movieList);
      }
    });
    this.dataSharingService.getSharedData().subscribe((data) => {
      // Update the searchData property with the latest shared data
      this.searchData = data;
      console.log("In now", this.searchData)
      // Perform filtering or other actions based on the search query
    });
    
  }



  searchFilter(data: any){
    console.log("data in movielist", data)
    this.searchNew = data;
  } 
}
