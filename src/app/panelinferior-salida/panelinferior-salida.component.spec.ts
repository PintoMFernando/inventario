import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelinferiorSalidaComponent } from './panelinferior-salida.component';

describe('PanelinferiorSalidaComponent', () => {
  let component: PanelinferiorSalidaComponent;
  let fixture: ComponentFixture<PanelinferiorSalidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanelinferiorSalidaComponent]
    });
    fixture = TestBed.createComponent(PanelinferiorSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
