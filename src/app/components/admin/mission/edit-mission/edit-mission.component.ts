import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { cityDTO, countryDTO } from '../../../../models/common-models';
import { missionDTO, missionThemeDTO, skillDTO } from '../../../../models/mission-models';
import { addMissionForm } from '../../../../models/mission-formType-model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '../../../../services/common.service';
import { CommonFunctionService } from '../../../../services/common-function.service';
import { MissionThemeService } from '../../../../services/mission-theme.service';
import { MissionService } from '../../../../services/mission.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StatusCodes } from '../../../../common/constant';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SkillDTO } from '../../../../models/mission-listing.model';


@Component({
  selector: 'app-edit-mission',
  standalone: true,
  providers: [provideNativeDateAdapter()
  ],
  imports: [MatDividerModule,MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule],
  templateUrl: './edit-mission.component.html',
  styleUrl: './edit-mission.component.css'
})
export class EditMissionComponent {
  cities: cityDTO[] = [];
  countries: countryDTO[] = [];
  missionTheme: missionThemeDTO[] = [];
  missionDTO: missionDTO;
  selectedCityId: number | null = 0;
  selectedCountryId: number | null = 0;
  missionSkills: SkillDTO[] = [];

  availableSkills: skillDTO[] = [];
  selectedSkills: skillDTO[] = [];

  addMissionForm: FormGroup<addMissionForm> = new FormGroup<addMissionForm>({
    title : new FormControl("", Validators.required),
    organization : new FormControl("", Validators.required),
    shortDescription : new FormControl("", Validators.required),
    description : new FormControl(""),
    startDate : new FormControl("", Validators.required),
    endDate : new FormControl(""),
    registrationDeadlineDate : new FormControl(""),
    totalSeats: new FormControl("", Validators.min(1)),
    availability : new FormControl(""),
    city : new FormControl("", Validators.required),
    country : new FormControl("", Validators.required),
    theme : new FormControl("", Validators.required),
    missionType : new FormControl("", Validators.required)
  });

  constructor(public dialogRef: MatDialogRef<EditMissionComponent>, private commonService: CommonService,
    public commonFunctionService: CommonFunctionService, private missionThemeService: MissionThemeService,
    private missionService: MissionService, private snackBar: MatSnackBar,  @Inject(MAT_DIALOG_DATA) public data: { mission: missionDTO })
  {
    this.missionDTO = data.mission;
    this.selectedCityId = this.missionDTO.cityId;
    this.selectedCountryId = this.missionDTO.countryId;

    // const startDate = this.missionDTO.startDate ? new Date(this.missionDTO.startDate) : null;
    // const endDate = this.missionDTO.endDate ? new Date(this.missionDTO.endDate) : null;
    // const registrationDeadlineDate = this.missionDTO.registrationDeadlineDate ? new Date(this.missionDTO.registrationDeadlineDate) : null;

    this.addMissionForm.patchValue({
      ... this.missionDTO,
      city:  this.missionDTO.cityId != null ? this.missionDTO.cityId.toString() : null,
      country: this.missionDTO.countryId != null ? this.missionDTO.countryId.toString() : null,
      totalSeats: this.missionDTO.totalSeats != null ? this.missionDTO.totalSeats.toString() : null,
      theme : this.missionDTO.themeId != null ? this.missionDTO.themeId.toString() : null,
      startDate:  this.missionDTO.startDate ? new Date(this.missionDTO.startDate) : null,
      endDate: this.missionDTO.endDate ? new Date(this.missionDTO.endDate) : null,
      registrationDeadlineDate: this.missionDTO.registrationDeadlineDate ? new Date(this.missionDTO.registrationDeadlineDate) : null,
    });
    this.loadCities(this.selectedCountryId);
    this.loadCountries(this.selectedCityId);
    this.getMissionThemes();
  }

  ngOnInit(): void {
    this.addMissionForm.get('city')?.valueChanges.subscribe(value =>
      {
        if(!isNaN(this.selectedCityId as number)){
          this.selectedCityId = this.commonService.convertToNumber(value);
          this.loadCountries(this.selectedCityId);
        }
      }
    );

    this.addMissionForm.get('country')?.valueChanges.subscribe(value =>
      {
        if(!isNaN(this.selectedCountryId as number)){
          this.selectedCountryId = this.commonService.convertToNumber(value);
          this.loadCities(this.selectedCountryId);
        }
      }
    )

    this.missionService.getAllSkills().subscribe(result =>{
      if(result.code === StatusCodes.Ok){
        this.availableSkills = result.data;
      }
    })

    this.getMissionSkills();
  }

