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
mongoose.connect('mongodb://localhost/1955_api');
mongoose.Promise = global.Promise;

var UserSchema = new mongoose.Schema({
  name: String
}, {timestamps: true});
mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
var User = mongoose.model('User') // We are retrieving this Schema from our Models, named 'User'

// create the express app
var app = express();
app.use(session({secret: 'shhhhhh'}));
// configure body-parser to read JSON
app.use(bodyParser.json());

// setting up static content folder
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


// ROUTES

app.get('/', function(req, res){
  User.find({}, function(err, users){
    if(err){
       console.log("Returned error", err);
        // respond with JSON
       res.json({message: "Error", error: err})
    }
    else {
        // respond with JSON
       res.json({message: "Success", data: users})
    }
  })
})

app.get('/new/:name/', function(req, res){
  var name = req.params.name
  var user = new User({name: name});
  // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
  user.save(function(err) {
    // if there is an error console.log that something went wrong!
    if(err) {
      console.log('something went wrong');
      console.log("error: " + err);
      res.json({message: "Error", error: err})
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully added a user!');
      res.redirect('/');
    }
  })
})

app.get('/remove/:name/', function(req, res){
  console.log(req.params.name);
  // ...delete 1 record by a certain key/value.
  User.remove({name:req.params.name}, function(err){
  // This code will run when the DB has attempted to remove one matching record to {_id: 'insert record unique id here'}
    if(err) {
      console.log('something went wrong');
    } else { // else console.log that we did well and then redirect to the root route
    console.log('successfully deleted a user!');
    res.redirect('/');
    }
  })
})

app.get('/:name', function(req, res){
  var name = req.params.name;
  User.findOne({name:name}, function(err, user){
    if(err){
       console.log("Returned error", err);
        // respond with JSON
       res.json({message: "Error", error: err})
    }
    else {
      // respond with JSON
      if(user===null){
        console.log(user);
        res.json({message: "User not found", data: user});
      }
      else{
        console.log(user);
        res.json({message: "Success", data: user});
      }
    }
  })
})

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})
