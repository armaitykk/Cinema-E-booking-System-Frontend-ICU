import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { appApiServices } from '../services/app.services';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-adminadduser',
  templateUrl: './adminadduser.component.html',
  styleUrls: ['./adminadduser.component.css']
})
export class AdminadduserComponent implements OnInit {
  newAdminForm : FormGroup;
  constructor(private router: Router, private fb: FormBuilder, private http:HttpClient, private appService: appApiServices) { 
    this.newAdminForm = this.fb.group({
        userID: null,
        email: [''],
        password: [''],
        userRole :null
    });
  }
  ngOnInit(): void {
  }
  addNewAdmin()
  {
    const addAdminFormData = this.newAdminForm.value;
    this.appService.addNewAdmin(addAdminFormData).subscribe(
      (response: any) => {
        console.log("Added admin to DB", response);
        this.router.navigate(['/admin/home']);
      },
      (error) => {
        console.error('Error:', error);
      })
    }
  
}
