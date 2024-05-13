import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteimpmesanioComponent } from './reporteimpmesanio.component';

describe('ReporteimpmesanioComponent', () => {
  let component: ReporteimpmesanioComponent;
  let fixture: ComponentFixture<ReporteimpmesanioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReporteimpmesanioComponent]
    });
    fixture = TestBed.createComponent(ReporteimpmesanioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
