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
import { MatSnackBar } from '@angular/material/snack-bar';
import { SkillService } from '../../../../services/skill.service';
import { skillDTO } from '../../../../models/mission-models';
import { StatusCodes } from '../../../../common/constant';

@Component({
  selector: 'app-add-skill',
  standalone: true,
  imports: [MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,CommonModule,
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './add-skill.component.html',
  styleUrl: './add-skill.component.css'
})
export class AddSkillComponent {
  addSkillForm : FormGroup = new FormGroup({
    skillName : new FormControl("", Validators.required)
  });

  skill : skillDTO;

  constructor(public commonFunctionService: CommonFunctionService, public dialogRef: MatDialogRef<AddSkillComponent>,
    private skillService : SkillService, private snackBar: MatSnackBar
  ){
    this.skill = {
      skillId : 0,
      skillName : "",
      status : 0
    }
  }

  onCloseClick(){
    this.dialogRef.close();
  }

  get skillName(){
    return this.addSkillForm.get('skillName') as FormControl;
  }

  intializeSkill(){
    this.skill.skillId = 0;
    this.skill.skillName = this.skillName.value;
  }

  save(){
    if(this.addSkillForm.valid){
      this.intializeSkill();
      this.skillService.addSkill(this.skill).subscribe(result => {
        if(result.code === StatusCodes.Ok){
          this.snackBar.open('Added Skill Successfully', 'OK', { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' });
          this.dialogRef.close();
        }
        else{
          this.snackBar.open('Oops!, Something went wrong, Please try again later', 'OK', { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' });
        }
      })
    }
  }
}
