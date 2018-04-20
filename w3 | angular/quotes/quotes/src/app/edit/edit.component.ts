import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  author: any;
  id: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ){}
  //
  // editAuthor: any;

  ngOnInit() {
    this._route.params.subscribe((params: Params) => this.id = params['id']);
    this.getOneAuthorComponent(this.id);
    // this.editAuthor = { _id: req.params.id, name: "" }
  }

  getOneAuthorComponent(id){
    console.log("in edit.component.ts - getOneAuthorComponent()", id);
    // add observable
    let o = this._httpService.getOneAuthor(id);
    o.subscribe(data => {
      console.log(data);
      this.author = data['data'];
    })
  }

  editAuthorComponent(){
    console.log("in edit.component.ts - editAuthor()", this.author);
    // add observable
    let o = this._httpService.editAuthor(this.author);
    o.subscribe(data => {
      console.log(data);
      this._router.navigate(['/home']);
    })
  }

}
