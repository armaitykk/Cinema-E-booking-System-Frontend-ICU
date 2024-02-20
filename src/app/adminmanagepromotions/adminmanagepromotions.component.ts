import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {appApiServices} from '../services/app.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminmanagepromotions',
  templateUrl: './adminmanagepromotions.component.html',
  styleUrls: ['./adminmanagepromotions.component.css']
})
export class AdminmanagepromotionsComponent implements OnInit {

  promosList : any;
  constructor(private appService: appApiServices,private router: Router) { }

  ngOnInit(): void {
    this.getAllPromotions();
  }

  getAllPromotions()
  {
    this.appService.getAllPromotions().subscribe(res => 
      {
      if (res) 
      {
        this.promosList = res;
        console.log("Response in admin", res);
      }
    });
  }
  deletePromotion(promoId : any)
  {
    const data= { promoId : promoId}
    this.appService.deletePromotion(data).subscribe(
      (response: any) => {
        console.log("Promotion successfully deleted", response);
        this.getAllPromotions();
        this.router.navigate(['/admin/home']);
      },
      (error) => {
        console.error('Error:', error);
      })
  }

  
}
