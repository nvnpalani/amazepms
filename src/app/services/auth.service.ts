import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private apiUrl = 'http://localhost:5000/api/admin'; // For local testing
  private apiUrl = 'https://ak-backend-tqdj.onrender.com/api/admin'; // Live server

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((response: any) => {
        if (response && response.success && response.token) {
          sessionStorage.setItem('isAdminLoggedIn', response.token);
        }
      })
    );
  }

  logout(): void {
    sessionStorage.removeItem('isAdminLoggedIn');
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('isAdminLoggedIn');
  }
}
