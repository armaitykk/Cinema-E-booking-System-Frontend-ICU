import { Component, OnInit } from '@angular/core';
import { appApiServices } from '../services/app.services'; // Import your API service
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  imageSrc = '../assets/img/webLogo.png';
  loggedIn: any;
  userFirstName: string = '';
  showDropdown: boolean = false;

  constructor(private apiService: appApiServices,private router: Router) {}

  ngOnInit(): void {
    // Check if the user is logged in
    this.loggedIn = localStorage.isLoggedIn;
    this.userFirstName = localStorage.userFirstName;
    // this.apiService.checkUserLoggedIn().subscribe((result: any) => {
      
    //   if (this.loggedIn) {
    //     // If logged in, get the user's first name
    //     this.apiService.getUserInfo().subscribe((userInfo: any) => {
    //       this.userFirstName = userInfo.firstName;
    //     });
    //   }
    // });
  }
  // toggleDropdown() {
  //   this.showDropdown = !this.showDropdown;
  // }
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
    // Implement your logout logic here.
    // For example, you can clear the local storage, and then navigate to the login page.

    // Clear the session or perform any necessary cleanup, such as removing tokens, etc.
    // For example, you can use localStorage or a service to manage user authentication.

      const remeberMeMail = localStorage.getItem('rememberMeEmailID');
      localStorage.removeItem('isLoggedIn'); // Clear the "isLoggedIn" key
      localStorage.removeItem('userName'); // Clear the "userName" key
      localStorage.clear();
      if (remeberMeMail !== null) {
        localStorage.setItem('rememberMeEmailID', remeberMeMail);
      }
    // After clearing the session, navigate to the login page.
    this.router.navigate(['/login']);
  }
}
