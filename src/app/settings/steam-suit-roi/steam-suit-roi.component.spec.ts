import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SteamSuitRoiComponent } from './steam-suit-roi.component';

describe('SteamSuitRoiComponent', () => {
  let component: SteamSuitRoiComponent;
  let fixture: ComponentFixture<SteamSuitRoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SteamSuitRoiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SteamSuitRoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
