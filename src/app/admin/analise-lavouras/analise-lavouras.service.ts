import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FarmingResponse} from './model/farming-response.model';
import {ProducerResponse} from './model/producer-response.model';
import {Observable} from 'rxjs/internal/Observable';
import {environment} from '../../../environments/environment';

@Injectable()
export class AnaliseLavourasService {

  header = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }



  buscaProdutor(): Observable<ProducerResponse[]> {
    return this.http.get<ProducerResponse[]>(`${environment.apiUrl}/api/v1/admin/analysis/producer`, this.header);
  }

  buscaIdLavouras(idProdutor: number): Observable<FarmingResponse[]> {
    return this.http.get<FarmingResponse[]>
    (`${environment.apiUrl}/api/v1/admin/analysis/farming/producer/?id=` + idProdutor,  this.header);
  }
}
