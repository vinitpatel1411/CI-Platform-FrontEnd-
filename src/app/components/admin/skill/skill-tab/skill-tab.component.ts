import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SkillDTO } from '../../../../models/mission-listing.model';
import { skillDTO } from '../../../../models/mission-models';
import { MatDialog } from '@angular/material/dialog';
import { SkillService } from '../../../../services/skill.service';
import { StatusCodes } from '../../../../common/constant';
import { AddSkillComponent } from '../add-skill/add-skill.component';
import { EditSkillComponent } from '../edit-skill/edit-skill.component';

@Component({
  selector: 'app-skill-tab',
  standalone: true,
  imports: [MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIcon,
    CommonModule,
    MatSnackBarModule],
  templateUrl: './skill-tab.component.html',
  styleUrl: './skill-tab.component.css'
})
export class SkillTabComponent {
  skills : skillDTO[] = [];

  displayedColumns: string[] = ['skillName','status', 'action'];
  dataSource: MatTableDataSource<skillDTO>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private snackBar : MatSnackBar, private skillService : SkillService){
    this.skillService.getSkills().subscribe(result => {
      if(result.code === StatusCodes.Ok){
        this.skills = result.data;
        this.dataSource = new MatTableDataSource(this.skills);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })

    this.dataSource = new MatTableDataSource(this.skills);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getSkills(){
    this.skillService.getSkills().subscribe(result => {
      if(result.code === StatusCodes.Ok){
        this.skills = result.data;
        this.dataSource.data = [... this.skills];
      }
    })
  }

  toggleStatus(skill: skillDTO) {
    this.skillService.updateSkillStatus(skill.skillId).subscribe(result => {
      if(result.code === StatusCodes.Ok){
        this.getSkills();
      }
    })
  }

  openAddSkillDialog(){
    const dialogRef = this.dialog.open(AddSkillComponent,{
      width:'25%',
      height:'35%'
    })

    dialogRef.afterClosed().subscribe(result => {
      this.skillService.getSkills().subscribe(result => {
        if(result.code === StatusCodes.Ok){
          this.skills = result.data;
          this.dataSource.data = [...this.skills];
        }
      })
    })
  }

  openEditSkillDialog(skill : skillDTO){
    const dialog = this.dialog.open(EditSkillComponent, {
      width:'25%',
      height:'35%',
      data: {id : skill.skillId}
    })
  }

}
