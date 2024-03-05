import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TcRoiComponent } from './tc-roi.component';

describe('TcRoiComponent', () => {
  let component: TcRoiComponent;
  let fixture: ComponentFixture<TcRoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TcRoiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TcRoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
