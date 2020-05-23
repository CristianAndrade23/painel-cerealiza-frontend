import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ContractedPlanResponse} from './model/contracted-plan-response';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListaUsuariosService {

  header = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  listaUsuarios(): Observable<ContractedPlanResponse[]> {
    return this.http.get<ContractedPlanResponse[]>(`${environment.apiUrl}/api/v1/admin/plan`, this.header);
  }

  ativarPlano(plandId: number): Observable<boolean> {
  return this.http.put<boolean>(`${environment.apiUrl}/api/v1/admin/plan/${plandId}/activate`, this.header);
  }

  desativarPlano(plandId: number): Observable<boolean> {
   return this.http.put<boolean>(`${environment.apiUrl}/api/v1/admin/plan/${plandId}/deactivate`, this.header);
  }
}
