import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicalJobsComponent } from './mechanical-jobs.component';

describe('MechanicalJobsComponent', () => {
  let component: MechanicalJobsComponent;
  let fixture: ComponentFixture<MechanicalJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MechanicalJobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MechanicalJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
