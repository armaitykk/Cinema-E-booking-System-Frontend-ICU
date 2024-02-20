import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../data-sharing.service';
import { appApiServices } from '../services/app.services';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {
  movieList: any = [];
  activeTab: string = 'Movies'; // Default active tab is 'Movies'

  constructor(private dataSharingService: DataSharingService, private appService: appApiServices) { }

  ngOnInit(): void {
    // You can fetch data or perform any other initialization here.
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
