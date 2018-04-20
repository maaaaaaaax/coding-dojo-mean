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

  ngOnInit() {
    this.newAuthor = { name: "" }
  }

  newAuthorComponent(){
    console.log("in new.component.ts - newAuthor()");
    // add observable
    let o = this._httpService.addAuthor(this.newAuthor);
    o.subscribe(data => {
      console.log(data);
      this.newAuthor = { name: "" }
      this._router.navigate(['/home']);
    })
  }

}
