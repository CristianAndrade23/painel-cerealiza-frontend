import {inject, TestBed} from '@angular/core/testing';
import {HomeGuard} from './home.guard';

describe('HomeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeGuard]
    });
  });

  it('should be created', inject([HomeGuard], (service: HomeGuard) => {
    expect(service).toBeTruthy();
  }));
});
