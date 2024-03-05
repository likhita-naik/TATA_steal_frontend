import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SteamSuitDetectionComponent } from './steam-suit-detection.component';

describe('SteamSuitDetectionComponent', () => {
  let component: SteamSuitDetectionComponent;
  let fixture: ComponentFixture<SteamSuitDetectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SteamSuitDetectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SteamSuitDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
