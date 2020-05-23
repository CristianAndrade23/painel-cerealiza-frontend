import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {LoginAdminRequest} from './model/login-admin-request';
import {UserResponse} from './model/user-response';
import {TokenResponse} from '../token-response';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import * as SecureLS from 'secure-ls';


@Injectable({
  providedIn: 'root'
})
export class LoginAdminService {

  localStorageCriptografada = new SecureLS();

  constructor(private http: HttpClient, private router: Router) { }

  signin(loginRequest: LoginAdminRequest): Observable<TokenResponse> {
    return this.http.post(`${environment.apiUrl}/api/v1/authentication/signin`, loginRequest,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  decrypt(token: string): Observable<UserResponse> {
    return this.http.get(`${environment.apiUrl}/api/v1/authentication/decrypt`,
      {headers: new HttpHeaders().set('Authorization', token)});
  }

  validate(token: string) {
    return this.http.get(`${environment.apiUrl}/api/v1/authentication/validate`,
      {headers: new HttpHeaders().set('Authorization', token)});
  }

  isLoggedIn() {
    return this.getAccessToken() !== null;
  }

  getAccessToken() {
    return this.localStorageCriptografada.get('tk');
  }

  logout() {
    this.localStorageCriptografada.clear();
    this.router.navigate(['/auth/admin']);
  }}
