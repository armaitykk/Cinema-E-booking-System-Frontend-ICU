import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeswiperComponent } from './homeswiper/homeswiper.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { MovieslistComponent } from './movieslist/movieslist.component';
import { NowshowinglistComponent } from './nowshowinglist/nowshowinglist.component';
import { UpcominglistComponent } from './upcominglist/upcominglist.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { DataSharingService } from './data-sharing.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import {appApiServices} from './services/app.services';
import { IframeModalComponent } from './iframe-modal/iframe-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { BuyTicketsComponent } from './buy-tickets/buy-tickets.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { CheckoutUiComponent } from './checkout-ui/checkout-ui.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
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
import { EmailConfirmCodeComponent } from './email-confirm-code/email-confirm-code.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import {MovieshomeComponent} from './movieshome/movieshome.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { BookingHistoryComponent } from './booking-history/booking-history.component'; // Add this line for MatInputModule



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    HomeswiperComponent,
    MovieslistComponent,
    NowshowinglistComponent,
    UpcominglistComponent,
    LoginComponent,
    SignupComponent,
    IframeModalComponent,
    BuyTicketsComponent,
    OrderSummaryComponent,
    CheckoutUiComponent,
    OrderConfirmationComponent,
    EditprofileComponent,
    AdminLoginComponent,
    AdminaddmovieComponent,
    AdminhomeComponent,
    AdminmanagemoviesComponent,
    AdmindeletemovieComponent,
    AdminmanageusersComponent,
    AdminmanagepromotionsComponent,
    AdminadduserComponent,
    AdminaddpromotionComponent,
    ViewmovieinfoComponent,
    EmailConfirmCodeComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    MovieshomeComponent,
    BookingHistoryComponent

  ],
  imports: [
    BrowserModule,
    SwiperModule,
    FormsModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule, // Add this line for MatInputModule
  
  ],
  providers: [DataSharingService,  appApiServices, DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [IframeModalComponent], 
})
export class AppModule { }
