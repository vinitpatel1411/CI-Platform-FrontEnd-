import { Injectable } from '@angular/core';
import { ApiResponseDTO } from '../models/apiresponse-model';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { baseAPIUrl, endPoint } from '../common/constant';
import { missionThemeDTO } from '../models/mission-models';

@Injectable({
  providedIn: 'root'
})
export class MissionThemeService {

  constructor(private http: HttpClient) { }

  getMissionThemes() : Observable<ApiResponseDTO>{
    return this.http.get<ApiResponseDTO>(baseAPIUrl + endPoint.GetMissionThemes);
  }

  addMissionTheme(title:string) : Observable<ApiResponseDTO>{
    const url = `${baseAPIUrl}${endPoint.AddMissionTheme}?title=${encodeURIComponent(title)}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ApiResponseDTO>(url, null, { headers });
  }

  getMissionThemeFromId(id:number) : Observable<ApiResponseDTO>{
    return this.http.get<ApiResponseDTO>(baseAPIUrl + endPoint.GetMissionThemeFromId + "?id=" + id);
  }

  editMissionTheme(missionThemeDTO : missionThemeDTO) : Observable<ApiResponseDTO>{
    return this.http.post<ApiResponseDTO>(baseAPIUrl + endPoint.EditMissionTheme , missionThemeDTO);
  }

  deleteMissionTheme(id : number) : Observable<ApiResponseDTO> {
    return this.http.delete<ApiResponseDTO>(baseAPIUrl + endPoint.DeleteMissionTheme + "/" + id);
  }
}
