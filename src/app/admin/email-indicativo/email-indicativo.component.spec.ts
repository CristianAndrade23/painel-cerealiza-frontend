import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailIndicativoComponent } from './email-indicativo.component';

describe('EmailIndicativoComponent', () => {
  let component: EmailIndicativoComponent;
  let fixture: ComponentFixture<EmailIndicativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailIndicativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailIndicativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
