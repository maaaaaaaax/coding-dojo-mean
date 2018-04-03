// Variables can hold any kind of JavaScript datatype. We will be discussing what these datatypes are throughout the chapter. The list includes:
//
// Strings
// Numbers
// Arrays
// Objects
// Functions
// Booleans
// undefined
// null
// References

var myName = 'Kadie';
var myAge = 29;
var myBirthday;
console.log('Hello World!');
// => Hello World!
console.log(myName);
// => Kadie
console.log(myAge);
// => 29
console.log(myBirthday);
// => undefined

// Passed by Reference
// In JavaScript, objects and arrays are passed by reference. Consider the below example:

var x = [1, 2, 3];
var y = x;

// We created two variables, x and y. In x, we stored an array (or list) containing three integers. In y, we stored the variable x. Let's go deeper:

var x = [1, 2, 3];
var y = x;
x.push('Hello world!')
// push adds to the end of arrays in JavaScript
console.log(x);
console.log(y);

// Conventional wisdom would say that variable x now contains [1, 2, 3, 'Hello world!'], while y still contains [1, 2, 3]. If you ran the above snippet, you would know this is not the case. What happened?
//
// Because arrays are passed by reference, when we wrote the line var y = x;, we were not creating a new location in memory. Instead, we gave y a reference to the memory location of x. JavaScript never duplicated the data. So when we modified the value of x, we could see the changes reflected in y because it was the same location in memory.

// Declarations

// var
// To review, var is used for declaring function-scoped variables. Prior to ES6, var was used for all variable declarations.
//
// let
// New in ES6, let is used for declaring block-scoped variables. We will discuss scope in more detail in the coming chapter, and the benefits of block scoping. Generally, we recommend using let, however you will see lots of example code on the internet still using var.
//
// const
// Finally, const is used for declaring constants. This is for when you need to store information that should never be updated. const variables can never be reassigned, and will throw an error if you try.

// JS Math Object
//
// We can do a variety of number-based mathematical tasks using the Math object, such as rolling random numbers, finding absolute values, or using PI. The Math object is globally available to us, and we can call it anywhere in our code.

// Most commonly, Math.floor() is used to round floating point numbers (decimals) down to whole integers, while Math.ceil() is used to round up to whole integers.

// We also can get random numbers with the Math object using Math.random(). This will give a random number between 0 (inclusively) and 1 (exclusively). That means Math.random() will never give us 1. Check out the use cases below:

let x = Math.floor(Math.random() * 20);
console.log(x);
// => logs random number between 0 and 19
let y = Math.floor(Math.random() * 21);
console.log(y);
// => logs a random number between 0 and 20
let z = Math.floor(Math.random() * 20) + 1;
console.log(z);
// => logs a random number between 1 and 20

// The modulus operator % returns the remainder after division. We can use this to check if one number is evenly divisible by another, or if a number is even or odd.
let x = 11;
let y = 5;
let z = x % y;
console.log(z);
// => 1

let x = 16;
console.log(x % 2);
// when we modulus by 2, even numbers will return 0
let y = 17;
console.log(y % 2);
// while odd numbers will return a value that isn't 0!

// Basic Strings
let x = "Hello world";
let y = 'Hello World';
// Single or double quotes represent the boundaries of our string

// Often times strings contain words with characters like '. In order to not accidentally close our strings early, it's generally recommended to use double quote strings.

// By using plus signs, we can concatenate multiple strings together.

let firstName = "Oscar";
let lastName = "Vazquez";
let message = "Hello, my name is " + firstName + " " + lastName;
console.log(message);

// ES6 - String Interpolation
// Using String Interpolation, we can create strings differently:

let firstName = "Oscar";
let lastName = "Vazquez";
let message = `Hello, my name is ${firstName} ${lastName}`;
// Take note of the backticks instead of quotes
console.log(message);

// Special Characters
// Generally speaking, any text between the opening and closing quotes will be registered by the interpreter as a string. However, there are some special characters that behave differently. Here is an example:

let haiku = "Having been erased, \nThe document you're seeking \nMust now be retyped."
console.log(haiku);

// When we console.log the above string, you should notice that \n is forcing the string onto a new line. In this example, \ is an escape character, which allows us to send special formatting commands to the editor.

let text = 'Hello I\'m Oscar';

// In this example, we're using our escape character to tell the interpreter that it should ignore the next character, making our string valid. Here are some other examples of common escape characters:
//
// "\t" - This creates a horizontal tab
// "\v" - This creates a vertical tab
// "\u" - Pass in unicode. Example below:

console.log('\u263A        \u2603        \u272f');

// Conditionals
// A conditional operation evaluates the results of the condition, and if that condition is met, we perform a particular action. All conditionals should be booleans, binary variables that are either "true" or "false", 1 or 0, on or off.

// Here's a list of falsey statements in JavaScript. Take note that an empty string evaluates as false, but an empty array does not. Negative numbers also evaluate as true.
//
// false
// null
// undefined
// 0
// NaN
// ""

if(hunger === true){
    eat_cake();
};

