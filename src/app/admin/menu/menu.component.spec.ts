import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {AppRoutingModule} from '../../app.routing.module';
import {AnaliseLavourasModule} from '../analise-lavouras/analise-lavouras.module';
import {GruposComparacaoModule} from '../grupos-comparacao/grupos-comparacao.module';
import {AdminComponent} from '../admin.component';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {InicialModule} from '../inicial/inicial.module';


describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuComponent
      ],
      providers: [
        HttpClient,
        HttpHandler,
        HttpClientTestingModule,
        Router,
        AppRoutingModule,
      ],
      imports: [
        AnaliseLavourasModule,
        GruposComparacaoModule,
        RouterTestingModule,
        BrowserDynamicTestingModule,
        InicialModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(async (() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', async (() => {
    expect(component).toBeTruthy();
  }));
});

