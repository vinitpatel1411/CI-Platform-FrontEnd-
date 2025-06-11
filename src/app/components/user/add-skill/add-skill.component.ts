import { Component, Inject, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { skillDTO } from '../../../models/mission-models';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { SkillDTO } from '../../../models/mission-listing.model';
import { CommonModule } from '@angular/common';
import { MissionService } from '../../../services/mission.service';
import { StatusCodes } from '../../../common/constant';

@Component({
  selector: 'app-add-skill',
  standalone: true,
  imports: [MatListModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CommonModule
  ],
  templateUrl: './add-skill.component.html',
  styleUrl: './add-skill.component.css'
})
export class AddSkillComponent implements OnInit{
  availableSkills: skillDTO[] = [];
  selectedSkills: skillDTO[] = [];

  constructor(public dialogRef: MatDialogRef<AddSkillComponent>, @Inject(MAT_DIALOG_DATA) public data: { userSkills:SkillDTO[]  },
              private missionService: MissionService){
    this.selectedSkills = data.userSkills;
  }

  selectItem(item: skillDTO): void {
    const index = this.availableSkills.indexOf(item);
    if (index >= 0) {
      this.availableSkills.splice(index, 1);
      this.selectedSkills.push(item);
    }
  }

  deselectItem(item: skillDTO): void {
    const index = this.selectedSkills.indexOf(item);
    if (index >= 0) {
      this.selectedSkills.splice(index, 1);
      this.availableSkills.push(item);
    }
  }

  ngOnInit(): void {
    this.missionService.getAllSkills().subscribe(result => {
      if(result.code === StatusCodes.Ok){
        this.availableSkills = result.data;
        this.updateAvailableSkills();
      }
    })

  }
  updateAvailableSkills() {
    this.availableSkills = this.availableSkills.filter(skill =>
      !this.selectedSkills.some(selected => selected.skillId === skill.skillId)
    );
  }

  onCancelClick(){
    this.dialogRef.close();
  }
}