// Here are the most common three types of conditional operations:
//
// if - runs the code block if the specified condition evaluates true
// else - the second part of 'if', runs if the first conditional evaluates false
// else if - specifies a new condition after an 'if' or another 'else if', only evaluates if the prior conditional is false

let diet = false;
if(diet){
    dont_eat_cake();
}else{
    eat_cake();
}

let score = 4;
if(score === 5){
    console.log('You got 5 out of 5');
}else if(score === 4){
    console.log('You got 4 out of 5');
}else if(score === 3){
    console.log('You got 3 out of 5');
}else if(score === 2){
    console.log('You got 2 out of 5');
}else if(score === 1){
    console.log('You got 1 out of 5');
};


// Common Boolean Operators for Conditionals
// Here's a list of operators used to make more complex conditional statements:
//
// Symbol       Meaning                                                 example
// <        less than	                                                10 < 20 is true
// >	      greater than                                              10 > 20 is false
// <=       less than or equal to                                     10 <= 10 is true
// >=       greater than or equal to	                                10 >= 10 is true
// ==       is equal to value (Abstract Value Comparison)	            "x" == "x" evaluates to true
// ===      is equal to value and type (Strict Equality Comparison)	  “1” === 1 evaluates to false
// !        inverse (not)	                                            !true == false is true, 'x' !== 'y' is true
// ||       or	                                                      true || false is true
// &&	      and	                                                      true && false is false


// Switch Case - better than tons of if / else ifs

var text;
var fruits = document.getElementById("myInput").value;

switch(fruits) {
    case "Banana":
        text = "Banana is good!";
        break;
    case "Orange":
        text = "I am not a fan of orange.";
        break;
    case "Apple":
        text = "How you like them apples?";
        break;
    default:
        text = "I have never heard of that fruit...";
}


// Arrays
let x = [1, 2, 3];
let y = ['blue', 'yellow', 'magical unicorns'];
let z = [1, [], null, 'hello world!'];

// Using the method .push(), we can add new elements to the end of an array.
let x = [1, 2, 3];
x.push(4);
console.log(x);
// => [1, 2, 3, 4]

// Using .pop(), we can remove elements from the end of an array.
let x = [1, 2, 3, 4];
x.pop();
console.log(x);
// => [1, 2, 3]

let y = ['blue', 'yellow', 'magical unicorns'];
console.log(y[1]);
// => 'yellow'

// We can check how many elements our array has by calling the .length property. Take note that this is not a function call!

let z = [1, [], null, 'hello world!'];
console.log(z.length);
// => 4

// Creating space - even though we created an empty array, when we jumped to index 334, JavaScript filled all the indexes of all the elements between 0 and 334 as undefined.
let x = [];
x[334] = 'Hello world!';
console.log(x);

// In JavaScript, Arrays are actually objects, a datatype we haven't talked about yet. This makes it tricky to identify if a variable is an array or not because often times it will get identified as an object! Not in this case, though... ?

let x = [1, 2, 3];
if(x.constructor === Array){
    console.log('Yes x is an array!');
}else{
    console.log('No x is not an array!');
};

// Loops
// Say hello seven times.
for(let i = 0; i < 7; i++){
    console.log('hello');
};

// A while loop is great for when we don't know how many times we want to repeat our code.
let num = 1;
while (num < 6){
    console.log("I'm counting! The number is " + num);
    num = num + 1;
}
console.log("We are done. Goodbye world!");

// Very similar to the while loop, a do/while loop iterates before the condition is checked.
let num = 6;
do {
    console.log("I'm counting! The number is " + num);
    num = num + 1;
}
while (num < 6);
console.log("We are done. Goodbye world!");

// One of the most common uses of loops is to iterate over a data set, like an array.

let colors = ['blue', 'green', 'red', 'chartreuse'];
// a simple array of strings
for(let i = 0; i < colors.length; i++){
// by using the length of our colors array, we can make the condition
// of our for loop match the number of elements in the array!
    console.log(colors[i]);
    // now we can use i to log the elements of the color array individually
};

// Break and Continue
// Sometimes we need to break out of a loop early. We can use the break keyword to do this.

let names = ['Anna', 'Oscar', 'Kadie', 'Steve', 'Elle', 'Boris', 'Lord Humongous'];
forcopy(let i = 0; i < names.length; i++){
    if(names[i] === 'Kadie'){
        console.log('Kadie is in our array!');
        break;
    }
}
console.log('We finished looping!');

// We can use the keyword continue to force our loop onto the next iteration. The below example will show all the names in our array except for 'Steve'.

let names = ['Anna', 'Oscar', 'Kadie', 'Steve', 'Elle', 'Boris', 'Lord Humongous'];
for(let i = 0; i < names.length; i++){
    if(names[i] === 'Steve'){ continue };
    console.log(names[i]);
};

// Functions
// Unless we explicitly state otherwise, a function will return undefined by default.

function sayName(first_name, last_name){
    console.log("Hello my name is " + first_name + " " + last_name);
};
sayName("Stewart", "Dent");
sayName("Rocky", "Balboa");

// a function call is equal to whatever that function returns. Previous, with return values:

