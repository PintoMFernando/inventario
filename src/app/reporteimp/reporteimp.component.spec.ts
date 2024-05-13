import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteimpComponent } from './reporteimp.component';

describe('ReporteimpComponent', () => {
  let component: ReporteimpComponent;
  let fixture: ComponentFixture<ReporteimpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReporteimpComponent]
    });
    fixture = TestBed.createComponent(ReporteimpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
