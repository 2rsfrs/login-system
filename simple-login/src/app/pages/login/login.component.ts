import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedModule } from '../shared/shared.module'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {
  email: string;
  password: string;

  constructor(private http: HttpClient, private router: Router) {
    this.email = '';
    this.password = '';
  }
  
  createLoginObject(): any {
    return {
      email: this.email,
      password: this.password,
    };
  }

  login(){
    const loginData = this.createLoginObject();
    this.http.post('http://localhost:3000/login', loginData).subscribe(
      (res:any) => {
        if (res === true){
          alert("Login Successful");
          this.router.navigateByUrl('/dashboard');
        } else alert("login cannot be done");
      },
      error => {
        alert("error logging in");
      });
  }

  signup(){
    const signupData = this.createLoginObject();
    this.http.post('http://localhost:3000/signup', signupData).subscribe(
      (res:any) => {
        if (res === true){
          alert("Signup Successful");
        } else alert("signup cannot be done");
      },
      error => {
        alert("email already exists");
      }
    );
  }
}