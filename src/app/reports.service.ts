import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private _HttpClient:HttpClient) { }

  getReports(country:string):Observable<any>{
    return this._HttpClient.get(`https://api.covid19api.com/live/country/${country}`);
  }

}
