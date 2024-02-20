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
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotpasswordComponent },
  { path: 'resetPassword', component: ResetpasswordComponent },
  { path: 'home', component: HomeComponent },
  { path: 'email-confirmation', component: EmailConfirmCodeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'viewmovieinfo/:title', component: ViewmovieinfoComponent },
  { path: 'buy-tickets/:title', component: BuyTicketsComponent },
  { path: 'checkout', component: CheckoutUiComponent },
  { path: 'order-summary', component: OrderSummaryComponent },
  { path: 'order-confirmation', component: OrderConfirmationComponent },
  { path: 'edit-profile', component: EditprofileComponent  },
  { path: 'booking-history', component: BookingHistoryComponent  },
  { path: 'admin/login', component: AdminLoginComponent  },
  { path: 'admin/addmovie', component: AdminaddmovieComponent  },
  { path: 'admin/adduser', component: AdminadduserComponent  },
  { path: 'admin/addpromotion', component: AdminaddpromotionComponent  },
  { path: 'admin/home', component: AdminhomeComponent ,canActivate: [AuthGuard] },
  { path: 'admin/manage/movies', component: AdminmanagemoviesComponent  },
  { path: 'admin/deletemovies', component: AdmindeletemovieComponent  },
  { path: 'admin/manage/users', component: AdminmanageusersComponent  },
  { path: 'admin/manage/promotions', component: AdminmanagepromotionsComponent  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
