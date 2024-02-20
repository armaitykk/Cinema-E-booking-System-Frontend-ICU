import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable()
export class appApiServices {
    baseUrl = "http://localhost:3200/";
    // server.port = 3200
    constructor(private httpClient: HttpClient) { }
    // getmovieinfo(data:any): Observable<any> {
    //     const headers= new HttpHeaders().set('content-type', 'application/json;charset=utf-8').set('Access-Control-Allow-Origin', '*');
    //     return this.httpClient.post("http://localhost:4200/getmoviedetails",JSON.parse(data),{'headers':headers});
    // }

    addNewAdmin(formData: any): Observable<any> {
      const headers= new HttpHeaders().set('content-type', 'application/json;charset=utf-8').set('Access-Control-Allow-Origin', '*');
      return this.httpClient.post("http://localhost:3200/registerAdmin",formData, {'headers':headers});
  }

  getAllAdmins() :Observable<any> {
    const headers= new HttpHeaders().set('content-type', 'application/json;charset=utf-8').set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get("http://localhost:3200/getAllAdmins",{'headers':headers});
}

    deleteAdmin(userID: any): Observable<any> {
      const headers= new HttpHeaders().set('content-type', 'application/json;charset=utf-8').set('Access-Control-Allow-Origin', '*');
      return this.httpClient.post("http://localhost:3200/deleteAdmin",userID, {'headers':headers});
    }
      getCustomerByID(userID: any): Observable<any> {
        const headers= new HttpHeaders().set('content-type', 'application/json;charset=utf-8').set('Access-Control-Allow-Origin', '*');
        return this.httpClient.post("http://localhost:3200/getCustomerById",userID, {'headers':headers});
      } 
      suspendCustomer(userID: any): Observable<any> {
        const headers= new HttpHeaders().set('content-type', 'application/json;charset=utf-8').set('Access-Control-Allow-Origin', '*');
        return this.httpClient.post("http://localhost:3200/suspendCustomer",userID, {'headers':headers});
      } 
    activateCustomer(userID: any): Observable<any> {
      const headers= new HttpHeaders().set('content-type', 'application/json;charset=utf-8').set('Access-Control-Allow-Origin', '*');
      return this.httpClient.post("http://localhost:3200/activateCustomer",userID, {'headers':headers});
    } 
    getShowBasedOnMovie(movieId: any): Observable<any> {
      const headers= new HttpHeaders().set('content-type', 'application/json;charset=utf-8').set('Access-Control-Allow-Origin', '*');
      return this.httpClient.post("http://localhost:3200/getShowsByMovieID",movieId, {'headers':headers});
    } 

    getMoviesList(): Observable<any> {
        const headers= new HttpHeaders().set('content-type', 'application/json;charset=utf-8').set('Access-Control-Allow-Origin', '*');
        return this.httpClient.get("http://localhost:3200/getallmovies",{'headers':headers});
    }

    //Signup Form

    sendCustomerUserData(formData: any): Observable<any> {
        const headers = new HttpHeaders()
          .set('content-type', 'application/json;charset=utf-8')
          .set('Access-Control-Allow-Methods', 'OPTIONS,POST,GET')
          .set('Access-Control-Allow-Origin', '*');
      
        // Modify the post request to send formData
        return this.httpClient.post("http://localhost:3200/registerCustomer", formData, { 'headers':headers });
      }
      
      // Add a method to save address
    saveAddress(addressData: any): Observable<any> {
        // Prepare the HTTP headers for the request
        const headers = new HttpHeaders()
        .set('content-type', 'application/json;charset=utf-8')
        .set('Access-Control-Allow-Methods', 'OPTIONS,POST,GET')
        .set('Access-Control-Allow-Origin', '*');

        // Send a POST request to save the address
        return this.httpClient.post("http://localhost:3200/saveAddress", addressData, { 'headers':headers });
    }

    // Add a method to save payment card information
    addPaymentCard(cardData: any): Observable<any> {
        const headers = new HttpHeaders()
        .set('content-type', 'application/json;charset=utf-8')
        .set('Access-Control-Allow-Methods', 'OPTIONS,POST,GET')
        .set('Access-Control-Allow-Origin', '*');

        // Send a POST request to add the payment card
        return this.httpClient.post("http://localhost:3200/addCard", cardData, { 'headers':headers });
    }

//Forgot Password
forgotPasswordData(userEmail: any): Observable<any> {
  const headers = new HttpHeaders()
    .set('content-type', 'application/json;charset=utf-8')
    .set('Access-Control-Allow-Methods', 'OPTIONS,POST,GET')
    .set('Access-Control-Allow-Origin', '*');

  // Modify the post request to send formData
  return this.httpClient.post("http://localhost:3200/forgetPassword", userEmail, { 'headers':headers });
}
//ResetPassword

resetPassword(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders()
        .set('content-type', 'application/json;charset=utf-8')
        .set('Access-Control-Allow-Methods', 'OPTIONS,POST,GET')
        .set('Access-Control-Allow-Origin', '*');
        const data = { email, password };
        return this.httpClient.post("http://localhost:3200/addCard", data);
  }

