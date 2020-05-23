import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {GroupResponse} from './model/group-response';
import {environment} from '../../../environments/environment';
import {GroupRequest} from './model/group-request';
import {GroupCreated} from './model/group-created';

@Injectable()
export class GruposComparacaoService {

  header = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  listarGrupos(): Observable<GroupResponse[]> {
    return this.http.get<GroupResponse[]>(`${environment.apiUrl}/api/v1/admin/group`, this.header);
  }

  criarGrupos(novoGrupo: GroupRequest): Observable<GroupCreated> {
    return this.http.post<GroupCreated>(`${environment.apiUrl}/api/v1/admin/group`, novoGrupo,
      this.header);
  }
}
