import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SteamSuitAllDetailsComponent } from './steam-suit-all-details.component';

describe('SteamSuitAllDetailsComponent', () => {
  let component: SteamSuitAllDetailsComponent;
  let fixture: ComponentFixture<SteamSuitAllDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SteamSuitAllDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SteamSuitAllDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
