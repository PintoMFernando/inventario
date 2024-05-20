import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProformaimpComponent } from './proformaimp.component';

describe('ProformaimpComponent', () => {
  let component: ProformaimpComponent;
  let fixture: ComponentFixture<ProformaimpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProformaimpComponent]
    });
    fixture = TestBed.createComponent(ProformaimpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
