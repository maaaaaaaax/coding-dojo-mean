// node.js notes

// It might be helpful to think of Node as just an interpreter similar to what’s available in your browser’s developer tools. Let’s quickly explain what an interpreter actually does:
// An interpreter walks through your source code, parsing it line by line.
// Your source code is then translated into an intermediate representation, which is just a fancy way to say the computer is making it into something it can read more efficiently.
// This interpreted machine code is then run line by line.

// Using your terminal, try the following commands after your prompt ($):

// $ which node (where node  for PC users)

// That should output a path like: /usr/local/bin/node or \Program Files\nodejs\node.exe, which tells you where the node is installed.

// $ whoami

// That should output your username.

// $ node -v

// Let’s actually enter our own JavaScript environment and declare variables from the comfort of our own terminal.

// $ node

// You should have noticed your command prompt may have changed from $ to >. That means whatever we write will be interpreted as JavaScript. (To exit this environment you can just type ctrl C twice or .exit once.)

// Npm is a tool to fetch and prepare other chunks of code. In the MEAN stack, we call those chunks "modules". Depending on what technologies you've used in the past, these "modules" are very similar to Ruby gems and Python libraries, often generalized as "middleware".

// to open a file:

$ nodemon test.js

// Make some changes to test.js and save them. What happened in your terminal?
// End nodemon using ctrl-C



// setting up a basic server

// get the http module:
var http = require('http');
// fs module allows us to read and write content for responses!!
var fs = require('fs');
// creating a server using http module:
var server = http.createServer(function (request, response){
    // see what URL the clients are requesting:
    console.log('client request URL: ', request.url);
    // this is how we do routing:
    if(request.url === '/') {
        fs.readFile('index.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});  // send data about response
            response.write(contents);  //  send response body
            response.end(); // finished!
        });
    }
    // request didn't match anything:
    else {
        response.writeHead(404);
        response.end('File not found!!!');
    }
});
// tell your server which port to run on
server.listen(6789);
// print to terminal window
console.log("Running in localhost at port 6789");

// Boot up your node server by navigating to your node_server folder in a terminal window and typing:

nodemon app.js

// Requiring a Node module allows you to use the module.exports object of another file!
