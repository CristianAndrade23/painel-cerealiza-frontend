import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanosAVencerComponent } from './planos-a-vencer.component';

describe('PlanosAVencerComponent', () => {
  let component: PlanosAVencerComponent;
  let fixture: ComponentFixture<PlanosAVencerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanosAVencerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanosAVencerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
