// auth.service.ts

import { Injectable } from '@angular/core';

const ADMIN_LOGIN_STATUS_KEY = 'adminLoginStatus';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated() {
    // Retrieve the login status from local storage
    return localStorage.getItem(ADMIN_LOGIN_STATUS_KEY) === 'true';
  }

  setAuthenticationStatus(status: boolean) {
    // Set the login status in local storage
    localStorage.setItem(ADMIN_LOGIN_STATUS_KEY, status.toString());
  }
}
