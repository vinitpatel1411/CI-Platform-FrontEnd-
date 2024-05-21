import { CommonModule } from '@angular/common';
import { Component, Inject,PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { changePasswordForm } from '../../../models/user-formType-model';
import { CommonFunctionService } from '../../../services/common-function.service';
import { UserService } from '../../../services/user.service';
import { CurrentUserDTO, changePasswordDTO, checkOldPasswordDTO } from '../../../models/user-models';
import { StatusCodes } from '../../../common/constant';
import { isPlatformBrowser } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,MatIcon,
    MatSnackBarModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

  oldPasswordHide = true;
  newPasswordHide = true;
  confirmPasswordHide = true;
  checkOldPasswordModel! : checkOldPasswordDTO;
  changePasswordModel! : changePasswordDTO;
  userData : CurrentUserDTO;

  changePasswordForm: FormGroup<changePasswordForm> = new FormGroup<changePasswordForm>({
    oldPassword: new FormControl("",Validators.required),
    newPassword: new FormControl("", [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)]),
    confirmPassword: new FormControl("", [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)])
  })

  constructor( public dialogRef: MatDialogRef<ChangePasswordComponent>, @Inject(MAT_DIALOG_DATA) public data: { email: string  },
        public commonFunctionService: CommonFunctionService, private userService: UserService,@Inject(PLATFORM_ID) private platformId: Object,
        private snackBar: MatSnackBar){
          // console.log(data.email);
          this.checkOldPasswordModel = {email:"",password:""};
          this.changePasswordModel = {email:"", newPassword:""};
          this.userData = userService.currentUserValue();
        }

  get ctrl(): changePasswordForm {
    return this.changePasswordForm.controls;
  }

  checkpassword() {
    if (this.ctrl.newPassword.value != this.ctrl.confirmPassword.value) {
      this.ctrl.confirmPassword.setErrors({ invalid: true });
    }
  }

  checkPasswordSmilarity(){
    if(this.ctrl.oldPassword.value == this.ctrl.newPassword.value){
      this.ctrl.newPassword.setErrors({similar:true});
    }
  }

  onCancelClick(): void{
    this.dialogRef.close();
  }

  get oldPassword(){
    return this.changePasswordForm.get('oldPassword') as FormControl;
  }

  get newPassword(){
    return this.changePasswordForm.get('newPassword') as FormControl;
  }

  intializeCheckPasswordDTO(): void{
    this.checkOldPasswordModel.email = this.data.email;
    this.checkOldPasswordModel.password = this.oldPassword.value;
  }

  intializeChangePasswordDTO(): void{
    this.changePasswordModel.email = this.data.email;
    this.changePasswordModel.newPassword = this.newPassword.value;
  }

  onChangePasswordClick(): void{
    this.intializeCheckPasswordDTO();
    this.userService.checkOldPassword(this.checkOldPasswordModel).subscribe(result => {
      if(result.code === StatusCodes.InternalServer){
        this.changePasswordForm.controls.oldPassword.setErrors({wrongPassword:true});
      }
      else{
        this.intializeChangePasswordDTO();
        this.userService.changePassword(this.changePasswordModel).subscribe(result => {
          if(result.code === StatusCodes.Ok){
            this.userData.password = result.data;
            if (isPlatformBrowser(this.platformId)) {
              this.userService.currentUser.next(this.userData);
              localStorage.setItem("currentUser", JSON.stringify(this.userData));
            }
            this.snackBar.open('Change Password Successfully', 'OK', { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' });
            this.dialogRef.close();
          }
          else{
            this.snackBar.open('Oops!, Something went wrong Please try agian later', 'OK', { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' });
          }
        })
      }
    }
  )};
}
