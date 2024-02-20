import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private sharedDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private ticketDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private customerDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private orderDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);


  constructor() {}

  // Method to set shared data
  setSharedData(data: any) {
    this.sharedDataSubject.next(data);
  }

  // Method to get shared data as an observable
  getSharedData(): Observable<any> {
    return this.sharedDataSubject.asObservable();
  }

  setBuyTicketSharedData(data: any) {
    this.ticketDataSubject.next(data);
  }

  // Method to get shared data as an observable
  getBuyTicketSharedData(): Observable<any> {
    return this.ticketDataSubject.asObservable();
  }

  setBookedMovieDetailsSharedData(data: any) {
    this.customerDataSubject.next(data);
  }

  // Method to get shared data as an observable
  getBookedMovieDetailsSharedData(): Observable<any> {
    return this.customerDataSubject.asObservable();
  }

  //Order confirmation
  setOrderDetailsSharedData(data: any) {
    this.orderDataSubject.next(data);
  }

  // Method to get shared data as an observable
  getOrderDetailsSharedData(): Observable<any> {
    return this.orderDataSubject.asObservable();
  }
}
