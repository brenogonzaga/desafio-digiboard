import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, Signup } from '../interfaces/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:3000/auth';
  constructor(private httpClient: HttpClient) {}

  login(data: Login): Observable<HttpResponse<any>> {
    return this.httpClient.post(`${this.url}/login`, data, {
      observe: 'response',
    });
  }

  signup(data: Signup): Observable<HttpResponse<any>> {
    return this.httpClient.post(`${this.url}/signup`, data, {
      observe: 'response',
    });
  }

  refreshToken(): Observable<HttpResponse<any>> {
    return this.httpClient.post(`${this.url}/refresh`, null, {
      observe: 'response',
    });
  }
}
