import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  pet: any;
  id: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ){}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => this.id = params['id']);
    this.getOnePetComponent(this.id);
    // this.editAuthor = { _id: req.params.id, name: "" }
  }

  getOnePetComponent(id){
    console.log("in edit.component.ts - getOneAuthorComponent()", id);
    // add observable
    let o = this._httpService.getOnePet(id);
    o.subscribe(data => {
      console.log(data);
      this.pet = data['data'];
    })
  }

  upvote(pet_id){
    let o = this._httpService.upvotePet(pet_id);
    o.subscribe(data => {
      console.log("Got one pet: ", data);
      this.getOnePetComponent(this.id);
    })
  }

  deletePetComponent(pet_id){
    let o = this._httpService.deletePet(pet_id);
    o.subscribe(data => {
      console.log("Got one author: ", data);
      this._router.navigate(['/home']);
    })
  }

}
