import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:5000'; // backend

  constructor(private http: HttpClient) {}

  //
  getWeatherAndPlaces(
    city: string,
    country: string,
    date: string
  ): Observable<any> {
    console.log('estou aqui');
    console.log(city);
    console.log(`${this.baseUrl}/app/weather/${city}/${country}/${date}`);
    return this.http.get(
      `${this.baseUrl}/app/weather/${city}/${country}/${date}`
    );
  }
}
