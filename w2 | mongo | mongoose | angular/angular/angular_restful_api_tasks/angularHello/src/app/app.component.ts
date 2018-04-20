import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Restful Tasks API';

  constructor(private _httpService: HttpService){}

  num: number;
  randNum: number;
  str: string;
  first_name: string;
  snacks: string[];
  loggedIn: boolean;
  tasks = [];
  show: boolean;
  newTask: any;
  showForm = false;
  editATask: any;

  ngOnInit(){
    this.num = 7;
    this.randNum = Math.floor( (Math.random()  * 2 ) + 1);
    this.str = 'Hello Angular Developer!';
    this.first_name = 'Alpha';
    this.snacks = ["cold brew coffee", "maple glazed donut", "bacon"];
    this.loggedIn = true;
    this.newTask = { title: "", description: ""}
    this.editATask = { _id: "", title: "", description: "", completed: ""}
  }
  getTasksFromService(){
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log("Got our tasks!", data)
      this.tasks = data['data']
    });
  }
  // addAllTasksToHTML(){
  //   console.log("event received: addAllTasksToHTML");
  //   this.getTasksFromService();
  // }
  onSubmit(){
    console.log("in OnSubmit()")
    let observable = this._httpService.addTask(this.newTask);
    observable.subscribe(data => {
      console.log("got our data", data)
      this.newTask = { title: "", description: "" }
      this.getTasksFromService();
    })
  }
  showUpdate(id, title, description, completed){
    console.log("in showUpdate()");
    console.log(id);
    // toggle view
    this.showForm = !this.showForm
    this.editATask = { title: title, description: description, completed: completed, _id: id };
    // let observable = this._httpService.addTask(this.newTask);
    // observable.subscribe(data => {
    //   console.log("got our data", data)
    //   this.newTask = { title: "", description: "" }
    // })
  }
  submitEditTask(){
    console.log("in submitEditTask()");
    let o = this._httpService.editTask(this.editATask);
    o.subscribe(data => {
      console.log(data);
      this.showForm = false;
      this.getTasksFromService();
    })
  }
  onDelete(id){
    console.log("in onDelete()");
    console.log(id);
    // add observable
    let o = this._httpService.deleteTask(id);
    o.subscribe(data => {
      console.log(data);
      this.getTasksFromService();
    })
  }
    // let observable = this._httpService.addTask(this.newTask);
    // observable.subscribe(data => {
    //   console.log("got our data", data)
    //   this.newTask = { title: "", description: "" }
    // })
}
