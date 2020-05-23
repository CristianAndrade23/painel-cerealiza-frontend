import { async, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {InicialComponent} from './inicial.component';

describe('InicialComponent', () => {
  // let component: HomeComponent;
  // let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicialComponent ],
      imports: [
        RouterTestingModule,
        BrowserDynamicTestingModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  }));

  // beforeEach(async (() => {
  //   fixture = TestBed.createComponent(HomeComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // })) ;

  // it('should create', async (() => {
  //   expect(component).toBeDefined();
  // }));

  it('should contain "name"', async (() => {
    const fixture = TestBed.createComponent(InicialComponent);
    const inicial = fixture.debugElement.componentInstance;
    expect(inicial).toBeTruthy();
  }));

  // it('should create', async (() => {
  //   let component: new HomeComponent();
  //   expect(component.).toBeTruthy();
  // }));

  // it('getName', async (() => {
  //   expect(component.getName()).toContain('name');
  // }));
});
