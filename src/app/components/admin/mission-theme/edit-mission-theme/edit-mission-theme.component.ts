import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { CommonFunctionService } from '../../../../services/common-function.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MissionThemeService } from '../../../../services/mission-theme.service';
import { missionThemeDTO } from '../../../../models/mission-models';
import { StatusCodes } from '../../../../common/constant';
import { title } from 'process';

@Component({
  selector: 'app-edit-mission-theme',
  standalone: true,
  imports: [MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,CommonModule,
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './edit-mission-theme.component.html',
  styleUrl: './edit-mission-theme.component.css'
})
export class EditMissionThemeComponent implements OnInit{

  missionTheme! : missionThemeDTO ;
  editThemeForm : FormGroup = new FormGroup({
    title : new FormControl("", Validators.required)
  })
  constructor(public commonFunctionService: CommonFunctionService, public dialogRef: MatDialogRef<EditMissionThemeComponent>,
    private missionThemeService : MissionThemeService, private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: { id : number }){

    }

  getMissionTheme(id:number){
    this.missionThemeService.getMissionThemeFromId(id).subscribe(result => {
      if(result.code === StatusCodes.Ok){
        this.missionTheme = result.data;

        this.editThemeForm.patchValue({
          title : this.missionTheme.title
        })
      }
    })
  }

  ngOnInit(): void {
    this.getMissionTheme(this.data.id);
  }

  get title() {
    return this.editThemeForm.get('title') as FormControl;
  }

  updateMissionThemeDTO(){
    this.missionTheme.title = this.title.value;
  }

  onCloseClick(){
    this.dialogRef.close();
  }

  editMissionTheme(){
    this.updateMissionThemeDTO();
    if(this.editThemeForm.valid){
      this.missionThemeService.editMissionTheme(this.missionTheme).subscribe(result => {
        if(result.code === StatusCodes.Ok){
          this.snackBar.open('Edit Mission-Theme Successfully', 'OK', { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' });
          this.dialogRef.close();
        }
        else{
          this.snackBar.open('Oops!, Something went wrong, Please try again later', 'OK', { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' });
        }
      })
    }
  }
}
