import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  username = '';
  password = '';
  message = '';
  messageType: 'success' | 'error' | '' = '';

  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Check if login cookie exists and pre-fill form
    this.http.get<any>(`${this.apiUrl}/check-cookie`, { withCredentials: true }).subscribe({
      next: (data) => {
        if (data.loggedIn) {
          this.username = data.username;
          this.password = data.password;
          this.message = 'Welcome back! Your login info was loaded from cookie.';
          this.messageType = 'success';
        }
      },
      error: () => { }
    });
  }

  onLogin(): void {
    this.http.post<any>(`${this.apiUrl}/login`, {
      username: this.username,
      password: this.password
    }, { withCredentials: true }).subscribe({
      next: (data) => {
        if (data.success) {
          this.message = 'Login successful! Cookie saved.';
          this.messageType = 'success';
        } else {
          this.message = data.message;
          this.messageType = 'error';
        }
      },
      error: (err) => {
        this.message = 'Server error: ' + err.message;
        this.messageType = 'error';
      }
    });
  }
}