  viewMovieInfo (movieTitle : string): Observable<any>
  {
    const headers = new HttpHeaders()
        .set('content-type', 'application/json;charset=utf-8')
        .set('Access-Control-Allow-Methods', 'OPTIONS,POST,GET')
        .set('Access-Control-Allow-Origin', '*');
        const data = { movieTitle };
        return this.httpClient.post("http://localhost:3200/getmoviedetails", data, { 'headers': headers });
  }

  addMovieAdmin(formData: any): Observable<any>
  {
    const headers = new HttpHeaders()
        .set('content-type', 'application/json;charset=utf-8')
        .set('Access-Control-Allow-Methods', 'OPTIONS,POST,GET')
        .set('Access-Control-Allow-Origin', '*');
        return this.httpClient.post("http://localhost:3200/addmovie", formData, { 'headers': headers });
  }
  scheduleMovieAdmin(formData: any): Observable<any>
  {
    const headers = new HttpHeaders()
        .set('content-type', 'application/json;charset=utf-8')
        .set('Access-Control-Allow-Methods', 'OPTIONS,POST,GET')
        .set('Access-Control-Allow-Origin', '*');
        return this.httpClient.post("http://localhost:3200/addShow", formData, { 'headers': headers });
  }
  editMovieAdmin(formData: any) : Observable<any>
  {
    const headers = new HttpHeaders()
        .set('content-type', 'application/json;charset=utf-8')
        .set('Access-Control-Allow-Methods', 'OPTIONS,POST,GET')
        .set('Access-Control-Allow-Origin', '*');
        return this.httpClient.post("http://localhost:3200/updatemovie", formData, { 'headers': headers });
  }
  getMovieInfo (movieTitle : string): Observable<any>
  {
    const headers = new HttpHeaders()
        .set('content-type', 'application/json;charset=utf-8')
        .set('Access-Control-Allow-Methods', 'OPTIONS,POST,GET')
        .set('Access-Control-Allow-Origin', '*');
        const data = { movieTitle };
        return this.httpClient.post("http://localhost:3200/getmoviedetails", data, { 'headers': headers });
  }
  deleteMovieAdmin(userID: any): Observable<any>
  {
    const headers = new HttpHeaders()
        .set('content-type', 'application/json;charset=utf-8')
        .set('Access-Control-Allow-Methods', 'OPTIONS,POST,GET')
        .set('Access-Control-Allow-Origin', '*');
        return this.httpClient.post("http://localhost:3200/deletemovie", userID, { 'headers': headers });
  }

