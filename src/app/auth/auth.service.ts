import {throwError as observableThrowError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {LoginContract} from './login/login-contract';
import {Response} from '@angular/http';
import {isNullOrUndefined} from 'util';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenResponse} from './login/token-response';
import {environment} from '../../environments/environment';
import {LoginObj} from './login/login-obj';
import * as SecureLS from 'secure-ls';
import {AcessLevelEnum} from './acess-level-enum';


@Injectable()
export class AuthService {

  localStorageCriptografada = new SecureLS();

  constructor(private http: HttpClient, private router: Router) {
  }

  login(loginContract: LoginContract) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<TokenResponse>(environment.apiUrl + '/api/v1/authentication/signin', loginContract, { headers });
  }

  getAuthenticatedUserInformation(token: string) {
    const headers = new HttpHeaders({'Authorization': token});
      return this.http.get<LoginObj>(environment.apiUrl + '/api/v1/authentication/decrypt', { headers}).pipe(
        catchError((error: Response) => observableThrowError(error.json())), );
  }

  async isTokenValid() {
    const headers = new HttpHeaders({'Authorization': this.localStorageCriptografada.get('token')});
    return this.http.get(environment.apiUrl + '/api/v1/authentication/validate', { headers}).pipe(
      catchError((error: Response) => {
        if (isNullOrUndefined(error.ok)) {
          return observableThrowError(error);
        } else {
          return observableThrowError(error.json());
        }
      })).toPromise();
  }

  isLoggedIn() {
    return this.getAccessToken() !== null;
  }

  getAccessToken() {
    return this.localStorageCriptografada.get('token');
  }

  logout() {
    this.localStorageCriptografada.clear();
    this.localStorageCriptografada.set('goTo', '/auth');
    this.router.navigate(['/auth']);
  }
}

