import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseDTO } from '../models/apiresponse-model';
import { baseAPIUrl, endPoint } from '../common/constant';
import { skillDTO } from '../models/mission-models';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private http: HttpClient) { }

  getSkills() : Observable<ApiResponseDTO>{
    return this.http.get<ApiResponseDTO>(baseAPIUrl + endPoint.GetSkills);
  }

  updateSkillStatus(id : number) : Observable<ApiResponseDTO> {
    const url = `${baseAPIUrl}${endPoint.UpdateSkillStatus}/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ApiResponseDTO>(url, null, { headers });
  }

  addSkill(skill:skillDTO) : Observable<ApiResponseDTO>{
    return this.http.post<ApiResponseDTO>(baseAPIUrl + endPoint.AddSkill , skill);
  }

  updateSkill(skill:skillDTO) : Observable<ApiResponseDTO>{
    return this.http.post<ApiResponseDTO>(baseAPIUrl + endPoint.UpdateSkill,skill);
  }

  getSkillById(id:number) : Observable<ApiResponseDTO>{
    return this.http.get<ApiResponseDTO>(baseAPIUrl + endPoint.GetSkillById + "/" + id);
  }
}
