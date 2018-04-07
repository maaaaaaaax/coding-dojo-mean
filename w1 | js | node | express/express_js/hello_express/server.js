var express = require("express");
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'shhhhhh'}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/', function (req, res){
  res.render('index', {title: "my Express project"});
});

app.post('/users', function (req, res){
    console.log("POST DATA\n", req.body)
    // { name: 'Max', email: 'max@max.com' }
    console.log(req.body.name)
    // Max
    console.log(req.body.email)
    // max@max.com
    req.session.name = req.body.name;
    console.log("req.session.name: " + req.session.name);    

    res.redirect('/')
});

app.get("/users/:id", function (req, res){
    console.log("The user id requested is:", req.params.id);
    // just to illustrate that req.params is usable here:
    res.send("You requested the user with id: " + req.params.id);
    // code to get user from db goes here, etc...
});

// app.get('/', function(request, response) {
//   response.send("<h1>Hello Express</h1>");
// })

// app.get("/users", function (request, response){
//     // hard-coded user data
//     var users_array = [
//         {name: "Michael", email: "michael@codingdojo.com"},
//         {name: "Jay", email: "jay@codingdojo.com"},
//         {name: "Brendan", email: "brendan@codingdojo.com"},
//         {name: "Andrew", email: "andrew@codingdojo.com"}
//     ];
//     response.render('users', {users: users_array});
// })

app.use(express.static(__dirname + "/static"));

app.listen(8000, function() {
  console.log("listening on port 8000");
})
