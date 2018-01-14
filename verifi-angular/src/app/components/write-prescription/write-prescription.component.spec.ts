import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WritePrescriptionComponent } from './write-prescription.component';

describe('WritePrescriptionComponent', () => {
  let component: WritePrescriptionComponent;
  let fixture: ComponentFixture<WritePrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WritePrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WritePrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
