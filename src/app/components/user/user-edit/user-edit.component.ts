import { Component, Inject, OnInit, PLATFORM_ID, } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CurrentUserDTO } from '../../../models/user-models';
import { UserService } from '../../../services/user.service';
import {MatListModule} from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { userEditForm } from '../../../models/user-formType-model';
import { CommonModule } from '@angular/common';
import { CommonFunctionService } from '../../../services/common-function.service';
import { cityDTO, countryDTO } from '../../../models/common-models';
import { CommonService } from '../../../services/common.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { isPlatformBrowser } from '@angular/common';
import { StatusCodes } from '../../../common/constant';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { ChangePasswordComponent } from '../change-password/change-password.component';


@Component({
    selector: 'app-user-edit',
    standalone: true,
    templateUrl: './user-edit.component.html',
    styleUrl: './user-edit.component.css',
    imports: [HeaderComponent,MatCardModule, MatButtonModule, MatDividerModule,MatFormFieldModule, MatInputModule,
      MatSelectModule,MatListModule,CommonModule,FormsModule,ReactiveFormsModule,MatSnackBarModule]
})

export class UserEditComponent implements OnInit{
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
    private snackBar: MatSnackBar, @Inject(PLATFORM_ID) private platformId: Object, public dialog: MatDialog
  ){
    this.userData = this.userService.currentUserValue();
    this.selectedCityId = this.userData.cityId;
    this.selectedCountryId = this.userData.countryId;
    this.userEditForm.patchValue({
      ... this.userData,
      city: this.userData.cityId.toString(),
      country: this.userData.countryId.toString()
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
      console.log(this.userData);
      this.userService.updateUser(this.userData).subscribe(result =>
        {
          if(result.code == 200 && result.data != null){
            this.snackBar.open('Save Successfully', 'OK', { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' });

            if (isPlatformBrowser(this.platformId)) {
              this.userService.currentUser.next(result.data);
              localStorage.setItem("currentUser", JSON.stringify(result.data));
              this.userEditForm.patchValue({
                ...this.userService.currentUserValue(),
                city: this.userService.currentUserValue().cityId.toString(),
                country: this.userService.currentUserValue().countryId.toString()});
            }
          }
        }
      )
    }
  }

  openDialog(){
    const dialogRef = this.dialog.open(ChangePasswordComponent);
  }

}
