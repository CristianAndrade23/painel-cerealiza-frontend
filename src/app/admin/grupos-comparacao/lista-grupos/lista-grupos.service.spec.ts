import {async, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {ListaGruposService} from './lista-grupos.service';
import {BsModalService, ComponentLoaderFactory, PositioningService} from 'ngx-bootstrap';



describe('ListaGruposService', () => {
  beforeEach(async (() => TestBed.configureTestingModule({
      providers: [
        HttpClient,
        ListaGruposService,
        HttpHandler,
        HttpTestingController,
        RouterTestingModule,
        BsModalService,
        ComponentLoaderFactory,
        PositioningService,
        HttpClientTestingModule
      ],
      imports: [
        HttpClientTestingModule
      ]
    }
  )));

  it('should be created', async (() => {
    const service: ListaGruposService = TestBed.get(ListaGruposService);
    expect(service).toBeTruthy();
  }));

  // it('should be created', inject([ListaGruposService], (service: ListaGruposService) => {
  //   expect(service).toBeTruthy();
  // }));

  //
  //
  // it('getGruposComparacao()', async ( () => {
  //   const service: ListaGruposService = TestBed.get(ListaGruposService);
  //   expect(service.getGruposComparacao).toBeDefined();
  // }));
  //
  // it('listalavourasAptas()', async ( () => {
  //   const service: ListaGruposService = TestBed.get(ListaGruposService);
  //   expect(service.listaLavourasAptas).toBeDefined();
  // }));
  //
  // it('editarGrupo()', async ( () => {
  //   const service: ListaGruposService = TestBed.get(ListaGruposService);
  //   expect(service.editarGrupo).toBeDefined();
  // }));
  //
  // it('deletaGrupo()', async ( () => {
  //   const service: ListaGruposService = TestBed.get(ListaGruposService);
  //   expect(service.deletaGrupo).toBeDefined();
  // }));
  //
  // it('inserirLavourasAptas()', async ( () => {
  //   const service: ListaGruposService = TestBed.get(ListaGruposService);
  //   expect(service.inserirLavourasAptas).toBeDefined();
  // }));
  //
  // it('deletaLavouraDoGrupo()', async ( () => {
  //   const service: ListaGruposService = TestBed.get(ListaGruposService);
  //   expect(service.deletaLavouraDoGrupo).toBeDefined();
  // }));
  //
  // it('listarTodasLavourasDoGrupo()', async ( () => {
  //   const service: ListaGruposService = TestBed.get(ListaGruposService);
  //   expect(service.listarTodasLavourasDoGrupo).toBeDefined();
  // }));
});
