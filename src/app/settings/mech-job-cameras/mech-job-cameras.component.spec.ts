import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechJobCamerasComponent } from './mech-job-cameras.component';

describe('MechJobCamerasComponent', () => {
  let component: MechJobCamerasComponent;
  let fixture: ComponentFixture<MechJobCamerasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MechJobCamerasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MechJobCamerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
