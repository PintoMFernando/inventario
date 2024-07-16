import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarsubproductoComponent } from './editarsubproducto.component';

describe('EditarsubproductoComponent', () => {
  let component: EditarsubproductoComponent;
  let fixture: ComponentFixture<EditarsubproductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarsubproductoComponent]
    });
    fixture = TestBed.createComponent(EditarsubproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
