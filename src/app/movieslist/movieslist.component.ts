import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { DataSharingService } from '../data-sharing.service';
import { appApiServices } from '../services/app.services';

@Component({
  selector: 'app-movieslist',
  templateUrl: './movieslist.component.html',
  styleUrls: ['./movieslist.component.css']
})
export class MovieslistComponent implements OnInit {
  searchLogo = "../assets/img/searchIcon.png"
  filterLogo = "../assets/img/filterIcon.png"

  searchText: string = ""

  searchQuery: string = '';
  movieList: any = [];
  nowShowingList : any  =[]; 
  searchData: string = '';

 
  @Input() searchValueChanged: any;
  @Output() searchTextHome: EventEmitter<string> = new EventEmitter<string>();
  

// @Output() searchValueChanged: EventEmitter<string> = new EventEmitter<string>();
constructor(private dataSharingService: DataSharingService,  private appService: appApiServices) { }
activeCategory: 'nowPlaying' | 'upcoming' = 'nowPlaying'; // Default to 'nowPlaying'

ngOnInit(): void {
  this.appService.getMoviesList().subscribe(res => 
    {
    if (res) 
    {
      this.movieList = res;
      console.log("Response In MovieList", this.movieList);
    }
  });
  this.dataSharingService.getSharedData().subscribe((data) => {
    // Update the searchData property with the latest shared data
    this.searchData = data;
    console.log("In movie", this.searchData)
    // Perform filtering or other actions based on the search query
  });
}
setActiveCategory(category: 'nowPlaying' | 'upcoming') {
  this.activeCategory = category;
}

getNowShowingMovies() {

  var list = this.movieList.filter(
    (movie: any) => movie.playingNow === true);

  return this.movieList.filter((movie: any) => movie.playingNow === true);
}

getUpcomingMovies() {
  return this.movieList.filter((movie: any) => movie.playingNow === false);
}

updateFilter(data: any){
  console.log("data in movielist", data)
  this.searchTextHome = data;
  this.searchTextHome.emit(data);
} 

searchFilter(searchText: string) {
  // Your searchFilter logic here
  console.log("In moveilist", searchText)
}

changedSearchText(): void {
  // emit the change so the parent component can see it
  console.log("sear", this.searchText);
  this.dataSharingService.setSharedData(this.searchText);
}
}