import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RackEditComponent } from './rack-edit.component';

describe('RackEditComponent', () => {
  let component: RackEditComponent;
  let fixture: ComponentFixture<RackEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RackEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RackEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
