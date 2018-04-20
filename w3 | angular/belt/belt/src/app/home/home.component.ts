import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _httpService: HttpService){}

  pets: any;

  ngOnInit() {
    this.getPetsFromService();
  }

  getPetsFromService(){
    let o = this._httpService.getPets();
    o.subscribe(data => {
      console.log("Got our pets!", data)
      this.pets = data['data']
      console.log("this.pets: ")
      console.log(this.pets)
    });
  }

  deletePet(id){
    console.log("in home.component.ts - deletePet()" + id);
    // add observable
    let o = this._httpService.deletePet(id);
    o.subscribe(data => {
      console.log(data);
      this.getPetsFromService();
    })
  }

}
