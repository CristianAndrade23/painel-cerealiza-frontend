import {async, TestBed} from '@angular/core/testing';
import { AnaliseLavourasService } from './analise-lavouras.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';


describe('AnaliseLavourasService', () => {
  beforeEach(async(() => TestBed.configureTestingModule({
    providers: [
      HttpClient,
      AnaliseLavourasService,
      HttpHandler,
      HttpTestingController,
      RouterTestingModule
    ],
    imports: [
      HttpClientTestingModule
    ]
  })));

  it('should create', async (() => {
    const service: AnaliseLavourasService = TestBed.get(AnaliseLavourasService);
    expect(service).toBeTruthy();
  }));

  it('should create', async (() => {
    const service: AnaliseLavourasService = TestBed.get(AnaliseLavourasService);
    expect(service.buscaProdutor()).toBeDefined();
  }));

  it('should create', async (() => {
    const service: AnaliseLavourasService = TestBed.get(AnaliseLavourasService);
    expect(service.buscaIdLavouras).toBeDefined();
  }));
});
