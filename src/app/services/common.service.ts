import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseDTO } from '../models/apiresponse-model';
import { baseAPIUrl, endPoint } from '../common/constant';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private httClient: HttpClient) { }

  getCities(countryId:number | null) : Observable<ApiResponseDTO>{

    if(countryId != null)
      return this.httClient.get<ApiResponseDTO>(baseAPIUrl + endPoint.GetCities + "?countryId=" + countryId);
    else
      return this.httClient.get<ApiResponseDTO>(baseAPIUrl + endPoint.GetCities);
  }

  getCountries(cityId:number | null) : Observable<ApiResponseDTO>{

    if(cityId != null)
      return this.httClient.get<ApiResponseDTO>(baseAPIUrl + endPoint.GetCountries + "?cityId=" + cityId);
    else
      return this.httClient.get<ApiResponseDTO>(baseAPIUrl + endPoint.GetCountries);
  }

  convertToNumber(value: string | null) : number{
    if(value != null)
      return +value;
    else
      return 0;
  }
}
