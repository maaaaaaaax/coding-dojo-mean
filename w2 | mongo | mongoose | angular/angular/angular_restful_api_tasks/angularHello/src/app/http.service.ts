import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class HttpService {
  constructor(private _http: HttpClient){
    this.getTasks();
  }

  getTasks(){
    // Return the observable to wherever the getTasks method was invoked.
    return this._http.get('/tasks');
  }

  addTask(input){
    console.log("we're in service now")
    console.log(input.title)
    console.log('/new/'+input.title+'/'+input.description)
    return this._http.post('/tasks', input);
  }

  deleteTask(id){
    console.log("we're in service deleteTask() now")
    console.log(id)
    console.log('/tasks/'+id)
    return this._http.delete('/tasks/'+id);
  }

  editTask(editATask){
    console.log("in http.service.ts editTask()")
    console.log("editATask: ", editATask);
    return this._http.put('/tasks/'+editATask._id, editATask)
  }

}
