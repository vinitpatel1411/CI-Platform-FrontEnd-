import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { CommonFunctionService } from '../../../../services/common-function.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MissionThemeService } from '../../../../services/mission-theme.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StatusCodes } from '../../../../common/constant';

@Component({
  selector: 'app-add-mission-theme',
  standalone: true,
  imports: [MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-mission-theme.component.html',
  styleUrl: './add-mission-theme.component.css'
})
export class AddMissionThemeComponent {
  addMissionThemeForm : FormGroup = new FormGroup({
      title : new FormControl("", Validators.required)
  });
  constructor(public commonFunctionService: CommonFunctionService, public dialogRef: MatDialogRef<AddMissionThemeComponent>,
    private missionThemeService : MissionThemeService, private snackBar: MatSnackBar
  ){

  }

  onCloseClick(){
    this.dialogRef.close();
  }

  get title(){
    return this.addMissionThemeForm.get('title') as FormControl;
  }

  addMissionTheme(){
    if(this.addMissionThemeForm.valid){
      this.missionThemeService.addMissionTheme(this.title.value).subscribe(result => {
        if(result.code === StatusCodes.Ok){
          this.snackBar.open('Added Mission-Theme Successfully', 'OK', { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' });
          this.dialogRef.close();
        }
        else{
          this.snackBar.open('Oops!, Something went wrong, Please try again later', 'OK', { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' });
        }
      });
    }
  }
}