  deleteCustomerAdmin(userID: any): Observable<any>
  {
    const headers = new HttpHeaders()
        .set('content-type', 'application/json;charset=utf-8')
        .set('Access-Control-Allow-Methods', 'OPTIONS,POST,GET')
        .set('Access-Control-Allow-Origin', '*');
        return this.httpClient.post("http://localhost:3200/deleteCustomer", userID, { 'headers': headers });
  }
  adminGetShowsByDate(showDate: any): Observable<any>
  {
    const headers = new HttpHeaders()
        .set('content-type', 'application/json;charset=utf-8')
        .set('Access-Control-Allow-Methods', 'OPTIONS,POST,GET')
        .set('Access-Control-Allow-Origin', '*');
        return this.httpClient.post("http://localhost:3200/getAvailableShows", showDate, { 'headers': headers });
  }
  customerGetShowsByData(data : any): Observable<any>
  {
    const headers = new HttpHeaders()
        .set('content-type', 'application/json;charset=utf-8')
        .set('Access-Control-Allow-Methods', 'OPTIONS,POST,GET')
        .set('Access-Control-Allow-Origin', '*');
        return this.httpClient.post("http://localhost:3200/getShowsByDate", data, { 'headers': headers });
  }
  getShowIDByShowDateandTime(showDate: any, showTime: any): Observable<any>
  {
    const data = {showDate:showDate, showTime : showTime }
    const headers = new HttpHeaders()
        .set('content-type', 'application/json;charset=utf-8')
        .set('Access-Control-Allow-Methods', 'OPTIONS,POST,GET')
        .set('Access-Control-Allow-Origin', '*');
        return this.httpClient.post("http://localhost:3200/getShow", data, { 'headers': headers });
  }
  updateShowTime(showId: any): Observable<any>
  {
    const headers = new HttpHeaders()
        .set('content-type', 'application/json;charset=utf-8')
        .set('Access-Control-Allow-Methods', 'OPTIONS,POST,GET')
        .set('Access-Control-Allow-Origin', '*');
        return this.httpClient.post("http://localhost:3200/updateShow", showId, { 'headers': headers });
  }
  deleteShowTime(showId: any): Observable<any>
  {
    const headers = new HttpHeaders()
        .set('content-type', 'application/json;charset=utf-8')
        .set('Access-Control-Allow-Methods', 'OPTIONS,POST,GET')
        .set('Access-Control-Allow-Origin', '*');
        return this.httpClient.post("http://localhost:3200/deleteShow", showId, { 'headers': headers });
  }
  getAllPromotions(): Observable<any>
  {
    return this.httpClient.get("http://localhost:3200/getAllPromos");
  }
  confirmBookingOrder(formData: any): Observable<any>
  {
    const headers = new HttpHeaders()
        .set('content-type', 'application/json;charset=utf-8')
        .set('Access-Control-Allow-Methods', 'OPTIONS,POST,GET')
        .set('Access-Control-Allow-Origin', '*');
        return this.httpClient.post("http://localhost:3200/addBooking", formData, { 'headers': headers });
  } 
  getBookingByCustomerID(customerID: any): Observable<any>
  {
    const headers = new HttpHeaders()
        .set('content-type', 'application/json;charset=utf-8')
        .set('Access-Control-Allow-Methods', 'OPTIONS,POST,GET')
        .set('Access-Control-Allow-Origin', '*');
        return this.httpClient.post("http://localhost:3200/getCustomerBookings", customerID, { 'headers': headers });
  } 

  getReservedSeats(showID :any): Observable<any>
  {
    const headers = new HttpHeaders()
        .set('content-type', 'application/json;charset=utf-8')
        .set('Access-Control-Allow-Methods', 'OPTIONS,POST,GET')
        .set('Access-Control-Allow-Origin', '*');
        return this.httpClient.post("http://localhost:3200/getReservedSeats", showID, { 'headers': headers });
  } 

  addNewPromotion(formData: any): Observable<any>
  {
    const headers = new HttpHeaders()
        .set('content-type', 'application/json;charset=utf-8')
        .set('Access-Control-Allow-Methods', 'OPTIONS,POST,GET')
        .set('Access-Control-Allow-Origin', '*');
        return this.httpClient.post("http://localhost:3200/addPromo", formData, { 'headers': headers });
  }

  deletePromotion(promoId: any): Observable<any>
  {
    const headers = new HttpHeaders()
        .set('content-type', 'application/json;charset=utf-8')
        .set('Access-Control-Allow-Methods', 'OPTIONS,POST,GET')
        .set('Access-Control-Allow-Origin', '*');
        return this.httpClient.post("http://localhost:3200/deletePromo", promoId, { 'headers': headers });
  }


  
  // Add a method to check if the user is logged in
  checkUserLoggedIn(): Observable<any> {
    const headers = new HttpHeaders().set('content-type', 'application/json;charset=utf-8').set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get("http://localhost:3200/checkUserLoggedIn", { 'headers': headers });
  }

  // Add a method to get user information
  getUserInfo(): Observable<any> {
    const headers = new HttpHeaders().set('content-type', 'application/json;charset=utf-8').set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get("http://localhost:3200/getUserInfo", { 'headers': headers });
  }

  // Add a method for user login
  userLogin(username: string, password: string): Observable<any> {
    // Implement your login logic here, e.g., send username and password to the server
    const loginData = { username: username, password: password };
    const headers = new HttpHeaders().set('content-type', 'application/json;charset=utf-8').set('Access-Control-Allow-Origin', '*');
    return this.httpClient.post("http://localhost:3200/userLogin", loginData, { 'headers': headers });
  }

  // Add a method for user logout
  userLogout(): Observable<any> {
    // Implement your logout logic here
    const headers = new HttpHeaders().set('content-type', 'application/json;charset=utf-8').set('Access-Control-Allow-Origin', '*');
    return this.httpClient.post("http://localhost:3200/userLogout", null, { 'headers': headers });
  }

  

}