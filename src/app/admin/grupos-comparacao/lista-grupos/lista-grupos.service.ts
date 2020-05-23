import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GroupRequest} from '../model/group-request';
import {FarmingResponse} from '../../analise-lavouras/model/farming-response.model';
import {Observable} from 'rxjs/internal/Observable';
import {GroupResponse} from '../model/group-response';
import {environment} from '../../../../environments/environment';
import {FarmingGroupResponse} from '../model/farming-group-response';

@Injectable()
export class ListaGruposService {

  header = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };


  constructor(private http: HttpClient) { }

  getGruposComparacao(): Observable<GroupResponse[]> {
    return this.http.get<GroupResponse[]>(`${environment.apiUrl}/api/v1/admin/group`, this.header);
  }

  listaLavourasAptas(lavouraApta: GroupResponse): Observable<FarmingResponse[]> {
    return this.http.get<FarmingResponse[]>
    (`${environment.apiUrl}/api/v1/admin/analysis/farming?plantingYear=${lavouraApta.plantingYear}&harvestYear=${lavouraApta.harvestYear}&cultureType=${lavouraApta.tipoDeCultura}`
      , this.header);
  }

  editarGrupo(idGrupo: number, atualizaGrupo: GroupRequest): Observable<GroupResponse> {
    return this.http.put<GroupResponse>(`${environment.apiUrl}/api/v1/admin/group/${idGrupo}`, atualizaGrupo,
      this.header);
  }

  deletaGrupo(groupId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/v1/admin/group/${groupId}`, this.header);
  }

  inserirLavourasAptas(groupId: number, farmingId: number): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/api/v1/admin/group/${groupId}/farming/${farmingId}`, this.header);
  }


  deletaLavouraDoGrupo(groupId: number, farmingId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/v1/admin/group/${groupId}/farming/${farmingId}`, this.header);
  }

  listarTodasLavourasDoGrupo(groupId: number): Observable<FarmingGroupResponse[]> {
    return this.http.get<FarmingGroupResponse[]>(`${environment.apiUrl}/api/v1/admin/group/${groupId}`, this.header);
  }
}
