import { Component, Type } from '@angular/core';
import { AdminHeaderComponent } from "../admin-header/admin-header.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { UserEditComponent } from '../../user/user-edit/user-edit.component';
import { MissionListingComponent } from '../../mission/mission-listing/mission-listing.component';
import { UserTabComponent } from '../user/user-tab/user-tab.component';

@Component({
    selector: 'app-admin-panel',
    standalone: true,
    templateUrl: './admin-panel.component.html',
    styleUrl: './admin-panel.component.css',
    imports: [AdminHeaderComponent, MatSidenavModule, AdminHeaderComponent, MatListModule, CommonModule, MatIconModule]
})
export class AdminPanelComponent {


  sidenavOpened = false;

  onSidenavToggle() {
    this.sidenavOpened = !this.sidenavOpened;
  }

  selectedComponent: Type<any> | null = null;

  selectNavItem(navItem: string) {
    switch (navItem) {
      case 'user':
        this.selectedComponent = UserTabComponent;
        break;
      case 'cms':
        this.selectedComponent = MissionListingComponent;
        break;
      case 'mission':
        this.selectedComponent = UserEditComponent;
        break;
      case 'missionTheme':
        this.selectedComponent = MissionListingComponent;
        break;
      case 'missionSkills':
        this.selectedComponent = UserEditComponent;
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
}
