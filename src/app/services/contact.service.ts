import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactData {
  name: string;
  phone: string;
  service: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  // private apiUrl = 'http://localhost:5000/api/contact'; // For local testing
  private apiUrl = 'https://ak-backend-tqdj.onrender.com/api/contact'; // Live server

  constructor(private http: HttpClient) { }

  submitContact(data: ContactData): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
