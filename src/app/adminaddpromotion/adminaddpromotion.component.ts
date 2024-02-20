import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { appApiServices } from '../services/app.services';


@Component({
  selector: 'app-adminaddpromotion',
  templateUrl: './adminaddpromotion.component.html',
  styleUrls: ['./adminaddpromotion.component.css']
})
export class AdminaddpromotionComponent implements OnInit {
  addPromoForm: FormGroup;
  promoAlreadyExistsPop : boolean= false;
  loading : boolean= false;
  promoErrorMessage : any;


  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, private appService: appApiServices) {
    this.addPromoForm = this.fb.group({
      promoCode : [''],
      promoDescription : [''],
      startDate : [''],
      endDate : [''],
      discountApplied : ['']
    })
   }

  ngOnInit(): void {
  }
  addNewPromotion()
  {
    const finalFormData = this.addPromoForm.value;
    this.loading = true;
    this.appService.addNewPromotion(finalFormData).subscribe(
      (response: any) => {
        if(response[200])
        {
          this.loading = false;
          console.log("Added promo to DB", response);
        this.router.navigate(['/admin/home']);
        }
        else
        {
          this.loading = false;
          this.promoAlreadyExistsPop = true;
          this.promoErrorMessage = "Promotion already exists!"
        }
        
      },
      (error) => {
        console.error('Error:', error);
      })
  }
  closeErrorModal() {
    this.promoAlreadyExistsPop = false;
    this.router.navigate(['/admin/home']);
  }
}
