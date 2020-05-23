import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable()
export class ProdutorService {

  header = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  lavourasAptas(lavouraEnviada: number[]) {
    return this.http.put<void>
    (`${environment.apiUrl}/api/v1/admin/analysis/farming/activate`, lavouraEnviada, this.header);
  }

  mudarParaNaoApta(lavouraEnviada: number[]) {
    return this.http.put<void>
    (`${environment.apiUrl}/api/v1/admin/analysis/farming/deactivate`, lavouraEnviada, this.header);
  }
}
