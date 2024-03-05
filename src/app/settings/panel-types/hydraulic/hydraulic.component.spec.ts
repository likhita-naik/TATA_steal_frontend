import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HydraulicComponent } from './hydraulic.component';

describe('HydraulicComponent', () => {
  let component: HydraulicComponent;
  let fixture: ComponentFixture<HydraulicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HydraulicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HydraulicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
