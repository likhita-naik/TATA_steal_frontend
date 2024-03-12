import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UceilComponent } from './uceil.component';

describe('UceilComponent', () => {
  let component: UceilComponent;
  let fixture: ComponentFixture<UceilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UceilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UceilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
