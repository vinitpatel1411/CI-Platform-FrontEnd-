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

  formatDate(date: Date): string {
    const pad = (n: number): string => n < 10 ? '0' + n : n.toString();

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();

    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  // Function to parse a date string in the format dd/MM/yyyy to a Date object
  parseDate(dateString: string): Date | null {
    if (!dateString) return null;

    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is zero-based in JavaScript
    const year = parseInt(parts[2], 10);

    return new Date(year, month, day);
  }
}
