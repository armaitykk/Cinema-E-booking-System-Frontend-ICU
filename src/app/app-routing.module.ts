import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent} from './signup/signup.component';
import { BuyTicketsComponent } from './buy-tickets/buy-tickets.component';
import { CheckoutUiComponent } from './checkout-ui/checkout-ui.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminaddmovieComponent } from './adminaddmovie/adminaddmovie.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { AdminmanagemoviesComponent } from './adminmanagemovies/adminmanagemovies.component';
import { AdmindeletemovieComponent } from './admindeletemovie/admindeletemovie.component';
import { AdminmanageusersComponent } from './adminmanageusers/adminmanageusers.component';
import { AdminmanagepromotionsComponent } from './adminmanagepromotions/adminmanagepromotions.component';
import { AdminadduserComponent } from './adminadduser/adminadduser.component';
import { AdminaddpromotionComponent } from './adminaddpromotion/adminaddpromotion.component';
import { ViewmovieinfoComponent } from './viewmovieinfo/viewmovieinfo.component';
import {EmailConfirmCodeComponent} from './email-confirm-code/email-confirm-code.component';
import {ForgotpasswordComponent} from './forgotpassword/forgotpassword.component';
import {ResetpasswordComponent} from './resetpassword/resetpassword.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { AuthGuard } from './auth.guard';




const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, //can view
  { path: 'login', component: LoginComponent }, //can view
  { path: 'forgot-password', component: ForgotpasswordComponent }, //can view
  { path: 'resetPassword', component: ResetpasswordComponent }, //can view
  { path: 'home', component: HomeComponent }, //can view
  { path: 'email-confirmation', component: EmailConfirmCodeComponent }, //can view
  { path: 'signup', component: SignupComponent }, //can view
  { path: 'viewmovieinfo/:title', component: ViewmovieinfoComponent },
  { path: 'buy-tickets/:title', component: BuyTicketsComponent },
  { path: 'checkout', component: CheckoutUiComponent }, //can view
  { path: 'order-summary', component: OrderSummaryComponent }, //can view
  { path: 'order-confirmation', component: OrderConfirmationComponent }, //can view
  { path: 'edit-profile', component: EditprofileComponent  }, //can view
  { path: 'booking-history', component: BookingHistoryComponent  }, //can view
  { path: 'admin/login', component: AdminLoginComponent  }, //can view
  { path: 'admin/addmovie', component: AdminaddmovieComponent  }, //can view
  { path: 'admin/adduser', component: AdminadduserComponent  }, //can view
  { path: 'admin/addpromotion', component: AdminaddpromotionComponent  }, //can view
  { path: 'admin/home', component: AdminhomeComponent ,/*canActivate: [AuthGuard]*/ }, //can view, take out ",canActivate: [AuthGuard]"
  { path: 'admin/manage/movies', component: AdminmanagemoviesComponent  }, //can view
  { path: 'admin/deletemovies', component: AdmindeletemovieComponent  }, //can view (just shows "admindeletemovie works!")
  { path: 'admin/manage/users', component: AdminmanageusersComponent  }, //can view
  { path: 'admin/manage/promotions', component: AdminmanagepromotionsComponent  }, //can view
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
