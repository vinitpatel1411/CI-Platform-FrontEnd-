import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionTabComponent } from './mission-tab.component';

describe('MissionTabComponent', () => {
  let component: MissionTabComponent;
  let fixture: ComponentFixture<MissionTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MissionTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
