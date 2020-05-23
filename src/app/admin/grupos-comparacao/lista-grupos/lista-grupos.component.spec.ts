// import {async, ComponentFixture, TestBed} from '@angular/core/testing';
// import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import { ListaGruposComponent } from './lista-grupos.component';
// import {AlertModule, ButtonsModule, ModalModule, PaginationModule, TypeaheadModule} from 'ngx-bootstrap';
// import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
// import {HttpClient, HttpHandler} from '@angular/common/http';
// import {Observable} from 'rxjs';
// import {HttpClientTestingModule} from '@angular/common/http/testing';
// import {ListaGruposService} from './lista-grupos.service';
//
// describe('ListaGruposComponent', () => {
//   let component: ListaGruposComponent;
//   let fixture: ComponentFixture<ListaGruposComponent>;
//   const  listaGruposServiceDuble = {
//     // isLoggedIn: true,
//     // user: { name: 'Test User'}
//     buscaService: () => {
//       return Observable.create;
//     }
//   };
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         ListaGruposComponent,
//       ],
//       imports: [
//         FormsModule,
//         ReactiveFormsModule,
//         TypeaheadModule.forRoot(),
//         PaginationModule.forRoot(),
//         AlertModule.forRoot(),
//         ButtonsModule.forRoot(),
//         ModalModule.forRoot(),
//         BrowserDynamicTestingModule
//       ],
//       providers: [
//         HttpClient,
//         HttpHandler,
//         HttpClientTestingModule,
//         {provide: ListaGruposService, useValue: listaGruposServiceDuble }
//       ]
//     })
//       .compileComponents();
//   }));
//
//   beforeEach(async(() => {
//     fixture = TestBed.createComponent(ListaGruposComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   }));
//
//   it('should create', async(() => {
//     expect(component).toBeTruthy();
//   }));
// });

import {ListaGruposComponent} from './lista-grupos.component';
import {ListaGruposService} from './lista-grupos.service';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ProdutorComponent} from '../../analise-lavouras/produtor/produtor.component';

describe('ListaGruposComponent', () => {
  let component: ListaGruposComponent;
  let service: ListaGruposService;
  let fixture: ComponentFixture<ListaGruposComponent>;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutorComponent ]
    });

    fixture = TestBed.createComponent(ListaGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // component = new ListaGruposComponent(service, null);
    // service = new ListaGruposService(null);
  }) );


  afterEach(async (() => {
    component = null;
    service = null;
  }));


  it('vai receber os grupos criados ', function () {
    const grupoEsperado = [{
      id: 50,
      name: 'Grupo Criado',
      cultureType: 'Arroz',
      plantingYear: 2018,
      harvestYear: 2020,
      status: true,
      tipoDeCultura: 1
    }];
    expect(grupoEsperado).toBe(component.gruposCriados);
    fixture.detectChanges();
  });

});
