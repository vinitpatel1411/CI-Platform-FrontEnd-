import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { forgotPasswordForm } from '../../../models/user-formType-model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonFunctionService } from '../../../services/common-function.service';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { StatusCodes } from '../../../common/constant';
import { CustomCarouselComponent } from "../custom-carousel/custom-carousel.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-forgot-password',
    standalone: true,
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.css',
    imports: [RouterLink, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, CustomCarouselComponent, CommonModule]
})
export class ForgotPasswordComponent {

  private ngUnsubscribe = new Subject<void>();
  forgotPasswordSuccess = false;
  message: string = "";

  forgotPassForm: FormGroup<forgotPasswordForm> = new FormGroup<forgotPasswordForm>({
    email: new FormControl("", [Validators.required, Validators.email]),
  });

  constructor(public commonFunctionService: CommonFunctionService, private router: Router, private userService: UserService, private snackBar: MatSnackBar) { }

  private _submit = (): void => {
    if (this.forgotPassForm.valid) {
      this.userService.ForgotPassword(this.forgotPassForm.get("email")?.value).pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
        this.message = (result.messages) ? result.messages[0] : this.message;

        if (result.code === StatusCodes.Ok) {
          this.forgotPasswordSuccess = true;
          this.snackBar.open('Email Sent', 'OK', { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' });
          this.redirectToUrl("/");
        } else {
          this.forgotPasswordSuccess = false;
          this.snackBar.open('Failed', 'OK', { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' });
        }
      });
    }
  };
  public get submit() {
    return this._submit;
  }
  public set submit(value) {
    this._submit = value;
  }

  redirectToUrl(url: string) {
    this.router.navigate([url]);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