  loadCities(selectedCountryId:number | null){
    if(!isNaN(selectedCountryId as number)){
      this.commonService.getCities(selectedCountryId).subscribe(result =>
        {
          this.cities = result.data;
        }
      )
    }
  }

  loadCountries(selectedCityId:number | null){
    if(!isNaN(selectedCityId as number)){
      this.commonService.getCountries(selectedCityId).subscribe(result =>
        {
          this.countries = result.data;
        }
      )
    }
  }

  getMissionThemes(){
    this.missionThemeService.getMissionThemes().subscribe(result => {
      if(result.code === StatusCodes.Ok){
        this.missionTheme = result.data;
      }
    })
  }

  onCloseClick(){
    this.dialogRef.close();
  }

  get title(){
    return this.addMissionForm.get('title') as FormControl;
  }

  get organization(){
    return this.addMissionForm.get('organization') as FormControl;
  }

  get shortDescription(){
    return this.addMissionForm.get('shortDescription') as FormControl;
  }

  get description(){
    return this.addMissionForm.get('description') as FormControl;
  }

  get startDate(){
    return this.addMissionForm.get('startDate') as FormControl;
  }

  get endDate(){
    return this.addMissionForm.get('endDate') as FormControl;
  }

  get registrationDeadlineDate(){
    return this.addMissionForm.get('registrationDeadlineDate') as FormControl;
  }

  get totalSeats(){
    return this.addMissionForm.get('totalSeats') as FormControl;
  }

  get cityId(){
    return this.addMissionForm.get('city') as FormControl;
  }

  get countryId(){
    return this.addMissionForm.get('country') as FormControl;
  }

  get availability(){
    return this.addMissionForm.get('availability') as FormControl;
  }

  get themeId(){
    return this.addMissionForm.get('theme') as FormControl;
  }

  get missionType(){
    return this.addMissionForm.get('missionType') as FormControl;
  }

  IntializeMissionDTO(){

    this.missionDTO.title = this.title.value;
    this.missionDTO.organization = this.organization.value;
    this.missionDTO.shortDescription = this.shortDescription.value;
    this.missionDTO.description = this.description.value;
    this.missionDTO.startDate = this.commonService.formatDate(new Date(this.startDate.value)),
    this.missionDTO.endDate = this.commonService.formatDate(new Date(this.endDate.value)),
    this.missionDTO.registrationDeadlineDate =  this.commonService.formatDate(new Date(this.registrationDeadlineDate.value)),
    this.missionDTO.totalSeats = this.totalSeats.value;
    this.missionDTO.cityId = this.cityId.value;
    this.missionDTO.countryId = this.countryId.value;
    this.missionDTO.availability = this.availability.value;
    this.missionDTO.themeId = this.themeId.value;
    this.missionDTO.missionType = this.missionType.value;
    this.missionDTO.skills = this.selectedSkills;
  }

  updateMission() : void{
    if(this.addMissionForm.valid){
      this.IntializeMissionDTO();
      this.missionService.UpdateMission(this.missionDTO).subscribe(result => {
        if(result.code === StatusCodes.Ok){
          this.snackBar.open('Update Mission Successfully', 'OK', { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' });
          this.dialogRef.close();
        }
        else{
          this.snackBar.open('Oops!, Something went wrong, Please try again later', 'OK', { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' });
        }
      })
    }
  }

  startDateFilter = (d: Date | null): boolean => {
    if (!d) return false;
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return d >= currentDate;
  };

  endDateFilter = (d: Date | null): boolean => {
    if (!d) return false;
    const startDate = this.startDate.value;
    if (!startDate) return true;
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    return d > start;
  };

  registrationDeadlineFilter = (d: Date | null): boolean => {
    if (!d) return false;
    const startDate = this.startDate.value;
    if (!startDate) return true;
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    return d < start;
  };

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

  updateAvailableSkills() {
    this.availableSkills = this.availableSkills.filter(skill =>
      !this.selectedSkills.some(selected => selected.skillId === skill.skillId)
    );
  }

  getMissionSkills(){
    this.missionService.GetMissionSkills(this.missionDTO.id).subscribe(result => {
      if(result.code === StatusCodes.Ok){
        this.missionSkills = result.data;
        this.selectedSkills = this.missionSkills;
        this.updateAvailableSkills();
      }
    })
  }
}




