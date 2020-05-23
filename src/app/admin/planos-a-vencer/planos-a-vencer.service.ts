import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ContractedPlanResponse} from '../lista-usuarios/model/contracted-plan-response';
import {environment} from '../../../environments/environment';
import * as SecureLS from 'secure-ls';
import {GroupResponse} from '../grupos-comparacao/model/group-response';

@Injectable({
  providedIn: 'root'
})
export class PlanosAVencerService {

  get localStorageCriptografada(): SecureLS {
    return this._localStorageCriptografada;
  }

  set localStorageCriptografada(value: SecureLS) {
    this._localStorageCriptografada = value;
  }

  private _localStorageCriptografada = new SecureLS();

  header = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getListaPlanosAExpirar(): Observable<ContractedPlanResponse[]> {
    return this.http.get<ContractedPlanResponse[]>(`${environment.apiUrl}/api/v1/admin/plan/plans-to-expire`, this.header);
  }

  getListaPlanosExpirados(): Observable<ContractedPlanResponse[]> {
    return this.http.get<ContractedPlanResponse[]>(`${environment.apiUrl}/api/v1/admin/plan/expired-plans`, this.header);
  }

  putPlan(plandId: number, dataPlanoAtualizado: string) {
    return this.http.patch<String>(`${environment.apiUrl}/api/v1/admin/plan/${plandId}/end-date/${dataPlanoAtualizado}`, this.header);
  }
}
