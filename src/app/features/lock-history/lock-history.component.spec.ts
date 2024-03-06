import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockHistoryComponent } from './lock-history.component';

describe('LockHistoryComponent', () => {
  let component: LockHistoryComponent;
  let fixture: ComponentFixture<LockHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LockHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LockHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
