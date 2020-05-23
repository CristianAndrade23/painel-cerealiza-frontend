// import {ProdutorComponent} from './produtor.component';
// import {async, ComponentFixture, TestBed} from '@angular/core/testing';
// import {ProdutorService} from './produtor.service';
// import 'rxjs/add/observable/from';
// // import { By } from '@angular/platform-browser';
// import {DebugElement} from '@angular/core';
// import {HttpClientModule} from '@angular/common/http';
// // import {Observable} from 'rxjs';
// import {By} from '@angular/platform-browser';
// import {ProducerResponse} from '../model/producer-response.model';
//
//
// describe('Produtor Component', () => {
//   // let service: ProdutorService;
//   let component: ProdutorComponent;
//   let fixture: ComponentFixture<ProdutorComponent>;
//   let debugElement: DebugElement;
//   let nativeElement: HTMLElement;
//
//
//   beforeEach(async (() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientModule],
//       declarations: [ ProdutorComponent ],
//       providers: [ ProdutorService ]
//     });
//
//     fixture = TestBed.createComponent(ProdutorComponent);
//     component = fixture.componentInstance;
//     // fixture.detectChanges();
//
// // component = new ProdutorComponent(service, null);
// // service = new ProdutorService(null);
//
//   } ) );
//
//
//   afterEach(async (() => {
//     component = null;
//     // service = null;
//     fixture = null;
//     debugElement = null;
//     nativeElement = null;
//
//   }));
//
//
//   it('recebe id lavoura apta ', async ( () => {
//     if (component.idRecebidoLavouraApta.length === 0) {
//       component.checkDisabledAptas();
//       expect(component.idRecebidoLavouraApta).toBe(0);
//     }
//   }));
//
//
//   it('recebe id lavoura pendente ', async ( () => {
//     if (component.idRecebidoLavouraPendente.length === 0) {
//       component.checkDisabledAptas();
//       expect(component.idRecebidoLavouraPendente).toBe(0);
//     }
//   }));
//
//
//   // it('busca Produtor Service ', function () {
//   //   const service = TestBed.get(ProdutorService);
//   //   spyOn(service, 'LavouraApta').and.returnValue(Observable.from);
//   // });
//
//   it('recebe Produtor de Analise-Lavouras ', async(function () {
//     //
//     // const de = fixture.debugElement.query(By.css('.produtor'));
//     // const el: HTMLElement = de.nativeElement;
//
//      const produtorEsperado = {
//       producer: {
//         id: 34,
//         document: 'Documento',
//         name: 'Produtor',
//         lastName: 'Sobrenome',
//         registerDate: 2018,
//         birthday: 1969,
//         fullName: 'Produtor Sobrenome',
//         selecionado: true
//       },
//       ableFarmings: [{
//         id: 47,
//         name: 'Farming',
//         description: 'Descricao',
//         plantedArea: 430,
//         estimatedProductionQuantity: 310,
//         effectiveProductionQuantity: 310,
//         estimatedProductivity: 190,
//         effectiveProductivity: 190,
//         effectiveSalePrice: 278,
//         estimatedSalePrice: 278,
//         plantingYear: 2018,
//         harvestYear: 2020,
//         ableToCompare: true,
//         cultureType: 'Arroz',
//         estimatedCost: [{
//           directCost: [{
//             id: 32,
//             costName: 'Custo',
//             typeCostId: 56,
//             valueCost: 99,
//             costPerHectare: 546,
//             costPerBags: 546,
//             observation: 'Observacao'
//           }],
//           indirectCost: [{
//             id: 32,
//             costName: 'Custo',
//             typeCostId: 56,
//             valueCost: 99,
//             costPerHectare: 546,
//             costPerBags: 546,
//             observation: 'Observacao'
//           }],
//           administrativeCost: [{
//             id: 32,
//             costName: 'Custo',
//             typeCostId: 56,
//             valueCost: 99,
//             costPerHectare: 546,
//             costPerBags: 546,
//             observation: 'Observacao'
//           }]
//         }],
//         effectiveCost: [{
//           directCost: [{
//             id: 32,
//             costName: 'Custo',
//             typeCostId: 56,
//             valueCost: 99,
//             costPerHectare: 546,
//             costPerBags: 546,
//             observation: 'Observacao'
//           }],
//           indirectCost: [{
//             id: 32,
//             costName: 'Custo',
//             typeCostId: 56,
//             valueCost: 99,
//             costPerHectare: 546,
//             costPerBags: 546,
//             observation: 'Observacao'
//           }],
//           administrativeCost: [{
//             id: 32,
//             costName: 'Custo',
//             typeCostId: 56,
//             valueCost: 99,
//             costPerHectare: 546,
//             costPerBags: 546,
//             observation: 'Observacao'
//           }]
//         }],
//       }],
//       unableFarmings: [{
//         id: 47,
//         name: 'Farming',
//         description: 'Descricao',
//         plantedArea: 430,
//         estimatedProductionQuantity: 310,
//         effectiveProductionQuantity: 310,
//         estimatedProductivity: 190,
//         effectiveProductivity: 190,
//         effectiveSalePrice: 278,
//         estimatedSalePrice: 278,
//         plantingYear: 2018,
//         harvestYear: 2020,
//         ableToCompare: true,
//         cultureType: 'Arroz',
//         estimatedCost: [{
//           directCost: [{
//             id: 32,
//             costName: 'Custo',
//             typeCostId: 56,
//             valueCost: 99,
//             costPerHectare: 546,
//             costPerBags: 546,
//             observation: 'Observacao'
//           }],
//           indirectCost: [{
//             id: 32,
//             costName: 'Custo',
//             typeCostId: 56,
//             valueCost: 99,
//             costPerHectare: 546,
//             costPerBags: 546,
//             observation: 'Observacao'
//           }],
//           administrativeCost: [{
//             id: 32,
//             costName: 'Custo',
//             typeCostId: 56,
//             valueCost: 99,
//             costPerHectare: 546,
//             costPerBags: 546,
//             observation: 'Observacao'
//           }]
//         }],
//         effectiveCost: [{
//           directCost: [{
//             id: 32,
//             costName: 'Custo',
//             typeCostId: 56,
//             valueCost: 99,
//             costPerHectare: 546,
//             costPerBags: 546,
//             observation: 'Observacao'
//           }],
//           indirectCost: [{
//             id: 32,
//             costName: 'Custo',
//             typeCostId: 56,
//             valueCost: 99,
//             costPerHectare: 546,
//             costPerBags: 546,
//             observation: 'Observacao'
//           }],
//           administrativeCost: [{
//             id: 32,
//             costName: 'Custo',
//             typeCostId: 56,
//             valueCost: 99,
//             costPerHectare: 546,
//             costPerBags: 546,
//             observation: 'Observacao'
//           }],
//         }]
//       }],
//     };
//     expect(produtorEsperado).toBe(component.produtor);
//     fixture.detectChanges();
//   }));
//
//
//   it('should ', function () {
//     const check = fixture.debugElement.query(By.css('.item-controls'));
//     check.triggerEventHandler('marca check', null);
//     expect(component.atualizaProdutor).toBe(ProducerResponse);
//   });
// });
