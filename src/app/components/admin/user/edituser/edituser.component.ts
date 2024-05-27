import { CommonModule } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CurrentUserDTO } from '../../../../models/user-models';
import { cityDTO, countryDTO } from '../../../../models/common-models';
import { userEditForm } from '../../../../models/user-formType-model';
import { UserService } from '../../../../services/user.service';
import { CommonFunctionService } from '../../../../services/common-function.service';
import { CommonService } from '../../../../services/common.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { isPlatformBrowser } from '@angular/common';
import { ChangePasswordComponent } from '../../../user/change-password/change-password.component';

@Component({
  selector: 'app-edituser',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatDividerModule,MatFormFieldModule, MatInputModule,
    MatSelectModule,MatListModule,CommonModule,FormsModule,ReactiveFormsModule,MatSnackBarModule],
  templateUrl: './edituser.component.html',
  styleUrl: './edituser.component.css'
})
export class EdituserComponent implements OnInit{
  userData: CurrentUserDTO;
  cities: cityDTO[] = [];
  countries: countryDTO[] = [];
  selectedCityId: number | null = 0;
  selectedCountryId: number | null = 0;

  userEditForm: FormGroup<userEditForm> = new FormGroup<userEditForm>({
    firstName : new FormControl("", [Validators.required]),
    lastName : new FormControl("", [Validators.required]),
    employeeId : new FormControl(""),
    manager : new FormControl(""),
    title : new FormControl(""),
    department : new FormControl(""),
    profileText : new FormControl("", [Validators.required]),
    whyIVolunteer : new FormControl(""),
    city : new FormControl("",[Validators.required]),
    country : new FormControl("",[Validators.required]),
    availablity : new FormControl(""),
    linkedInUrl : new FormControl("")
  });

  constructor(private userService: UserService, public commonFunctionService:CommonFunctionService, private commonService: CommonService,
    private snackBar: MatSnackBar, @Inject(PLATFORM_ID) private platformId: Object, public dialog: MatDialog,
    public dialogRef: MatDialogRef<EdituserComponent>, @Inject(MAT_DIALOG_DATA) public data: { user: CurrentUserDTO  },
  ){
    this.userData = data.user;
    this.selectedCityId = this.userData.cityId;
    this.selectedCountryId = this.userData.countryId;
    this.userEditForm.patchValue({
      ... this.userData,
      city:  this.userData.cityId != null ? this.userData.cityId.toString() : null,
      country: this.userData.countryId != null ? this.userData.countryId.toString() : null
    });

    if(!isNaN(this.selectedCountryId))
      this.loadCities(this.selectedCountryId);
    if(!isNaN(this.selectedCityId))
      this.loadCountries(this.selectedCityId);
  }

  ngOnInit(): void {

    this.userEditForm.get('city')?.valueChanges.subscribe(value =>
      {
        if(!isNaN(this.selectedCityId as number)){
          this.selectedCityId = this.commonService.convertToNumber(value);
          this.loadCountries(this.selectedCityId);
        }
      }
    );

    this.userEditForm.get('country')?.valueChanges.subscribe(value =>
      {
        if(!isNaN(this.selectedCountryId as number)){
          this.selectedCountryId = this.commonService.convertToNumber(value);
          this.loadCities(this.selectedCountryId);
        }
      }
    )
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

  UpdateUserData(){
    this.userData.firstName = this.firstName.value;
    this.userData.lastName = this.lastName.value;
    this.userData.employeeId = this.employeeId.value;
    this.userData.availablity = this.availablity.value;
    this.userData.manager = this.manager.value;
    this.userData.title = this.title.value;
    this.userData.department = this.department.value;
    this.userData.profileText = this.profileText.value;
    this.userData.whyIVolunteer = this.whyIVolunteer.value;
    this.userData.cityId = this.cityId.value;
    this.userData.countryId = this.countryId.value;
    this.userData.linkedInUrl = this.linkedInUrl.value;
    // this.userData.cityId = this.selectedCityId as number;
    // this.userData.countryId = this.selectedCountryId as number;
  }

  get firstName(){
    return this.userEditForm.get('firstName') as FormControl;
  }

  get lastName(){
    return this.userEditForm.get('lastName') as FormControl;
  }

  get employeeId(){
    return this.userEditForm.get('employeeId') as FormControl;
  }

  get manager(){
    return this.userEditForm.get('manager') as FormControl;
  }

  get title(){
    return this.userEditForm.get('title') as FormControl;
  }

  get department(){
    return this.userEditForm.get('department') as FormControl;
  }

  get profileText(){
    return this.userEditForm.get('profileText') as FormControl;
  }

  get whyIVolunteer(){
    return this.userEditForm.get('whyIVolunteer') as FormControl;
  }

  get cityId(){
    return this.userEditForm.get('city') as FormControl;
  }

  get countryId(){
    return this.userEditForm.get('country') as FormControl;
  }

  get availablity(){
    return this.userEditForm.get('availablity') as FormControl;
  }

  get linkedInUrl(){
    return this.userEditForm.get('linkedInUrl') as FormControl;
  }

  save() : void{
    // this.userService.isEmployeeIdUnique(this.employeeId.value).subscribe(result =>
    //   {
    //     if(result.code === StatusCodes.Ok)
    //       this.userEditForm.controls.employeeId.setErrors({notUnique:true});
    //   })

    if(this.userEditForm.valid){
      this.UpdateUserData();
      // console.log(this.userData);
      this.userService.updateUser(this.userData).subscribe(result =>
        {
          if(result.code == 200 && result.data != null){
            this.snackBar.open('Edit Successfully', 'OK', { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' });
            this.dialogRef.close();
          }
        }
      )
    }
  }

  openDialog(){
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '50%',
      height:'70%',
      data: {email: this.userData.email}
    });
  }

  onCloseClick() :void{
    this.dialogRef.close();
  }
}
