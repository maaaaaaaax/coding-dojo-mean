// require express, body-parser, express-session
var express = require("express");
const bodyParser = require('body-parser');
// var bodyParser = require('body-parser');
var session = require('express-session');
var path = require("path");
var mongoose = require('mongoose');
var moment = require('moment');
// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/weatherAPIapp');
mongoose.Promise = global.Promise;

var TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean
}, {timestamps: true});
mongoose.model('Task', TaskSchema); // We are setting this Schema in our Models as 'User'
var Task = mongoose.model('Task') // We are retrieving this Schema from our Models, named 'User'

// create the express app
var app = express();
app.use(session({secret: 'shhhhhh'}));
// configure body-parser to read JSON
app.use(bodyParser.json());

// setting up static content folder

app.use(express.static( __dirname + '/weatherAPIapp/dist' ));
// setting up ejs and our views folder
// app.set('views', path.join(__dirname, './views'));
// app.set('view engine', 'ejs');


// ROUTES
// DON'T USE '/' AS A ROUTE - ANGULAR USES THAT

app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./weatherAPIapp/dist/index.html"))
});

// app.get('/tasks', function(req, res){
//   Task.find({}, function(err, tasks){
//     if(err){
//        console.log("Returned error: " + err);
//         // respond with JSON
//        res.json({message: "Error", error: err})
//     }
//     else {
//         // respond with JSON
//        res.json({message: "Success", data: tasks})
//     }
//   })
// })

// create a task
// app.get('/new/:title/:description', function(req, res){
//   var title = req.params.title
//   var description = req.params.description
//   var task = new Task({title: title, description: description, completed: false});
//   // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
//   task.save(function(err) {
//     // if there is an error console.log that something went wrong!
//     if(err) {
//       console.log('something went wrong');
//       console.log("error: " + err);
//       res.json({message: "Error", error: err})
//     } else { // else console.log that we did well and then redirect to the root route
//       console.log('successfully added a task!');
//       res.redirect('/');
//     }
//   })
// })

// create a task with post method

// app.post('/tasks', function(req, res) {
//   console.log("POST DATA", req.body);
//   var task = new Task(req.body);
//   task.completed = false;
//   task.save(function(err) {
//     // if there is an error console.log that something went wrong!
//     if(err) {
//       console.log('something went wrong');
//       console.log("error: " + err);
//       res.json({message: "Error", error: err})
//     } else { // else console.log that we did well and then redirect to the root route
//       console.log('successfully added a task!');
//       res.json({message: "successfully added a new task"});
//     }
//   })
// })

// delete a task by ID
// app.delete('/tasks/:id', function(req, res){
//   console.log(req.params.id);
//   // ...delete 1 record by a certain key/value.
//   Task.remove({_id:req.params.id}, function(err){
//   // This code will run when the DB has attempted to remove one matching record to {_id: 'insert record unique id here'}
//     if(err) {
//       console.log('something went wrong');
//       res.json({message: "Error", error: err});
//     } else { // else console.log that we did well and then redirect to the root route
//         console.log('successfully deleted a task!');
//         res.json({message: "successfully deleted a task"});
//     }
//   })
// })

// retrieve a task by ID
// app.get('/:id', function(req, res){
//   var id = req.params.id;
//   Task.findOne({_id:id}, function(err, task){
//     if(err){
//        console.log("Returned error", err);
//         // respond with JSON
//        res.json({message: "Error", error: err})
//     }
//     else {
//       // respond with JSON
//       if(task===null){
//         console.log(user);
//         res.json({message: "Task not found", data: task});
//       }
//       else{
//         console.log(task);
//         res.json({message: "Success", data: task});
//       }
//     }
//   })
// })

// update a task by ID

// app.put('/tasks/:id', function(req, res) {
//   // create a new User with the name and age corresponding to those from req.body
//   console.log(req.body)
//   var id = req.body._id;
//   var title = req.body.title;
//   var description = req.body.description;
//   var completed = req.body.completed;
//   Task.findOne({_id:id}, function(err, task){
//     task.title = title
//     task.description = description
//     task.completed = completed
//     task.save(function(err){
//       // if there is an error console.log that something went wrong!
//       if(err) {
//         console.log('something went wrong');
//         res.json({message: "Error", error: err});
//       } else { // else console.log that we did well and then redirect to the root route
//         console.log('successfully updated a task!');
//         res.json({message: "successfully updated a task"});
//       }
//     })
//   })
// })


// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})
