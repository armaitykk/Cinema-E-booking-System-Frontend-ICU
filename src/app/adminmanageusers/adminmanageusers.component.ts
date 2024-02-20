import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { appApiServices } from '../services/app.services';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-adminmanageusers',
  templateUrl: './adminmanageusers.component.html',
  styleUrls: ['./adminmanageusers.component.css']
})
export class AdminmanageusersComponent implements OnInit {
  userData : any;
  adminData :any;
  formData : FormGroup;
  editUserStatusForm: any;
  showEditUserPopup : boolean = false;
  editUserID : any;
  userStatusChangeID : any;
  showActiveUserPopup : boolean = false;
  showInactiveUserPopup : boolean = false;


  constructor(private router: Router, private fb: FormBuilder, private http:HttpClient, private appService: appApiServices) { 
    this.formData = this.fb.group({
        userID: [''],
        email: [''],
        password: [''],
        userRole :['']
    });
  }

  ngOnInit(): void {
    this.getUsers();
    this.getAllAdmins();
  }
  getUsers()
  {
    this.http.get('http://localhost:3200/getAllcustomers').subscribe((response : any) =>{
      this.userData = response;
    });
  }

  getAllAdmins()
  {
    this.appService.getAllAdmins().subscribe(
      (response: any) => {
        console.log("Loaded admins successfully", response);
        this.adminData = response;
        // this.getUsers();
        // this.router.navigate(['/admin/home']);
      },
      (error) => {
        console.error('Error:', error);
      })
  }

  deleteAdmin(userID: any)
  {
    const data= { userID : userID}
    this.appService.deleteAdmin(data).subscribe(
      (response: any) => {
        console.log("Admin successfully deleted", response);
        this.getAllAdmins();
        this.router.navigate(['/admin/home']);
      },
      (error) => {
        console.error('Error:', error);
      })
  }
  
  deleteUser(userID: any)
  {
    const data= { userID : userID}
    this.appService.deleteCustomerAdmin(data).subscribe(
      (response: any) => {
        console.log("User successfully deleted", response);
        this.getUsers();
        this.router.navigate(['/admin/home']);
      },
      (error) => {
        console.error('Error:', error);
      })
  }
  openEditUserPopup(userID : any) 
  {
    this.editUserID = userID;
    console.log("to be edited user id is:", this.editUserID);
    // this.getEditingUserStatus();
  }
  getEditingUserStatus(userID : any)
  {
    this.editUserID = userID;
    const data = { userID : this.editUserID}
    this.appService.getCustomerByID(data).subscribe(
      (response: any) => {
       const editingCustomerData = response.customer;
       const editingUserStatus = editingCustomerData.customerStatusID;
        console.log("Data of user to be edited", editingCustomerData.customerStatusID);
        if(editingUserStatus === "Active")
        {
          this.showActiveUserPopup = true;
          this.userStatusChangeID = editingCustomerData.userID;
        }
        else if(editingUserStatus === "InActive")
        {
          this.showInactiveUserPopup = true;
          this.userStatusChangeID = editingCustomerData.userID;
        }
      },
      (error) => {
        console.error('Error:', error);
      })
  }
  suspendUserStatus()
  {
    const data= { userID : this.userStatusChangeID}
    this.appService.suspendCustomer(data).subscribe(
      (response: any) => {
        console.log("User successfully suspended", response);
        this.closeEditUserPopup();
        this.getUsers();
        this.router.navigate(['/admin/home']);
      },
      (error) => {
        console.error('Error:', error);
      })
  }
  activateUserStatus()
  {
    const data= { userID : this.userStatusChangeID}
    this.appService.activateCustomer(data).subscribe(
      (response: any) => {
        console.log("User successfully suspended", response);
        this.closeEditUserPopup();
        this.getUsers();
        this.router.navigate(['/admin/home']);
      },
      (error) => {
        console.error('Error:', error);
      })
  }
 
  
  closeEditUserPopup() {
    this.showInactiveUserPopup = false;
    this.showActiveUserPopup = false;
    this.showEditUserPopup = false;
  }


}
