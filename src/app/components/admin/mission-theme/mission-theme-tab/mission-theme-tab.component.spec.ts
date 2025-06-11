import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionThemeTabComponent } from './mission-theme-tab.component';

describe('MissionThemeTabComponent', () => {
  let component: MissionThemeTabComponent;
  let fixture: ComponentFixture<MissionThemeTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionThemeTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MissionThemeTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
