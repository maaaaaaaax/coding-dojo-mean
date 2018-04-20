import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ){}

  author: any;
  quotes: any;
  id: any;

  ngOnInit() {
    this._route.params.subscribe((params: Params) => this.id = params['id']);
    this.getOneAuthorComponent(this.id);
  }

  getOneAuthorComponent(id){
    console.log("in write.component.ts - getOneAuthorComponent(id)", id);
    // add observable
    let o = this._httpService.getOneAuthor(id);
    o.subscribe(data => {
      console.log("Got one author: ", data);
      this.author = data['data'];
      this.quotes = this.author.quotes;
      console.log("this.quotes: ", this.quotes)
    })
  }

  // upvote(author_id,quote_id){
  //   let o = this._httpService.upvoteQuote(author_id,quote_id);
  //   o.subscribe(data => {
  //     console.log("Got one author: ", data);
  //     this.getOneAuthorComponent(this.id);
  //   })
  // }
  //
  // downvote(author_id,quote_id){
  //   let o = this._httpService.downvoteQuote(author_id,quote_id);
  //   o.subscribe(data => {
  //     console.log("Got one author: ", data);
  //     this.getOneAuthorComponent(this.id);
  //   })
  // }
  //
  // deleteQuoteComponent(author_id,quote_id){
  //   let o = this._httpService.deleteQuote(author_id,quote_id);
  //   o.subscribe(data => {
  //     console.log("Got one author: ", data);
  //     this.getOneAuthorComponent(this.id);
  //   })
  // }

}
