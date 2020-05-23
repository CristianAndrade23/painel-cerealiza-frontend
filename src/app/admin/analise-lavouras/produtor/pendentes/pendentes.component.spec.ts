import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {PendentesComponent} from './pendentes.component';

describe('LavourasComponent', () => {
  let component: PendentesComponent;
  let fixture: ComponentFixture<PendentesComponent>;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
      declarations: [ PendentesComponent ]
    });
    fixture = TestBed.createComponent(PendentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // component = new LavourasComponent();
  }));

  afterEach(async (() => {
    component = null;
  }));




  it('Espera que a propriedade open do componente seja verdadeira e mostra detalhes',
    async (() => {
      component.open = false;
      component.mostrarDetalhes();
      expect(component.open).toBeTruthy();
    }));





  it('Espera que a propriedade open do componente seja falsa e fecha detalhes',
    async (() => {
      component.open = true;
      component.mostrarDetalhes();
      expect(component.open).toBeFalsy();
    }));




  it('marca check', async (() => {
    component.apta = true;
    component.check();
    if (component.apta === true) {
      component.idLavouraApta = component.lavouras.id;
      component.nomeLavouraApta = component.lavouras.name;
      // component.mostrarDetalhes();
      expect(component.apta).toBeTruthy();
    }
  }));




  it('desmarca check', async (() => {
    component.apta = false;
    component.check();
    if (component.apta === false) {
      component.idLavouraApta = null;
      component.nomeLavouraApta = null;
      // component.mostrarDetalhes();
      expect(component.apta).toBeFalsy();
    }
  }));




  it('recebe lavouras do component pai, por binding ', async ( () => {

    // const de = fixture.debugElement.query(By.css('.table'));
    // const el: HTMLElement = de.nativeElement;

    const esperaLavouras = [{

      id: 47,
      name: 'Farming',
      description: 'Descricao',
      plantedArea: 430,
      estimatedProductionQuantity: 310,
      effectiveProductionQuantity: 310,
      estimatedProductivity: 190,
      effectiveProductivity: 190,
      effectiveSalePrice: 278,
      estimatedSalePrice: 278,
      plantingYear: 2018,
      harvestYear: 2020,
      ableToCompare: true,
      cultureType: 'Arroz',
      estimatedCost: [{
        directCost: [{
          id: 32,
          costName: 'Custo',
          typeCostId: 56,
          valueCost: 99,
          costPerHectare: 546,
          costPerBags: 546,
          observation: 'Observacao'
        }],
        indirectCost: [{
          id: 32,
          costName: 'Custo',
          typeCostId: 56,
          valueCost: 99,
          costPerHectare: 546,
          costPerBags: 546,
          observation: 'Observacao'
        }],
        administrativeCost: [{
          id: 32,
          costName: 'Custo',
          typeCostId: 56,
          valueCost: 99,
          costPerHectare: 546,
          costPerBags: 546,
          observation: 'Observacao'
        }]
      }],
      effectiveCost: [{
        directCost: [{
          id: 32,
          costName: 'Custo',
          typeCostId: 56,
          valueCost: 99,
          costPerHectare: 546,
          costPerBags: 546,
          observation: 'Observacao'
        }],
        indirectCost: [{
          id: 32,
          costName: 'Custo',
          typeCostId: 56,
          valueCost: 99,
          costPerHectare: 546,
          costPerBags: 546,
          observation: 'Observacao'
        }],
        administrativeCost: [{
          id: 32,
          costName: 'Custo',
          typeCostId: 56,
          valueCost: 99,
          costPerHectare: 546,
          costPerBags: 546,
          observation: 'Observacao'
        }]
      }],
      selecionado: true,
      producerId: 51,
      nomeProdutorNomeLavoura: 'Nome do Produtor e Nome da Lavoura'
    }];

    expect(esperaLavouras).toBe(component.lavouras);
    fixture.detectChanges();
  }));





  it('recebe custoEfetivo do component Produtor ', async (function () {

    const esperaCustoEfetivo = {
      directCost: [{
        id: 31,
        costName: 'Custo',
        typeCostId: 22,
        valueCost: 470,
        costPerHectare: 800,
        costPerBags: 67,
        observation: 'Observação'
      }],
      indirectCost: [{
        id: 31,
        costName: 'Custo',
        typeCostId: 22,
        valueCost: 470,
        costPerHectare: 800,
        costPerBags: 67,
        observation: 'Observação'
      }],
      administrativeCost: [{
        id: 31,
        costName: 'Custo',
        typeCostId: 22,
        valueCost: 470,
        costPerHectare: 800,
        costPerBags: 67,
        observation: 'Observação'
      }]
    };
    expect(esperaCustoEfetivo).toBe(component.custoEfetivo);
    fixture.detectChanges();
  }));




  it('recebe custoEstimado do component Produtor ', async (() => {
    const esperaCustoEstimado = {
      directCost: [{
        id: 31,
        costName: 'Custo',
        typeCostId: 22,
        valueCost: 470,
        costPerHectare: 800,
        costPerBags: 67,
        observation: 'Observação'
      }],
      indirectCost: [{
        id: 31,
        costName: 'Custo',
        typeCostId: 22,
        valueCost: 470,
        costPerHectare: 800,
        costPerBags: 67,
        observation: 'Observação'
      }],
      administrativeCost: [{
        id: 31,
        costName: 'Custo',
        typeCostId: 22,
        valueCost: 470,
        costPerHectare: 800,
        costPerBags: 67,
        observation: 'Observação'
      }]
    };
    expect(esperaCustoEstimado).toBe(component.custoEstimado);
    fixture.detectChanges();
  }));




  it('testa envio do id e nome da lavoura ', async(() => {
    const check = fixture.debugElement.query(By.css('.item-controls'));
    check.triggerEventHandler('marca check', null);
    expect(component.lavouraId).toContain(component.idLavouraApta);
    expect(component.lavouraNome).toContain(component.nomeLavouraApta);
  }));
});
