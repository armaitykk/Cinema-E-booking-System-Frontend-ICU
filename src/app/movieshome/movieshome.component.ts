import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { DataSharingService } from '../data-sharing.service';
import { appApiServices } from '../services/app.services';

@Component({
  selector: 'app-movieshome',
  templateUrl: './movieshome.component.html',
  styleUrls: ['./movieshome.component.css']
})
export class MovieshomeComponent implements OnInit {

  searchLogo = "../assets/img/searchIcon.png";
  filterLogo = "../assets/img/filterIcon.png";

  searchText: string = "";
  searchData: string = '';
  movieList: any = [];
  filteredMovies: any[] = [];
  selectedCategories: string[] = [];
  categories: string[] = ['Action', 'Drama', 'Comedy', 'Sci-Fi', 'Mystery', 'Horror'];
  showFilterDropdown: boolean = false;
  noResultsFound: boolean = false;

  @Output() searchTextHome: EventEmitter<string> = new EventEmitter<string>();

  activeCategory: 'nowPlaying' | 'upcoming' = 'nowPlaying';

  constructor(private dataSharingService: DataSharingService, private appService: appApiServices, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.appService.getMoviesList().subscribe(res => {
      if (res) {
        this.movieList = res;
        this.updateMovieList();
      }
    });
  }

  setActiveCategory(category: 'nowPlaying' | 'upcoming') {
    this.activeCategory = category;
    this.updateMovieList();
  }

  changedSearchText() {
    this.searchTextHome.emit(this.searchText);
    this.updateMovieList();
  }

  changedFilterCategory() {
    this.updateMovieList();
  }

  searchValueChanged(event: any) {
    this.searchData = event.target.value;
    this.updateMovieList();
  }

  updateMovieList() {
    if (this.selectedCategories.length > 0) {
      this.filteredMovies = this.activeCategory === 'nowPlaying' ? this.getNowShowingMoviesFiltered() : this.getUpcomingMoviesFiltered();
    } else {
      this.filteredMovies = this.activeCategory === 'nowPlaying' ? this.getNowShowingMovies() : this.getUpcomingMovies();
    }

    this.noResultsFound = this.filteredMovies.length === 0;
  }

  getNowShowingMovies(): any[] {
    return this.movieList.filter((movie: any) => {
      return movie.movieAvailability === "CurrentlyRunning" && (this.searchText === '' || this.isTitleMatch(movie.movieTitle));
    });
  }

  getUpcomingMovies(): any[] {
    return this.movieList.filter((movie: any) => {
      return movie.movieAvailability === "ComingSoon" && (this.searchText === '' || this.isTitleMatch(movie.movieTitle));
    });
  }

  isTitleMatch(title: string): boolean {
    const searchLowerCase = this.searchText.toLowerCase();
    const titleLowerCase = title.toLowerCase();

    return titleLowerCase.includes(searchLowerCase);
  }

  toggleFilterDropdown(event: Event) {
    event.stopPropagation();
    this.showFilterDropdown = !this.showFilterDropdown;
  }

  applyFilters() {
    if (this.selectedCategories.length > 0) {
      this.filteredMovies = this.activeCategory === 'nowPlaying' ? this.getNowShowingMoviesFiltered() : this.getUpcomingMoviesFiltered();
      this.changedFilterCategory();
    } else {
      this.updateMovieList();
    }

    this.showFilterDropdown = false;
  }

  getNowShowingMoviesFiltered(): any[] {
    return this.movieList.filter((movie: any) => {
      return movie.movieAvailability === "CurrentlyRunning" && this.selectedCategories.includes(movie.movieCategory);
    });
  }

  getUpcomingMoviesFiltered(): any[] {
    return this.movieList.filter((movie: any) => {
      return movie.movieAvailability === "ComingSoon" && this.selectedCategories.includes(movie.movieCategory);
    });
  }
}
