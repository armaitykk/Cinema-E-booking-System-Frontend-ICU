import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() searchValueChanged: any;
  @Output() searchTextHome: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  updateFilter(data: any){
    console.log("data", data)
    this.searchTextHome = data;
    this.searchTextHome.emit(data);
  } 

  searchFilter(searchText: string) {
    // Your searchFilter logic here
    console.log("In hone", searchText)
  }

}
