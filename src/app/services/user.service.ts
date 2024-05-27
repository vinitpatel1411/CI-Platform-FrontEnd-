import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CurrentUserDTO, LoginDTO, RegisterDTO, ResetPasswordDTO, changePasswordDTO, checkOldPasswordDTO } from '../models/user-models';
import { ApiResponseDTO } from '../models/apiresponse-model';
import { StatusCodes, baseAPIUrl, endPoint } from '../common/constant';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  public isLoggedIn = new BehaviorSubject<boolean>(false);
  public currentUser = new BehaviorSubject<any>(null);
  public userRole:string = "";

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }
  private url:string = "";

  CreateUser(model:RegisterDTO): Observable<ApiResponseDTO> {
    return this.http.post<ApiResponseDTO>(baseAPIUrl + endPoint.Register,model);
  }

  IsUserExist(email:string | null):Observable<ApiResponseDTO>{
    return this.http.get<ApiResponseDTO>(baseAPIUrl + endPoint.IsUserExist + "?email=" + email);
  }

  CheckPassWord(token:string | null, password: string | null):Observable<ApiResponseDTO>{
    return this.http.get<ApiResponseDTO>(baseAPIUrl + endPoint.CheckPassWord + "?token=" + token + "&password=" + password);
  }

  Login(body: LoginDTO): Observable<ApiResponseDTO> {
    return this.http.post<ApiResponseDTO>(baseAPIUrl + endPoint.Login, body);
  }

  ForgotPassword(email: string | null | undefined): Observable<ApiResponseDTO> {
    return this.http.get<ApiResponseDTO>(baseAPIUrl + endPoint.ForgotPassword + "?email=" + email);
  }

  ResetPassword(body: ResetPasswordDTO): Observable<ApiResponseDTO> {
    return this.http.post<ApiResponseDTO>(baseAPIUrl + endPoint.ResetPassword, body);
  }

  updateUser(updatedUser: CurrentUserDTO) : Observable<ApiResponseDTO>{
    return this.http.post<ApiResponseDTO>(baseAPIUrl + endPoint.UpdateUser, updatedUser);
  }

  isEmployeeIdUnique(employeeId : string | null) :Observable<ApiResponseDTO>{
    return this.http.get<ApiResponseDTO>(baseAPIUrl + endPoint.IsEmployeeIdUnique + "?employeeId=" + employeeId);
  }

  checkOldPassword(model: checkOldPasswordDTO) : Observable<ApiResponseDTO>{
    return this.http.post<ApiResponseDTO>(baseAPIUrl + endPoint.checkOldPassword, model);
  }

  changePassword(model: changePasswordDTO) : Observable<ApiResponseDTO>{
    return this.http.post<ApiResponseDTO>(baseAPIUrl + endPoint.changePassword,model);
  }

  getUserDetails(email: string) : Observable<ApiResponseDTO>{
    return this.http.get<ApiResponseDTO>(baseAPIUrl + endPoint.GetUserDetails + "/" + email);
  }

  getUserRole(email: string) : void{
    this.http.get<ApiResponseDTO>(baseAPIUrl + endPoint.GetUserRole + "/" + email).subscribe(result => {
      if(result.code === StatusCodes.Ok){
        this.userRole = result.data;
      }
    })
  }

  getUsers(): Observable<ApiResponseDTO>{
    return this.http.get<ApiResponseDTO>(baseAPIUrl + endPoint.GetUsers);
  }

  updateUserStatus(userDTO: CurrentUserDTO) : Observable<ApiResponseDTO>{
    return this.http.post<ApiResponseDTO>(baseAPIUrl + endPoint.UpdateUserStatus, userDTO);
  }

  deleteUser(userDTO: CurrentUserDTO) : Observable<ApiResponseDTO>{
    const url = `${baseAPIUrl}${endPoint.DeleteUser}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: userDTO
    };
    return this.http.request<ApiResponseDTO>('delete', url, options);
  }

  public currentUserValue(): any {
    if (isPlatformBrowser(this.platformId)){
      const user = localStorage.getItem('currentUser');
      if (user) {
        return JSON.parse(user);
      }
    }
     else {
      return null;
    }
  }
}
