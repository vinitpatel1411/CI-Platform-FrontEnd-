import { TestBed } from '@angular/core/testing';

import { MissionThemeService } from './mission-theme.service';

describe('MissionThemeService', () => {
  let service: MissionThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MissionThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
