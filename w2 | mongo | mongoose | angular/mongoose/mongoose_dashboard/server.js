// require express, body-parser, express-session
var express = require("express");
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require("path");
var mongoose = require('mongoose');
var moment = require('moment');
// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/mongoose_dashboard');
mongoose.Promise = global.Promise;

var UserSchema = new mongoose.Schema({
 first_name: { type: String, required: [true, "First name is required"], minlength: [2, "First name must be at least two characters"]},
 last_name: { type: String, required: [true, "Last name is required"], minlength: [2, "Last name must be at least two characters"]},
 username: { type: String, required: [true, "Username is required"], minlength: [2, "Username must be at least two characters"]},
 email: { type: String, required: [true, "Email is required"], minlength: [6, "Email must be at least 6 characters"]},
 birth_day: { type: Number, required: [true, "Birthday is required"], min: [1, "For birthday, please enter a number between 1 and 31, inclusive."], max: [31, "For birthday, please enter a number between 1 and 31, inclusive."]},
 birth_month: { type: Number, required: [true, "Birth month is required"], min: [1, "For month, please enter a number between 1 and 12, inclusive."], max: [12, "For month, please enter a number between 1 and 12, inclusive."]},
 birth_year: { type: Number, required: [true, "Birth year is required"], min: [1900, "Please enter a year between 1900 and 2018, inclusive."], max: [2018, "Please enter a year between 1900 and 2018, inclusive."]},
 phone: { type: Number},
 zip_code: { type: Number},
 city: { type: String},
 state: { type: String, minlength: [2, "For state, please enter a valid US Postal Abbreviation. Ex: If you live in California, please enter CA."], maxlength: [2, "For state, please enter a valid US Postal Abbreviation. Ex: If you live in California, please enter CA."]},
 country: { type: String},
 facebook: {type: String},
 instagram: { type: String},
 linkedin: {type: String},
 venmo: {type: String},
 created_at: {type: String},
 updated_at: {type: String}
}, {timestamps: true});
mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
var User = mongoose.model('User') // We are retrieving this Schema from our Models, named 'User'

// create the express app
var app = express();
app.use(session({secret: 'shhhhhh'}));
app.use(bodyParser.urlencoded({ extended: true }));

// setting up static content folder
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// ROUTES

app.get('/', function(req, res) {
  User.find({}, function(err, users) {
    if(err) {
      console.log('something went wrong');
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully found all users!');
      console.log(users);
      res.render('users', {users: users});
    }
  })
})

app.get('/users/new', function(req, res) {
  if(req.session['errors']){
    var errors = req.session.errors;
    req.session.destroy();
  };
  res.render('index', {errors: errors});
})

// Add User Request
app.post('/users', function(req, res) {
  console.log("POST DATA", req.body);
  // create a new User with the name and age corresponding to those from req.body
  var role = req.body.role;
  console.log(role);
  var now = moment().format('h:mma MMMM D YYYY');
  var user = new User({role: role, first_name: req.body.first_name, last_name: req.body.last_name, username: req.body.username, email: req.body.email, birth_day: req.body.birth_day, birth_month: req.body.birth_month, birth_year: req.body.birth_year, phone: req.body.phone, zip_code: req.body.zip_code, city: req.body.city, state: req.body.state, country: req.body.country, facebook: req.body.facebook, instagram: req.body.instagram, linkedin: req.body.linkedin, venmo: req.body.venmo, created_at: now, updated_at: now});
  // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
  user.save(function(err) {
    // if there is an error console.log that something went wrong!
    if(err) {
      console.log('something went wrong');
      console.log("user.errors: " + user.errors);
      req.session.errors = user.errors;
      console.log("req.session.errors: " + req.session.errors);
      res.redirect('/users/new');
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully added a user!');
      res.redirect('/');
    }
  })
})

app.get('/users/:username', function(req, res) {
  console.log(req.params.username);
  User.find({username:req.params.username}, function(err, users) {
    if(err) {
      console.log('something went wrong');
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully found all users!');
      console.log(users);
      res.render('users', {users: users});
    }
  })
});

app.get('/users/edit/:id', function(req, res) {
  console.log(req.params.id);
  User.find({_id:req.params.id}, function(err, users) {
    if(err) {
      console.log('something went wrong');
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully found all users!');
      console.log(users);
      res.render('edit_user', {users: users});
    }
  })
});

app.post('/users/:id', function(req, res) {
  console.log("POST DATA", req.body);
  // create a new User with the name and age corresponding to those from req.body
  var role = req.body.role;
  console.log(role);
  var now = moment().format('h:mma MMMM D YYYY');
  console.log(now)
  User.findOne({_id:req.params.id}, function(err, user){
    user.first_name = req.body.first_name
    user.last_name = req.body.last_name
    user.username = req.body.username
    user.email = req.body.email
    user.birth_month = req.body.birth_month
    user.birth_day = req.body.birth_day
    user.birth_year = req.body.birth_year
    user.phone = req.body.phone
    user.zip_code = req.body.zip_code
    user.city = req.body.city
    user.state = req.body.state
    user.country = req.body.country
    user.facebook = req.body.facebook
    user.instagram = req.body.instagram
    user.linkedin = req.body.linkedin
    user.venmo = req.body.venmo
    user.updated_at = now
    user.save(function(err){
      // if there is an error console.log that something went wrong!
      if(err) {
        console.log('something went wrong');
      } else { // else console.log that we did well and then redirect to the root route
        console.log('successfully added a user!');
        res.redirect('/');
      }
    })
  })
})

app.post('/users/destroy/:id', function(req, res) {
  console.log("POST DATA", req.body);
  console.log(req.params.id);
  // ...delete 1 record by a certain key/value.
  User.remove({_id:req.params.id}, function(err){
  // This code will run when the DB has attempted to remove one matching record to {_id: 'insert record unique id here'}
    if(err) {
      console.log('something went wrong');
    } else { // else console.log that we did well and then redirect to the root route
    console.log('successfully deleted a user!');
    res.redirect('/');
    }
  })
})

// Setting our Server to Listen on Port: 8000
// app.listen(8000, function() {
//     console.log("listening on port 8000");
// })

var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});
var io = require('socket.io').listen(server);
