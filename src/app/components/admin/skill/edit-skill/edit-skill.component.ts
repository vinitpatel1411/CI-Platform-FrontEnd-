import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { skillDTO } from '../../../../models/mission-models';
import { CommonFunctionService } from '../../../../services/common-function.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SkillService } from '../../../../services/skill.service';
import { StatusCodes } from '../../../../common/constant';

@Component({
  selector: 'app-edit-skill',
  standalone: true,
  imports: [MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,CommonModule,
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './edit-skill.component.html',
  styleUrl: './edit-skill.component.css'
})
export class EditSkillComponent implements OnInit{
  editSkillForm : FormGroup = new FormGroup({
    skillName : new FormControl("", Validators.required)
  });

  skill !: skillDTO;

  constructor(public commonFunctionService: CommonFunctionService, public dialogRef: MatDialogRef<EditSkillComponent>,
    private skillService : SkillService, private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: { id : number }
  ){

  }

  ngOnInit(): void {
    this.getSkillById(this.data.id);
  }
  onCloseClick(){
    this.dialogRef.close();
  }

  get skillName(){
    return this.editSkillForm.get('skillName') as FormControl;
  }

  getSkillById(id:number){
    this.skillService.getSkillById(id).subscribe(result => {
      if(result.code === StatusCodes.Ok){
        this.skill = result.data;

        this.editSkillForm.patchValue({
          skillName: this.skill.skillName
        })
      }
    })
  }

  updateSkill(){
    this.skill.skillName = this.skillName.value;
  }

  save(){

  }

}
