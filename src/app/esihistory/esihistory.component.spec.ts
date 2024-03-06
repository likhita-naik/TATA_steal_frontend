import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ESIHistoryComponent } from './esihistory.component';

describe('ESIHistoryComponent', () => {
  let component: ESIHistoryComponent;
  let fixture: ComponentFixture<ESIHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ESIHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ESIHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
