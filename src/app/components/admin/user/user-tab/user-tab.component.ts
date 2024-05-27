import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { UserService } from '../../../../services/user.service';
import { CurrentUserDTO } from '../../../../models/user-models';
import { StatusCodes } from '../../../../common/constant';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { RegistrationComponent } from '../../../user/registration/registration.component';
import { AdduserComponent } from '../adduser/adduser.component';
import { EdituserComponent } from '../edituser/edituser.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-tab',
  standalone: true,
  imports: [MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIcon,
    CommonModule,
    MatSnackBarModule
    ],
  templateUrl: './user-tab.component.html',
  styleUrl: './user-tab.component.css'
})
export class UserTabComponent implements  AfterViewInit{

  usersData : CurrentUserDTO [] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'employeeId', 'department', 'status', 'action'];
  dataSource: MatTableDataSource<CurrentUserDTO>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, public dialog: MatDialog, private snackBar: MatSnackBar){
    this.userService.getUsers().subscribe(result => {
      if(result.code === StatusCodes.Ok){
        this.usersData =  result.data;
        this.dataSource = new MatTableDataSource(this.usersData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
    this.dataSource = new MatTableDataSource(this.usersData);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  deleteUser(userDTO: CurrentUserDTO){
    const dialogRef = this.dialog.open(DeleteDialog, {
      width: '35%',
      height:'30%',
      data: {user: userDTO}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.userService.deleteUser(userDTO).subscribe(result => {
          if(result.code === StatusCodes.Ok){
            this.userService.getUsers().subscribe(result => {
              if(result.code === StatusCodes.Ok){
                this.usersData =  result.data;
                this.dataSource.data = [...this.usersData];
              }
            })
            this.snackBar.open('User Deleted Successfully', 'OK', { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' });
          }
        });
      }
      // else{
      //   this.snackBar.open('Failed to Delete User, Plesae try again later', 'OK', { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' });
      // }
    });
  }

  toggleStatus(user: CurrentUserDTO) {
    user.status = !user.status;
    // Call your service method to update the user status in the backend
    this.userService.updateUserStatus(user).subscribe(result => {
      if (result.code === StatusCodes.Ok) {
        // Update the user status in the local data source
        const index = this.usersData.findIndex(u => u.id === user.id);
        if (index !== -1) {
          this.usersData[index].status = user.status;
          this.dataSource.data = [...this.usersData];
        }
      } else {
        console.error('Failed to update user status');
      }
    });
  }

  openAddUserDialog(){
    const dialogRef = this.dialog.open(AdduserComponent, {
      width: '60%',
      height:'80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.userService.getUsers().subscribe(result => {
        if(result.code === StatusCodes.Ok){
          this.usersData =  result.data;
          this.dataSource.data = [...this.usersData];
        }
      })
    });
  }

  openEditUserDialog(userDTO: CurrentUserDTO){
    const dialogRef = this.dialog.open(EdituserComponent, {
      width: '80%',
      height:'80%',
      data: {user: userDTO}
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   this.userService.getUsers().subscribe(result => {
    //     if(result.code === StatusCodes.Ok){
    //       this.usersData =  result.data;
    //       this.dataSource.data = [...this.usersData];
    //     }
    //   })
    // });
  }
}


@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'delete-dialog.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  styleUrl: './user-tab.component.css'
})
export class DeleteDialog {
  constructor(public dialogRef: MatDialogRef<DeleteDialog>, @Inject(MAT_DIALOG_DATA) public data: { user: CurrentUserDTO  }) {}

  onConfirm(){
    this.dialogRef.close(true);
  }

  onCancel(){
    this.dialogRef.close(false);
  }
}
