import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) {
    this.getAuthors();
  }

  getAuthors(){
    // Return the observable to wherever the getTasks method was invoked.
    return this._http.get('/authors');
  }

  getOneAuthor(id){
    return this._http.get('/authors/'+id);
  }

  deleteAuthor(id){
    console.log("we're in service deleteAuthor() now. ID: "+id)
    return this._http.delete('/authors/'+id);
  }

  addAuthor(input){
    console.log("we're in http.service.ts now")
    console.log(input.name)
    console.log('/new/'+input.name)
    return this._http.post('/authors', input);
  }

  editAuthor(input){
    console.log("in http.service.ts editAuthor()", input);
    return this._http.put('/authors/'+input._id, input);
  }

}
