import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  pet: any;
  id: any;
  name_error = "";
  type_error = "";
  description_error = "";
  noerrors = true;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ){}
  //
  // editAuthor: any;

  ngOnInit() {
    this._route.params.subscribe((params: Params) => this.id = params['id']);
    this.getOnePetComponent(this.id);
    this.name_error = ""
    this.type_error = ""
    this.description_error = ""
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

  editPetComponent(){
    this.name_error = ""
    this.type_error = ""
    this.description_error = ""
    console.log("in edit.component.ts - editAuthor()", this.pet);
    // add observable
    if(this.pet['name'].length < 3){
      this.name_error = "Name must be 3 characters."
      console.log(this.name_error);
      this.noerrors = false;
    }
    if(this.pet['type'].length < 3){
      this.type_error = "Type must be 3 characters."
      console.log(this.type_error);
      this.noerrors = false;
    }
    if(this.pet['description'].length < 3){
      this.description_error = "Description must be 3 characters."
      console.log(this.description_error);
      this.noerrors = false;
    }
    if(this.noerrors == true){
      let o = this._httpService.editPet(this.pet);
      o.subscribe(data => {
        console.log(data);
        this._router.navigate(['/home']);
      })
    }
    this.noerrors = true;
  }

}
