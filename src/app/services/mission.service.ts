import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddToFavouriteDTO, CommentDTO, MissionRatingDTO, MissionSearchDTO, RecommandUserDTO, RelatedMisssionDTO } from '../models/mission-listing.model';
import { Observable, map } from 'rxjs';
import { ApiResponseDTO } from '../models/apiresponse-model';
import { baseAPIUrl, endPoint } from '../common/constant';
import { missionDTO } from '../models/mission-models';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor(private httpClient: HttpClient) { }

  GetMission(userId: Number): Observable<ApiResponseDTO>{
    return this.httpClient.get<ApiResponseDTO>(baseAPIUrl+ "Mission/missions" + "?userId=" +userId);
  }

  GetMissions(): Observable<ApiResponseDTO>{
    return this.httpClient.get<ApiResponseDTO>(baseAPIUrl+ "Mission/missions" + "?userId=" +1);
  }

  GetMissionList(): Observable<ApiResponseDTO>{
    return this.httpClient.get<ApiResponseDTO>(baseAPIUrl + endPoint.GetMissionList);
  }

  GetMissionSkills(missionId: number) : Observable<ApiResponseDTO>{
    return this.httpClient.get<ApiResponseDTO>(baseAPIUrl + endPoint.GetMissionSkills + "/" + missionId);
  }

  AddMission(missionDTO:missionDTO): Observable<ApiResponseDTO>{
    return this.httpClient.post<ApiResponseDTO>(baseAPIUrl + endPoint.AddMission, missionDTO);
  }

  UpdateMission(missionDTO: missionDTO): Observable<ApiResponseDTO>{
    return this.httpClient.post<ApiResponseDTO>(baseAPIUrl + endPoint.UpdateMission, missionDTO);
  }

  deleteMission(missionId:number):Observable<ApiResponseDTO>{
    return this.httpClient.delete<ApiResponseDTO>(baseAPIUrl + endPoint.DeleteMission + "?missionId=" + missionId);
  }

  GetMissionsByFilter(bodyData: MissionSearchDTO): Observable<ApiResponseDTO> {
    return this.httpClient.post<ApiResponseDTO>(baseAPIUrl + endPoint.GetMissionsByFilter, bodyData);
  }

  AddToFavourite(body: AddToFavouriteDTO): Observable<ApiResponseDTO> {
    return this.httpClient.post<ApiResponseDTO>(baseAPIUrl + endPoint.AddToFavourite, body);
  }

  GetVolunteeringMission(missionId: number, userId: number): Observable<ApiResponseDTO> {
    return this.httpClient.get<ApiResponseDTO>(`${baseAPIUrl}${endPoint.GetVolunteeringMission}/${missionId}/${userId}`);
  }

  SaveMissionApplication(body: AddToFavouriteDTO): Observable<ApiResponseDTO> {
    return this.httpClient.post<ApiResponseDTO>(baseAPIUrl + endPoint.SaveMissionApplication, body);
  }

  SaveComment(body: CommentDTO): Observable<ApiResponseDTO> {
    return this.httpClient.post<ApiResponseDTO>(baseAPIUrl + endPoint.SaveComment, body);
  }

  SaveMissionRatings(body: MissionRatingDTO): Observable<ApiResponseDTO> {
    return this.httpClient.post<ApiResponseDTO>(baseAPIUrl + endPoint.SaveRatings, body);
  }

  checkMissionApplied(missionId: number, userId: number): Observable<ApiResponseDTO> {
    return this.httpClient.get<ApiResponseDTO>(`${baseAPIUrl}${endPoint.checkMissionApplied}/${missionId}/${userId}`);
  }

  RecommandMissionToWorkers(missionId: number, userId: number, body: RecommandUserDTO[]): Observable<ApiResponseDTO> {
    const url = `${baseAPIUrl}${endPoint.RecommandMissionToWorkers}?missionId=${missionId}&userId=${userId}`;
    return this.httpClient.post<ApiResponseDTO>(url, body);
  }

  GetRelatedMission(bodyData: RelatedMisssionDTO): Observable<ApiResponseDTO> {
    return this.httpClient.post<ApiResponseDTO>(baseAPIUrl + endPoint.GetRelatedMission, bodyData);
  }

  getAllSkills(): Observable<ApiResponseDTO>{
    return this.httpClient.get<ApiResponseDTO>(baseAPIUrl + endPoint.GetAllSkills);
  }

  downloadPDF(url:string): Observable<Blob> {
    return this.httpClient.get(url, { responseType: 'blob' }).pipe(
      map((res: Blob) => {
        return new Blob([res], { type: 'application/pdf' });
      })
    );
  }

}
