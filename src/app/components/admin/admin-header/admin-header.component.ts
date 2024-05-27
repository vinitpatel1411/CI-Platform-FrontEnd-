import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../../services/user.service';
import { CurrentUserDTO } from '../../../models/user-models';
import { Router } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [MatButtonModule, MatSelectModule, MatMenuModule, MatIconModule, CommonModule,MatSnackBarModule,MatSidenavModule],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css',
  providers:[DatePipe]
})
export class AdminHeaderComponent {

  currentUserData : CurrentUserDTO;
  currentDate : string | null;
  @Output() toggleSidenav = new EventEmitter<void>();
  @Input() sidenavOpened: boolean = false;

  constructor(private userService: UserService, private router: Router,private datePipe: DatePipe){
    this.currentUserData = userService.currentUserValue();
    this.currentDate = this.datePipe.transform(new Date(), 'EEEE, MMMM d, y, h:mm a');
  }

  logOut() {
    this.userService.isLoggedIn.next(false);
    this.userService.currentUser.next(null);
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigateByUrl('/');
  }

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }

}
