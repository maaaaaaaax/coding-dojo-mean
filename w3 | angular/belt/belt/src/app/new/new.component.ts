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

  newPet: any;
  name_error = "";
  type_error = "";
  description_error = "";
  noerrors = true;

  ngOnInit() {
    this.newPet = { name: "", type: "", description: "", skill1: "", skill2: "", skill3: "" }
    this.name_error = ""
    this.type_error = ""
    this.description_error = ""
  }

  newPetComponent(){
    console.log("in new.component.ts - newAuthor()");
    if(this.newPet['name'].length < 3){
      this.name_error = "Name must be 3 characters."
      console.log(this.name_error);
      this.noerrors = false;
    }
    if(this.newPet['type'].length < 3){
      this.type_error = "Type must be 3 characters."
      console.log(this.type_error);
      this.noerrors = false;
    }
    if(this.newPet['description'].length < 3){
      this.description_error = "Description must be 3 characters."
      console.log(this.description_error);
      this.noerrors = false;
    }
    if(this.noerrors == true){
      let o = this._httpService.addPet(this.newPet);
      o.subscribe(data => {
        console.log(data);
        this.newPet = { name: "", type: "", description: "" };
        // add if statement to set data of errors to name_error, and add else to navigate
        this._router.navigate(['/home']);
      });
    }
    this.noerrors = true;
  }


}
