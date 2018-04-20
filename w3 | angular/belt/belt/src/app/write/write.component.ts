import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {

    constructor(
      private _httpService: HttpService,
      private _route: ActivatedRoute,
      private _router: Router
    ){}

    author: any;
    id: any;
    newQuote: any;
    quote_error = "";

    ngOnInit() {
      this._route.params.subscribe((params: Params) => this.id = params['id']);
      this.getOneAuthorComponent(this.id);
      this.newQuote = { content: "", score: 0 }
      this.quote_error = ""
    }

    getOneAuthorComponent(id){
      console.log("in write.component.ts - getOneAuthorComponent(id)", id);
      // add observable
      let o = this._httpService.getOneAuthor(id);
      o.subscribe(data => {
        console.log(data);
        this.author = data['data'];
      })
    }

    newQuoteComponent(){
      console.log("in write.component.ts - newQuoteComponent()");
      if(this.newQuote['content'].length < 3){
        this.quote_error = "Quote must be at least 3 characters."
        console.log(this.quote_error);
      } else {
        // update quote object
        this.newQuote = { content: this.newQuote['content'], author_id: this.id }
        // add observable
        let o = this._httpService.addQuote(this.newQuote);
        o.subscribe(data => {
          console.log(data);
          this.newQuote = { content: "", score: 0 };
          // add if statement to set data of errors to name_error, and add else to navigate
          this._router.navigate(['/home']);
        })
      };

    }

  }
