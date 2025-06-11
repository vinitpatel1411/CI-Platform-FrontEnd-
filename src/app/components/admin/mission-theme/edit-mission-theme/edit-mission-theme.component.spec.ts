import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMissionThemeComponent } from './edit-mission-theme.component';

describe('EditMissionThemeComponent', () => {
  let component: EditMissionThemeComponent;
  let fixture: ComponentFixture<EditMissionThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMissionThemeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditMissionThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
