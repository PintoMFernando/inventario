import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsalidasComponent } from './adminsalidas.component';

describe('AdminsalidasComponent', () => {
  let component: AdminsalidasComponent;
  let fixture: ComponentFixture<AdminsalidasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminsalidasComponent]
    });
    fixture = TestBed.createComponent(AdminsalidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
