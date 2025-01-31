import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class userAPI {
  private baseUrl = 'http://localhost:5000'; // backend

  constructor(private http: HttpClient) {}

  registar(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/app/register`, {
      email,
      password,
    });
  }

  logIn(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/app/login`, {
      email,
      password,
    });
  }

  logOut(): Observable<any> {
    return this.http.post(`${this.baseUrl}/app/logout`, {});
  }
}
