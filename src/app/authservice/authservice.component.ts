import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceComponent {
  private apiUrl = 'http://localhost:3200'; 

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const loginData = {
      email: email,
      password: password
    };

    return this.http.post(`${this.apiUrl}/getCustomer`, loginData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
