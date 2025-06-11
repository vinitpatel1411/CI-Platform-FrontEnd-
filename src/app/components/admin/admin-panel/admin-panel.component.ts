import { Component, Type, PLATFORM_ID, Inject } from '@angular/core';
import { AdminHeaderComponent } from "../admin-header/admin-header.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { UserEditComponent } from '../../user/user-edit/user-edit.component';
import { MissionListingComponent } from '../../mission/mission-listing/mission-listing.component';
import { UserTabComponent } from '../user/user-tab/user-tab.component';
import { MissionTabComponent } from '../mission/mission-tab/mission-tab.component';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { MissionThemeTabComponent } from '../mission-theme/mission-theme-tab/mission-theme-tab.component';
import { SkillTabComponent } from '../skill/skill-tab/skill-tab.component';


@Component({
    selector: 'app-admin-panel',
    standalone: true,
    templateUrl: './admin-panel.component.html',
    styleUrl: './admin-panel.component.css',
    imports: [AdminHeaderComponent, MatSidenavModule, AdminHeaderComponent, MatListModule, CommonModule, MatIconModule]
})
export class AdminPanelComponent {

  constructor(private router:Router, @Inject(PLATFORM_ID) private platformId: Object, private userService:UserService){

  }
  sidenavOpened = false;

  onSidenavToggle() {
    this.sidenavOpened = !this.sidenavOpened;
  }

  selectedComponent: Type<any> | null = UserTabComponent;

  selectNavItem(navItem: string) {
    switch (navItem) {
      case 'user':
        this.selectedComponent = UserTabComponent;
        break;
      case 'cms':
        this.selectedComponent = MissionTabComponent;
        break;
      case 'mission':
        this.selectedComponent = MissionTabComponent;
        break;
      case 'missionTheme':
        this.selectedComponent = MissionThemeTabComponent;
        break;
      case 'missionSkills':
        this.selectedComponent = SkillTabComponent;
        break;
      case 'missionApplication':
        this.selectedComponent = MissionListingComponent;
        break;
      case 'story':
        this.selectedComponent = UserEditComponent;
        break;
      default:
        this.selectedComponent = null;
        break;
    }
  }

  onClickBack(){
    if (isPlatformBrowser(this.platformId)){
      const user = localStorage.getItem('currentUser');

      if (user) {
        const userObj = JSON.parse(user);
        this.userService.getUserRole(userObj.email);
      }
    }
    this.router.navigate(['/mission-listing']);
  }
}
