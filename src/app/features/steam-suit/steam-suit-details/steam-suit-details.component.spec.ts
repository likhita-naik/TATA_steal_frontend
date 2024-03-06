import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SteamSuitDetailsComponent } from './steam-suit-details.component';

describe('SteamSuitDetailsComponent', () => {
  let component: SteamSuitDetailsComponent;
  let fixture: ComponentFixture<SteamSuitDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SteamSuitDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SteamSuitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
