// require express, body-parser, and express-session
var express = require("express");
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require("path");

// create the express app
var app = express();
app.use(session({secret: 'shhhhhh'}));
app.use(bodyParser.urlencoded({ extended: true }));

// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// root route to render the index.ejs view
// app.get('/', function(req, res) {
//  res.render("index", {title: "my Express project"});
// })

app.get('/', function(req, res) {
  console.log(req.session);
  if(!req.session['counter']){
    req.session['counter'] = 0;
  };
  req.session.counter += 1;
  console.log(req.session.counter);
  res.render("index", {counter: req.session.counter});
});

app.post('/submit', function (req, res){
    console.log("POST DATA\n", req.body)
    // { name: 'Max', email: 'max@max.com' }
    console.log(req.body.name)
    // Max
    req.session.name = req.body.name;
    req.session.location = req.body.location;
    req.session.language = req.body.language;
    req.session.comment = req.body.comment;
    console.log("req.session: " + req.session);
    res.redirect('/result')
});

app.get('/result', function(req, res) {
  res.render("result", {session: req.session});
});

//
// app.get("/users/:id", function (req, res){
//     console.log("The user id requested is:", req.params.id);
//     // just to illustrate that req.params is usable here:
//     res.send("You requested the user with id: " + req.params.id);
//     // code to get user from db goes here, etc...
// });

// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});
