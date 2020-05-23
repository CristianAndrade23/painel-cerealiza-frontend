import {async, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { GruposComparacaoService } from './grupos-comparacao.service';
import {HttpClient, HttpHandler} from '@angular/common/http';


describe('GruposComparacaoService', () => {
  beforeEach(async (() => TestBed.configureTestingModule({
      providers: [
        HttpClient,
        GruposComparacaoService,
        HttpHandler,
        HttpTestingController,
        RouterTestingModule,
      ],
      imports: [
        HttpClientTestingModule
      ]
    }
  )));




  it('shoudld create', async ( () => {
    const service: GruposComparacaoService = TestBed.get(GruposComparacaoService);
    expect(service).toBeTruthy();
  }));
//

  // it('listarGrupos', async ( () => {
  //   const service: GruposComparacaoService = TestBed.get(GruposComparacaoService);
  //   expect(service.listarGrupos).toBeDefined('<Observable<GroupResponse[]>>');
  // }));
  //
  //
  //
  //
  // it('criarGrupos', async ( () => {
  //   const service: GruposComparacaoService = TestBed.get(GruposComparacaoService);
  //   expect(service.criarGrupos).toBeDefined('<Observable<GroupCreated>>');
  // }));
});

