// Express.js is a framework built in Javascript using Node.js as the server component, and a set of tools that allows us to create a more robust Node Server.

// create a new folder for the website project. in that directory, create server.js:

var express = require("express");

var app = express();

app.get('/', function(request, response) {
  response.send("<h1>Hello Express</h1>");
})

app.listen(8000, function() {
  console.log("listening on port 8000");
})

// install express as a sibling of server.js in the website project directory:

npm install express

// Now that we have installed express, we should be able to run our server and see it works. Run the server.js file using node (or nodemon if you feel fancy) and see the magic happen!

nodemon server.js

// Views

// Static Content -- Serving a static HTML/CSS/JS file from the backend in response to a request.

// Templates -- Using a view/templating engine to generate HTML (PHP, embedded ruby, embedded JavaScript)

// use static to load static files (including HTML and CSS):

app.use(express.static(__dirname + "/static"));

// using templates

// EJS is the templating engine we are going to use. EJS stands for Embedded Javascript. Just like express, ejs is a node module that we will need to install for our project.

// First let's install the ejs module in our project:

npm install ejs

// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views');
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');

// Let's say we wanted to add a route to our app that displays a list of users. We aren't going to get our list of users from the database, we're just going to hard code our data for now. Let's add a new route to our server.js file that will render an ejs view and pass it some user data.

app.get("/users", function (request, response){
    // hard-coded user data
    var users_array = [
        {name: "Michael", email: "michael@codingdojo.com"},
        {name: "Jay", email: "jay@codingdojo.com"},
        {name: "Brendan", email: "brendan@codingdojo.com"},
        {name: "Andrew", email: "andrew@codingdojo.com"}
    ];
    response.render('users', {users: users_array});
})

// Notice we are passing a JavaScript object to the response.render() method. That way, when we pass a piece of data to a view, every key-value pair within the larger piece of data becomes its own variable.
//
// Let's create a new folder called "views" in our project directory. This folder is where we are going to put all of our view files.
//
// Next let's make a view called  users.ejs and put in it the following:

<html>
<body>
    <h2>Here are all the users:</h2>
    <% for (var x in users) { %>
        <h3>Name: <%= users[x].name %></h3>
        <h4>Email: <%= users[x].email %></h4>
        <hr>
    <% } %>
</body>
</html>

// The <% %> tags are the delimiter for the embedded JavaScript.  Using these tags allows us to run JavaScript code that can be embedded into the HTML document we are making.  Notice the <% %> tags allow us to enter JavaScript code, and the <%=  %> tags actually print the JavaScript code to the document.  This is a key difference.   You'll use the tags with the equal sign (=) to actually print values, whereas you'll use the tags without the equals sign to invoke loops or use logic (anything that involves JavaScript but doesn't output code).


// HTTP Forms & Methods:
// GET is used for passing insensitive information
// POST is used for passing sensitive information.

// GET
// GET requests are sent as part of the URL. Ever noticed that when you do a Google search, your search term appears in the resulting URL? That's because it's a GET! That wouldn't be very secure for passwords! Imagine if every time you logged into Gmail, it displayed your password at the top of the screen, right in your URL for the world to see! Worse still, GET requests can be cached, and will even remain stored in your browser's history! So why do we use GET at all?? Well one neat thing, GET requests can be bookmarked! This lets you bookmark routes on say Google Earth or image results on a search engine.
//
// POST
// POST requests send data behind the scenes, in the HTTP message body.  They're never cached, they don't linger in your browser history, they can't be bookmarked, and there are no restrictions on how much data you can send. The vast majority of HTTP request methods you'll be dealing with will be POSTs. Forms that control user registration, user authentication, user authorization, database inserts, updates, and deletes, all of these will be sent by the POST method.

// In Express we will assign all of our routing rules using the syntax:

// root route
app.get('/', function (req, res){
  res.render('index', {title: "my Express project"});
});
// route to process new user form data:
app.post('/users', function (req, res){
  // code to add user to db goes here!
  // redirect the user back to the root route.
  // All we do is specify the URL we want to go to:
  res.redirect('/');
})

// In order to be able to access POST data, we need to be able to pull it out of the request object. Unfortunately in an effort to be as lightweight and flexible as possible, Express doesn't have a good way to handle post-data inherently. So how do you think we are going to get our data from the request object? A node module! This one is called body-parser.

// require body-parser
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({extended: true}));



// To keep track of downloaded package managers:
// in main project directory (sibiling of server.js), open terminal and type:
npm init -y
// Now let’s install ejs and express, from command-line in the same folder:
npm install express --save
npm install ejs --save
npm install body-parser --save
