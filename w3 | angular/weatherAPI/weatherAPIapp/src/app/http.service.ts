import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient){}

  getWeather(id){
    return this._http.get("http://api.openweathermap.org/data/2.5/forecast?id="+id+"&APPID=2a3c060e9f150b3410dc7aef3333bd79");
  }
}
