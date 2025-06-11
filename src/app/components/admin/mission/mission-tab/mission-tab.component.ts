import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MissionService } from '../../../../services/mission.service';
import { StatusCodes } from '../../../../common/constant';
import { MatDialog } from '@angular/material/dialog';
import { AddmissionComponent } from '../addmission/addmission.component';
import { EditMissionComponent } from '../edit-mission/edit-mission.component';
import { missionDTO } from '../../../../models/mission-models';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-mission-tab',
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
  templateUrl: './mission-tab.component.html',
  styleUrl: './mission-tab.component.css'
})
export class MissionTabComponent implements AfterViewInit{
  missionList: missionDTO [] = [];
  displayedColumns: string[] = ['title', 'missionType', 'startDate', 'endDate', 'action'];
  dataSource: MatTableDataSource<missionDTO>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private misisonService: MissionService, public dialog: MatDialog, private snackBar : MatSnackBar){
    this.misisonService.GetMissionList().subscribe(result =>{
      if(result.code === StatusCodes.Ok){
        this.missionList = result.data;
        this.dataSource = new MatTableDataSource(this.missionList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
    this.dataSource = new MatTableDataSource(this.missionList);
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

  openAddMissionDialog(){
    const dialogRef = this.dialog.open(AddmissionComponent,{
      width: '60%',
      height: '95%'
    })

    dialogRef.afterClosed().subscribe(result => {
      this.misisonService.GetMissionList().subscribe(result => {
        if(result.code === StatusCodes.Ok){
          this.misisonService.GetMissionList().subscribe(result => {
            this.missionList = result.data;
            this.dataSource.data = [...this.missionList];
          });
        }
      })
    })
  }

  openEditButtonDialog(mission:missionDTO){
    const dialogRef = this.dialog.open(EditMissionComponent, {
      width: '60%',
      height:'95%',
      data:{mission}
    })

    dialogRef.afterClosed().subscribe(result => {
      this.misisonService.GetMissionList().subscribe(result => {
        if(result.code === StatusCodes.Ok){
          this.missionList = result.data;
          this.dataSource.data = [ ... this.missionList];
        }
      })
    })
  }

  deleteUser(missionDTO: missionDTO){
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '35%',
      height:'30%',
      data: { text:"Mission"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.misisonService.deleteMission(missionDTO.id).subscribe(result => {
          if(result.code === StatusCodes.Ok){
            this.misisonService.GetMissionList().subscribe(result => {
              if(result.code === StatusCodes.Ok){
                this.missionList =  result.data;
                this.dataSource.data = [...this.missionList];
              }
            })
            this.snackBar.open('Mission Deleted Successfully', 'OK', { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' });
          }
        });
      }
      // else{
      //   this.snackBar.open('Failed to Delete User, Plesae try again later', 'OK', { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' });
      // }
    });
  }

}