function sayName(name){
    return "Hello my name is " + name;
};
let message = sayName("Cinderella");
console.log(message);

//

// -- standalone function ---
function sayName1(name){
    console.log("Hello my name is " + name);
};
// -- anonymous function, stored in a variable --
let sayName2 = function(name){
    console.log("Hello my name is " + name);
};
// -- standalone function, stored in a variable --
let sayName3 = function sayName3(name){
    console.log("Hello my name is " + name);
};

// immediately invoked functions:
(function(){
    console.log("Hello world!");
})();

// arrow functions are anonymous functions without the 'function' keyword.
let sayName4 = (name) => { console.log("Hello my name is " + name) };
sayName4("Dolores");


// DOM Manipulation
// JavaScript can directly interface with the HTML of a webpage. It does this through the DOM, or Document Object Model. The DOM can be thought of as a tree, with <html> as the main trunk and all our other HTML elements branching off. The data we place on an HTML page can be easily accessed by JavaScript through the DOM.

// for this section we're going to focus on selecting by id.

<html>
<body>
    <div id="message">
        Hello World!
    </div>
<script>
    let x = document.getElementById("message").innerHTML;
    console.log(x);
</script>
</body>
</html>

// We must put the script tag after the body so our HTML elements have time to load.

// Using innerHTML, we can actually force new information into the DOM.

<html>
<body>
    <div id="message">
        Hello World!
    </div>
<script>
    document.getElementById("message").innerHTML = "I love JavaScript!";
</script>
</body>
</html>

// By replacing the value of innerHTML, we can dynamically change our HTML. In fact, by passing HTML as a JavaScript string, we can create new HTML elements!

<html>
<body>
    <div id="message">
        Hello World!
    </div>
<script>
    let message = "<h1>Look, I'm a dynamic header!</h1>";
    document.getElementById("message").innerHTML = message;
</script>
</body>
</html>

// .createElement and .appendChild
// .innerHTML isn't always the best way to add new HTML elements dynamically. When we modify it, that area of the DOM needs to be rebuilt on the fly. Now, this isn't always a bad thing, and building the DOM quickly is something our browsers are very good at. However, we have an easy and efficient way to append multiple new elements: Create them with .createElement() and appending them with .appendChild().

<html>
<body>
    <ol id="fruit">
        <li>Bananas</li>
        <li>Oranges</li>
        <li>Apples</li>
    </ol>
<script>
    let new_fruit = document.createElement("li");
    // create an empty li
    new_fruit.innerHTML = "Pears";
    // modify its innerHTML content with a string
    document.getElementById("fruit").appendChild(new_fruit);
    // append our new DOM element to the id 'fruit'
</script>
</body>
</html>

// Note: .appendChild() needs a DOM node created with .createElement(). We will not be able to just force a string containing HTML tags into it!



// objects
// JavaScript objects are a set type that store key-value pairs, with each value having its own key.
// Let's start by creating an object literal:

let x = { };

// Here's an object with some key-pair values:

let sandwich = {
    slices_of_bread: 2,
    ham: true,
    veggies: ['lettuce', 'tomato', 'onion']
};
console.log(sandwich);
// logging the entire sandwich and all its properties
console.log(sandwich.slices_of_bread);
// examining the 'slices_of_bread' property
console.log(sandwich.veggies[0]);
// logging the first element of the array stored within the veggies property

// Commonly, we'll be dealing with arrays of objects, typically coming in from the backend database:

let sandwiches = [
    {
        id: 1,
        bread_type: 'Sourdough',
        ingredients: 'Spicy Turkey, Spicy Mustard'
    },
    {
        id: 2,
        bread_type: 'Marbled Rye',
        ingredients: 'Prosciutto, Swiss Cheese'
    },
    {
        id: 3,
        bread_type: 'Wheat',
        ingredients: 'Ham, Provolone Cheese, Tomato'
    }
];

// Objects are not indexed, so to iterate over an object's values, we will not be able to use the same kinds of for loops as we have for arrays. To iterate over an object, we will use a for-in loop.

// here is an object literal with four key-value pairs
let sandwich = {
    cheese: 'Smoked Gouda',
    meat: 'Dry-aged Bison',
    sauce: 'Chipotle Aioli',
    veggies: 'Caramelized Onions'
}
// the variable 'topping' is used instead of an index
for(let topping in sandwich){
    // when we log 'topping', we notice it's a key
    console.log(topping);
    // when we pass the key to the 'sandwich' object, we can pull values
    console.log(sandwich[topping]);
}



// SCOPE
//
// At a base level, JavaScript has function scoping. This means that when we declare variables inside of a function, they are only accessible to that function.
//
// • Each function has access to all the variables in its parent function.
//
// • No function has access to the variables in its child functions.
//
// • Your entire .js file can be thought of as the outermost function or 'global' scope.


// Key Rules of Hoisting
// • Variable declarations rise to the top of their scope like hot air balloons.
//
// • Functions create their own scope and act like cages, preventing declarations from rising out.
//
// • Assignments, or = signs, act like anchors. They stay put, no matter how the code is rearranged.
//
// • let and const will throw an error if called before they get assigned.
