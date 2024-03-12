import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PneumaticComponent } from './pneumatic.component';

describe('PneumaticComponent', () => {
  let component: PneumaticComponent;
  let fixture: ComponentFixture<PneumaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PneumaticComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PneumaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
