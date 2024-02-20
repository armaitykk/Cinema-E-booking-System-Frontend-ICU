import { Component, OnInit } from '@angular/core';
import { appApiServices } from '../services/app.services'; // Import your API service
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  imageSrc = '../assets/img/webLogo.png';
  loggedIn: any;
  userFirstName: string = '';
  showDropdown: boolean = false;

  constructor(private apiService: appApiServices,private router: Router) {}

  ngOnInit(): void {
    // Check if the user is logged in
    this.loggedIn = localStorage.isLoggedIn;
    this.userFirstName = localStorage.adminUserName;
  }
  isDropdownVisible = false;

  showDropdownOptions() {
   
    this.isDropdownVisible = !this.isDropdownVisible;
    console.log("Inside Dropdown", this.isDropdownVisible);
  }

  closeDropdown(event: Event) {
    if (event.target instanceof Element) {
      if (!event.target.classList.contains('dropbtn') && this.isDropdownVisible) {
        this.isDropdownVisible = false;
      }
    }
  }
  logout() {
    localStorage.removeItem('isLoggedIn'); // Clear the "isLoggedIn" key
    localStorage.removeItem('adminLoginStatus'); 
    localStorage.removeItem('adminUserName'); // Clear the "userName" key
    this.router.navigate(['/admin/login']);
  
  }
}
