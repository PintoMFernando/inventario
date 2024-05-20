import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminproformaComponent } from './adminproforma.component';

describe('AdminproformaComponent', () => {
  let component: AdminproformaComponent;
  let fixture: ComponentFixture<AdminproformaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminproformaComponent]
    });
    fixture = TestBed.createComponent(AdminproformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
