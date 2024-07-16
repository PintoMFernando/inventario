import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProformaComponent } from './editar-proforma.component';

describe('EditarProformaComponent', () => {
  let component: EditarProformaComponent;
  let fixture: ComponentFixture<EditarProformaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarProformaComponent]
    });
    fixture = TestBed.createComponent(EditarProformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
