import { environment } from '../../../environments/environment';
import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { RecoverPassObj } from './recover-pass-obj';


@Injectable()
export class RecoverPassService {

  constructor(private http: HttpClient) {
  }

  resetPass(recoverPassObj: RecoverPassObj ) {
    return this.http.put(`${environment.apiUrl}/api/v1/user/forget-password`, recoverPassObj,
    {headers: new HttpHeaders().set('Content-Type', 'application/json'), responseType: 'text'});

  }
}
