import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

// Custom validator function for password match and criteria
function passwordMatchValidator(control: FormGroup): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  // Check if passwords match
  if (password?.value !== confirmPassword?.value) {
    return { 'passwordMismatch': true };
  }

  // Check if password meets the criteria (at least 8 characters with one letter and one number)
  const pattern = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/;
  if (!pattern.test(password?.value)) {
    return { 'invalidPassword': true };
  }

  return null;
}

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  logoImg = '../assets/img/webLogo.png';
  signupForm: FormGroup;
  isResetSuccessful: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.signupForm = this.fb.group({
      password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$')]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validator: passwordMatchValidator
    });
  }

  ngOnInit(): void {
  }

  resetPassword() {
    const formData = this.signupForm.value;
    const userEmailID = localStorage.getItem('forgotUserEmailID');
    const updatedPwdData = {
      email: userEmailID,
      password: formData.password
    };
    if (this.signupForm.valid) {
      if (formData.password === formData.confirmPassword) {
        this.http.post('http://localhost:3200/changePassword', updatedPwdData).subscribe((response: any) => {
          console.log("Password Changed", response);
          this.router.navigate(['/login']);
          localStorage.removeItem('forgotUserEmailID');
        });
      } else {
        console.error('Passwords do not match');
        // Handle the case where passwords do not match
      }
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  clearErrors(controlName: string) {
    const control = this.signupForm.get(controlName);
    if (control) {
      control.setErrors(null);
    }
  }
}
