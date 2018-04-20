import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-burbank',
  templateUrl: './burbank.component.html',
  styleUrls: ['./burbank.component.css']
})
export class BurbankComponent implements OnInit {

  constructor(private _httpService: HttpService) {
    this.display = []
  }

  ngOnInit(){
    this.getWeatherFromAPI()
  }
  getWeatherFromAPI(){
    let o = this._httpService.getWeather("5392171")
    o.subscribe(data =>
      {
          this.display = data;
          console.log(this.display)
      }
    )
  }
}
