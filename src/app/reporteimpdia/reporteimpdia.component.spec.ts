import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteimpdiaComponent } from './reporteimpdia.component';

describe('ReporteimpdiaComponent', () => {
  let component: ReporteimpdiaComponent;
  let fixture: ComponentFixture<ReporteimpdiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReporteimpdiaComponent]
    });
    fixture = TestBed.createComponent(ReporteimpdiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
