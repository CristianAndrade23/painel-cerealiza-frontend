import {async, TestBed} from '@angular/core/testing';

import { ProdutorService } from './produtor.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('ProdutorService', () => {
  beforeEach(async(() => TestBed.configureTestingModule({
    providers: [
      HttpClient,
      ProdutorService,
      HttpHandler,
      HttpTestingController,
      RouterTestingModule,
    ],
    imports: [
      HttpClientTestingModule
    ]
  })));

  it('should be created', async (() => {
    const service: ProdutorService = TestBed.get(ProdutorService);
    expect(service).toBeTruthy();
  }));

  it('should be created', async (() => {
    const service: ProdutorService = TestBed.get(ProdutorService);
    expect(service.lavourasAptas).toBeDefined();
  }));
});

