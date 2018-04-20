import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _httpService: HttpService){}

  authors: any;

  ngOnInit() {
    this.getAuthorsFromService();
  }

  getAuthorsFromService(){
    let o = this._httpService.getAuthors();
    o.subscribe(data => {
      console.log("Got our authors!", data)
      this.authors = data['data']
    });
  }

  deleteAuthor(id){
    console.log("in home.component.ts - deleteAuthor()" + id);
    // add observable
    let o = this._httpService.deleteAuthor(id);
    o.subscribe(data => {
      console.log(data);
      this.getAuthorsFromService();
    })
  }

}
