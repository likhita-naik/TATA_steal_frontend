import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SteamSuitSettingsComponent } from './steam-suit-settings.component';

describe('SteamSuitSettingsComponent', () => {
  let component: SteamSuitSettingsComponent;
  let fixture: ComponentFixture<SteamSuitSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SteamSuitSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SteamSuitSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
