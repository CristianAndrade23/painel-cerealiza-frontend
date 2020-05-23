// import {AnaliseLavourasService} from './analise-lavouras.service';
// import {AnaliseLavourasComponent} from './analise-lavouras.component';
// import {async} from '@angular/core/testing';
// import {Observable} from 'rxjs/Observable';
// import 'rxjs/add/observable/from';
// import 'rxjs/add/observable/empty';
// import 'rxjs/add/observable/throw';
//
//
// describe('Analise Lavouras Component', () => {
//   let service: AnaliseLavourasService;
//   let component: AnaliseLavourasComponent;
//
//
//   beforeEach(async (() => {
//     service = new AnaliseLavourasService(null);
//     component = new AnaliseLavourasComponent(service);
//   } ) );
//
//
//   afterEach(async (() => {
//     service = null;
//     component = null;
//   } ) );
//
//
//   it('produtores ', function () {
//     const produtores = [{
//       id: 31,
//       document: 'Documento',
//       name: 'Produtor',
//       lastName: 'Sobrenome',
//       registerDate: 'Maio',
//       birthday: '03/09/1977',
//       fullName: 'Produtor Sobrenome',
//       selecionado: true
//     }];
//     spyOn(service, 'Lista Produtor').and.callFake(() => {
//       return Observable.from( [produtores]  );
//       // spyOn(service, 'Lista Produtor').and.callFake(() => {
//       //   return Observable.empty();
//     } );
//
//     component.ngOnInit();
//     expect(component.produtores).toBe(produtores);
//     // component.produtorSelecionado();
//     // expect(component.produtores).toBe(produtores);
//   } );
//
//
//   it('analisaProdutores ', function () {
//     const analisaProdutores = [{
//       producer: {
//         id: 90,
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
//           }]
//         }],
//       }],
//     }];
//
//     spyOn(service, 'Produtor Selecionado').and.callFake(() => {
//       return Observable.from( [analisaProdutores]  );
//     });
//
//     component.ngOnInit();
//     expect(component.produtores).toBe(analisaProdutores);
//   });
//
//
// });
