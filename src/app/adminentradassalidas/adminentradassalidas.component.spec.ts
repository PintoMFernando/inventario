import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminentradassalidasComponent } from './adminentradassalidas.component';

describe('AdminentradassalidasComponent', () => {
  let component: AdminentradassalidasComponent;
  let fixture: ComponentFixture<AdminentradassalidasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminentradassalidasComponent]
    });
    fixture = TestBed.createComponent(AdminentradassalidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
