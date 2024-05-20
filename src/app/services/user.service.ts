import { HttpClient} from '@angular/common/http';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CurrentUserDTO, LoginDTO, RegisterDTO, ResetPasswordDTO } from '../models/user-models';
import { ApiResponseDTO } from '../models/apiresponse-model';
import { baseAPIUrl, endPoint } from '../common/constant';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  public isLoggedIn = new BehaviorSubject<boolean>(false);
  public currentUser = new BehaviorSubject<any>(null);

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
