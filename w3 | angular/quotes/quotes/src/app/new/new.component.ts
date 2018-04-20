import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ){}

  newAuthor: any;
  name_error = "";

  ngOnInit() {
    this.newAuthor = { name: "" }
    this.name_error = ""
  }

  newAuthorComponent(){
    console.log("in new.component.ts - newAuthor()");
    if(this.newAuthor['name'].length < 3){
      this.name_error = "Name must be 3 characters."
      console.log(this.name_error);
    } else {
      // add observable
      let o = this._httpService.addAuthor(this.newAuthor);
      o.subscribe(data => {
        console.log(data);
        this.newAuthor = { name: "" };
        // add if statement to set data of errors to name_error, and add else to navigate
        this._router.navigate(['/home']);
      })
    };

  }

}
