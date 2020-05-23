// import {async, ComponentFixture, TestBed} from '@angular/core/testing';
// import { GruposComparacaoComponent } from './grupos-comparacao.component';
// import {GruposComparacaoService} from './grupos-comparacao.service';
// import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {AlertModule, BsModalService, ButtonsModule, ModalModule, TypeaheadModule} from 'ngx-bootstrap';
// import {HttpClient, HttpHandler} from '@angular/common/http';
// import {CommonModule} from '@angular/common';
// import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
// import {ListaGruposModule} from './lista-grupos/lista-grupos.module';
// import {HttpClientTestingModule} from '@angular/common/http/testing';
// import {Observable} from 'rxjs';
// import {GroupRequest} from './model/group-request';
// import {GroupResponse} from './model/group-response';
//
// // describe('GruposComparacaoComponent', () => {
// //   let component: GruposComparacaoComponent;
// //   let fixture: ComponentFixture<GruposComparacaoComponent>;
// //   const groupRequest = new GroupRequest();
// //   const groupResponse = new GroupResponse();
// //   // let gruposComparacaoServicePartial: Partial<GruposComparacaoService>;
// //   const  gruposComparacaoServiceDuble = {
// //     // isLoggedIn: true,
// //     // user: { name: 'Test User'}
// //     buscaService: () => {
// //       return Observable.create;
// //     }
// //   };
// //
// //   beforeEach(async(() => {
// //     TestBed.configureTestingModule({
// //       declarations: [
// //         GruposComparacaoComponent,
// //       ],
// //       providers: [
// //         HttpClient,
// //         HttpHandler,
// //         HttpClientTestingModule,
// //         {provide: GruposComparacaoService, useValue: gruposComparacaoServiceDuble }
// //       ],
// //       imports: [
// //         CommonModule,
// //         FormsModule,
// //         ReactiveFormsModule,
// //         TypeaheadModule,
// //         AlertModule.forRoot(),
// //         ButtonsModule.forRoot(),
// //         ModalModule.forRoot(),
// //         BrowserDynamicTestingModule,
// //         ListaGruposModule
// //
// //       ]
// //     })
// //       .compileComponents();
// //   }));
// //
// //   beforeEach(async() => {
// //     fixture = TestBed.createComponent(GruposComparacaoComponent);
// //     component = fixture.componentInstance;
// //     fixture.detectChanges();
// //   });
// //
// //   it('should be created', async(() => {
// //     expect(component).toBeTruthy();
// //   }));
//
//   // it('CriarGrupos', async(() => {
//   //   expect(component.criarGrupos).toBeTruthy();
//   // }));
//   //
//   // it('listagemDeGrupos', async(() => {
//   //   expect(component.listagemDeGrupos).toBeTruthy();
//   // }));
//   //
//   // it('modalCriarGrupo', async(() => {
//   //   expect(component.modalCriarGrupo).toBe(TemplateRef);
//   // }));
//   //
//   // it('modalAvisoGrupoCriado', async(() => {
//   //   expect(component.modalAvisoGrupoCriado).toHaveBeenCalled();
//   // }));
//   //
//   // it('recebeEvento', async(() => {
//   //   expect(component.recebeEvento).toBeDefined();
//   // }));
//
//
//
//   // it('grupoSemNome', async(() => {
//   //   expect(component.grupoSemNome).toBeFalsy();
//   // }));
//   //
//   // it('grupoMesmoNome', async(() => {
//   //   expect(component.grupoMesmoNome).toBeFalsy();
//   // }));
//   //
//   // it('grupoSemCultura', async(() => {
//   //   expect(component.grupoSemCultura).toBeFalsy();
//   // }));
//   //
//   //
//   // it('grupoSemAnoColheita', async(() => {
//   //   expect(component.grupoSemAnoColheita).toBeFalsy();
//   // }));
//   //
//   // it('grupoSemAnoPlantio', async(() => {
//   //   expect(component.grupoSemAnoPlantio).toBeFalsy();
//   // }));
//   //
//   // it('anoColheitaMaiorQueAnoPlantio', async(() => {
//   //   expect(component.anoColheitaMaiorQueAnoPlantio).toBeFalsy();
//   // }));
//   //
//   // it('dataInvalida', async(() => {
//   //   expect(component.dataInvalida).toBeFalsy();
//   // }));
//   //
//   // it('campoInvalido', async(() => {
//   //   expect(component.campoInvalido).toBeFalsy();
//   // }));
//   //
//   // it('currentPage', async(() => {
//   //   expect(component.currentPage).toBeUndefined();
//   // }));
//   //
//   // it('listaGrupos', async(() => {
//   //   expect(component.listaGrupos).toBeDefined();
//   // }));
//   //
//   // it('gruposCriados', async(() => {
//   //   expect(component.gruposCriados).toBeDefined();
//   // }));
//   //
//   // it('grupoCriado', async(() => {
//   //   expect(component.grupoCriado).toBeUndefined();
//   // }));
//   //
//   // it('criarGrupoRef', async(() => {
//   //   expect(component.criarGrupoRef).toBeUndefined();
//   // }));
//   //
//   // it('avisoGrupoCriadoRef', async(() => {
//   //   expect(component.avisoGrupoCriadoRef).toBeUndefined();
//   // }));
// // });
// describe('recebeGruposCriados', () => {
//   // Arrange
//   // let service: GruposComparacaoService;
//   // let modal: BsModalService;
//   // let component: GruposComparacaoComponent;
//   let component;
//   let service;
//   let modal;
//
//   beforeEach(() => {
//     service = new GruposComparacaoService(null);
//     modal = new BsModalService(null, null);
//     component = new GruposComparacaoComponent(service, modal);
//
//      let gruposCriadosgc: GroupResponse[] =  [{
//       'id': 1,
//       'name': 'name',
//       'cultureType': 'Arroz',
//       'plantingYear': 2018,
//       'harvestYear': 2020,
//       'status': true,
//       'tipoDeCultura': 1
//     }];
//
//      let novoGrupo: GroupRequest = {
//         id: 1,
//         name: 'name',
//        cultureType: 1,
//        plantingYear: 2018,
//        harvestYear: 2020,
//        tipoCultura: 'Arroz'
//      };
//
//      gruposCriadosgc = component.gruposCriados;
//      novoGrupo = component.novoGrupo;
//   });
//
//   afterEach(() => {
//   service = null;
//   component = null;
//   });
//
//   it('should recebeGruposCriados', () => {
//     // Act
//     // component.recebeEvento();
//     const gruposCriadosgc = component.gruposCriados;
//     // Assert
//     expect(component.recebeEvento(gruposCriadosgc)).toEqual(GroupResponse);
//   });
// });

import {GruposComparacaoService} from './grupos-comparacao.service';
import {GruposComparacaoComponent} from './grupos-comparacao.component';
import {async} from '@angular/core/testing';

describe('GruposComparacaoComponent', () => {
  let service: GruposComparacaoService;
  let component: GruposComparacaoComponent;


  beforeEach(async (() => {
    service = new GruposComparacaoService(null);
    component = new GruposComparacaoComponent(service, null);
  }));

  afterEach(async (() => {
    service = null;
    component = null;
  }));



});
