import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MissionDTO, MissionSearchDTO } from '../../../models/mission-listing.model';
import { CurrentUserDTO } from '../../../models/user-models';
import { CommonFunctionService } from '../../../services/common-function.service';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { HttpStatusCode } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MissionService } from '../../../services/mission.service';
import { HeaderComponent } from "../../header/header.component";


@Component({
    selector: 'app-mission-listing',
    standalone: true,
    templateUrl: './mission-listing.component.html',
    styleUrl: './mission-listing.component.css',
    imports: [
        CommonModule,
        MatDividerModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatGridListModule,
        MatCardModule,
        MatSnackBarModule,
        MatChipsModule,
        HeaderComponent
    ]
})
export class MissionListingComponent {
  sortBy = new FormControl('');
  sortByList: string[] = ['Newest', 'Oldest'];
  isGridView = true;
  missionList: MissionDTO[] = [];
  currentUserData: CurrentUserDTO;
  filterMission: MissionSearchDTO;
  myWatchList: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private missionService: MissionService,
    public commonFunctionService: CommonFunctionService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.currentUserData = inject(UserService).currentUserValue();
    this.filterMission = {
      cityId: [],
      countryId: [],
      skillId: [],
      themeId: [],
      searchByText: '',
      SortOrder: '',
      userId: this.currentUserData != null ? this.currentUserData.id : 0,
    };
  }

  ngOnInit(): void {
    this.sortBy.valueChanges.subscribe((value) => {
      this.filterMission.SortOrder = value || '';
      this.getMissionList(this.filterMission, this.myWatchList);
    });
    this.getMissionList(this.filterMission, this.myWatchList);

    this.getMissions();
  }

  getMissions = (): void => {
    this.missionService.GetMission(this.currentUserData.id).subscribe((result) => {
      this.missionList = result.data;
    })
  }

  getMissionList = (value: MissionSearchDTO, data: boolean): void => {
    value.userId = this.currentUserData != null ? this.currentUserData.id : 0;
    this.filterMission = value;
    this.missionService.GetMissionsByFilter(value).subscribe((result) => {
      this.missionList = result.data;
      if (data)
        this.missionList = this.missionList.filter(a => a.isFavourite == data);
    });
  };

  onFilterMissionChange = (values: MissionSearchDTO): void => {
    this.getMissionList(values, this.myWatchList);
  };

  addToFavourite = (missionId: number): void => {
    this.missionService
      .AddToFavourite({
        missionId: missionId,
        userId: this.currentUserData.id,
      })
      .subscribe((res) => {
        if (res.code == HttpStatusCode.Ok && res) {
          this.snackBar.open('Done!', 'OK', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.getMissionList(this.filterMission, this.myWatchList);
        } else {
          this.snackBar.open('Error Occur!', 'OK', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      });
  };

  openDialog(id: number) {
    // const dialogRef = this.dialog.open(RecommandMissionDialogComponent, {
    //   data: { missionId: id, userId: this.currentUserData != null ? this.currentUserData.id : 0 }
    // });
  }

  GetData(data: boolean) {
    this.myWatchList = data;
    this.getMissionList(this.filterMission, this.myWatchList);
  }

  redirectToVolunteer = (missionId: number): void => {
    this.router.navigateByUrl(`/volunteering-mission/${missionId}`);
  };
}
