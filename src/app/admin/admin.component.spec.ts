import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AnaliseLavourasModule} from './analise-lavouras/analise-lavouras.module';
import {GruposComparacaoModule} from './grupos-comparacao/grupos-comparacao.module';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {AdminComponent} from './admin.component';
import {InicialModule} from './inicial/inicial.module';
import {MenuModule} from './menu/menu.module';
import {ListaUsuariosModule} from './lista-usuarios/lista-usuarios.module';
import {CommonModule} from '@angular/common';
import {InicialComponent} from './inicial/inicial.component';

describe('AdminComponent', () => {

  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let componentInicial: InicialComponent;
  let fixtureComponentInicial: ComponentFixture<InicialComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminComponent ],
      imports: [
        MenuModule,
        ListaUsuariosModule,
        FormsModule,
        ReactiveFormsModule,
        InicialModule,
        AnaliseLavourasModule,
        GruposComparacaoModule,
        CommonModule,
        RouterTestingModule,
        RouterModule,
        BrowserDynamicTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    fixtureComponentInicial = TestBed.createComponent(InicialComponent);
    componentInicial = fixtureComponentInicial.componentInstance;
    fixtureComponentInicial.detectChanges();


  });


  it('should create', () => {

    expect(component).toBeTruthy();
  });
});

