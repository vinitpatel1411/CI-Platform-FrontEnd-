import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { CurrentUserDTO } from '../../models/user-models';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { StatusCodes } from '../../common/constant';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatSelectModule, MatMenuModule, MatIconModule, CommonModule,MatSnackBarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  currentUserData: CurrentUserDTO;
  myWatchList: boolean = false;
  showButton: boolean = false;
  @Output() isWhatchList = new EventEmitter<boolean>();
  isAdmin : boolean = false;

  constructor(public userService: UserService, private router: Router, private snackBar: MatSnackBar) {
    this.currentUserData = this.userService.currentUserValue();
  }

  ngOnInit(): void {

    if (this.router.url === '/mission-listing') {
      this.showButton = true;
    }
  }

  logOut() {
    this.userService.isLoggedIn.next(false);
    this.userService.currentUser.next(null);
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigateByUrl('/');
  }

  MyWatchList() {
    if (this.myWatchList) {
      this.myWatchList = false;
    }
    else {
      this.myWatchList = true;
    }
    this.isWhatchList.emit(this.myWatchList);
  }

  Navigate() {
    this.router.navigateByUrl(`story-listing`);
  }

  myProfile(){
    this.router.navigateByUrl(`user-edit`);
  }

  adminPanel(){
    this.router.navigateByUrl('admin-panel');
  }
}
