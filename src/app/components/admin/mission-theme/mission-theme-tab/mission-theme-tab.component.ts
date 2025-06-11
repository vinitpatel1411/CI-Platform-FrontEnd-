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
import { missionThemeDTO } from '../../../../models/mission-models';
import { MissionService } from '../../../../services/mission.service';
import { MatDialog } from '@angular/material/dialog';
import { StatusCodes } from '../../../../common/constant';
import { MissionThemeService } from '../../../../services/mission-theme.service';
import { AddMissionThemeComponent } from '../add-mission-theme/add-mission-theme.component';
import { EditMissionThemeComponent } from '../edit-mission-theme/edit-mission-theme.component';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-mission-theme-tab',
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
  templateUrl: './mission-theme-tab.component.html',
  styleUrl: './mission-theme-tab.component.css'
})
export class MissionThemeTabComponent {
  missionTheme: missionThemeDTO[] = [];

  displayedColumns: string[] = ['title', 'action'];
  dataSource: MatTableDataSource<missionThemeDTO>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private snackBar : MatSnackBar,
    private missionThemeService : MissionThemeService
  ){
    this.missionThemeService.getMissionThemes().subscribe(result =>{
      if(result.code === StatusCodes.Ok){
        this.missionTheme = result.data;
        this.dataSource = new MatTableDataSource(this.missionTheme);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
    this.dataSource = new MatTableDataSource(this.missionTheme);
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

  openAddMissionThemeDialog(){
    const dialogRef = this.dialog.open(AddMissionThemeComponent,
      {
        width:'25%',
        height:'35%'
      }
    )

    dialogRef.afterClosed().subscribe(result => {
      this.missionThemeService.getMissionThemes().subscribe(result => {
        if(result.code === StatusCodes.Ok){
          this.missionTheme = result.data;
          this.dataSource.data = [... this.missionTheme];
        }
      })
    })
  }

  openEditMissionThemeDialog(missionTheme:missionThemeDTO){
    const dialogRef = this.dialog.open(EditMissionThemeComponent,{
      width:'25%',
      height:'35%',
      data: {id: missionTheme.id}
    })

    dialogRef.afterClosed().subscribe(result => {
      this.missionThemeService.getMissionThemes().subscribe(result => {
        if(result.code === StatusCodes.Ok){
          this.missionTheme = result.data;
          this.dataSource.data = [... this.missionTheme];
        }
      })
    })
  }

  openDeleteMissionThemeDialog(missionThemeDTO : missionThemeDTO){
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '35%',
      height:'30%',
      data: { text:"Mission-Theme"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.missionThemeService.deleteMissionTheme(missionThemeDTO.id).subscribe(result => {
          if(result.code === StatusCodes.Ok){
            this.missionThemeService.getMissionThemes().subscribe(result => {
              if(result.code === StatusCodes.Ok){
                this.missionTheme =  result.data;
                this.dataSource.data = [...this.missionTheme];
              }
            })
            this.snackBar.open('Mission-Theme Deleted Successfully', 'OK', { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' });
          }
        });
      }
    });
  }
}
