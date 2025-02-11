import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {LoginResponseType} from '../types/login-response.type';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  apiUrl = 'http://localhost:8090/auth';

  login(email: string, password: string): Observable<LoginResponseType> {
    const authHeader = `Basic ${btoa(`${email}:${password}`)}`;

    return this.httpClient.post<LoginResponseType>(this.apiUrl, {}, {
      headers: {
        Authorization: authHeader
      }
    }).pipe(
      tap((response: LoginResponseType) => {
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          this.router.navigate(['/dashboard/']);
        }
      })
    );
  }
}
