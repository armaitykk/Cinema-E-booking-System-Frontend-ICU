import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})


export class AdminLoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm; // Reference to the form

  logoImg = '../assets/img/webLogo.png';
  username: string = '';
  password: string = '';
  errorMessage : string = '';
  isLoginSuccessful: boolean = false;
  isLoginUnsuccessful: boolean = false;
  

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient,private authService: AuthService) {}

  login() {
    this.isLoginSuccessful = false;
    this.isLoginUnsuccessful = false;
    const cred = {
      "email": this.username,
      "password": this.password,        
    };

    this.http.post('http://localhost:3200/getAdmin', cred).subscribe(
      (response: any) => {
        if (response) {
          this.isLoginSuccessful = true;

          localStorage.setItem('adminLoginStatus', 'true');
          const adminStatLogin = localStorage.getItem('adminLoginStatus');
          this.authService.setAuthenticationStatus(true);
          console.log("Success",adminStatLogin );
          setTimeout(() => {
            this.router.navigate(['admin/home']);
          }, 3000);
          
          localStorage.setItem('adminUserName', response.userRole);
        } 
        else {
          // Clear the form fields
          this.username = '';
          this.password = '';
          this.isLoginUnsuccessful = true;
          this.authService.setAuthenticationStatus(false);
          localStorage.setItem('adminLoginStatus', 'false');
          const adminStatLogin = localStorage.getItem('adminLoginStatus');
          console.log("Error",adminStatLogin );
          console.log("Error",this.isLoginUnsuccessful )
  

          // Reset the form controls' states
          this.loginForm.resetForm();
          this.router.navigate(['/admin/login']);
        }
      },
      (error) => {
        this.isLoginUnsuccessful = true;
        console.log("Error",this.isLoginUnsuccessful );
        this.authService.setAuthenticationStatus(false);
        this.username = '';
        this.password = '';
        this.loginForm.resetForm();
        this.router.navigate(['/admin/login']);
        this.errorMessage = 'Error! Wrong credentials. Please try again';
        console.error('Error validating credentials:', error);
        // Handle the error as needed, e.g., show an error message.
      }
    );
  }
  closeConfirmationModal() {
    this.isLoginSuccessful = false; // Close the success modal
    // Add any additional logic needed here.
    this.router.navigate(['admin/home']); // Redirect to the home page
  }
  
  closeErrorModal() {
    this.isLoginUnsuccessful = false; // Close the error modal
    // Add any additional logic needed here.
    this.router.navigate(['admin/login']); // Redirect to the login page
  }
}

