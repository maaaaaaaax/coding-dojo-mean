// Constructors and new

// In ES5, we have no class keyword. Instead, we write functions that act as Object Constructors, or blueprints for creating particular objects

// An Object Constructor is a function that returns objects.

function personConstructor(name, age) {
    // an object literal that will be returned
    const person = {};
    // attributes of a person
    person.name = name;
    person.age = age;
    // when attached to an object or instance, functions are called 'methods'.
    // this is our first method, greet
    person.greet = function(){
        console.log("Hello my name is " + person.name + " and I am " + person.age + " years old!");
    }
    // finally, this function must return an instance
    return person;
}
// create the 'steve' instance, run greet
const steve = personConstructor("Steve", 27);
steve.greet();
// create the 'anika' instance, run greet. note that it is different.
const anika = personConstructor("Anika", 33);
anika.greet();
// finally note how we can refine the greet method for any particular instance
const emily = personConstructor("Emily", 22);
emily.greet = function() {
    console.log("I am the greatest, ever!");
};
emily.greet();

// In the above example, we created an object literal at the top of the scope, and returned it at the bottom. There is nothing special about these objects, every instance is unique, and we can modify their methods at any time (like we did with the emily instance!)

// we can use the this keyword to store our attributes and methods, and the new keyword to create new instances.

function personConstructor(name, age) {
    this.name = name;
    this.age = age;
    this.greet = function() {
        console.log("Hello my name is " + this.name + " and I am " + this.age + " years old!");
    }
}
// the 'new' keyword causes our constructor to return the object we expected
const anika = new personConstructor('Anika', 33);
anika.greet();
console.log(anika);
// using this & new, we can now refer to the 'name' attribute of our instance!
const emily = new personConstructor("Emily", 22);
emily.greet = function() {
    console.log("My name is " + this.name + " and I'm the coolest ever!");
}
emily.greet();


// Private variables
// the naming convention for Classes and Object Constructors is that they're capitalized and singular


function Person(name, age) {
    // create a private variable that stores a reference to the new object we create
    const self = this;
    const privateVariable = "This variable is private";
    const privateMethod = function() {
        console.log("this is a private method for " + self.name);
        console.log(self);
    }
    this.name = name;
    this.age = age;
    this.greet = function() {
        console.log("Hello my name is " + this.name + " and I am " + this.age + " years old!");
        // we can access our attributes within the constructor!
        console.log("Also my privateVariable says: " + privateVariable)
        // we can access our methods within the constructor!
        privateMethod();
    }
}
const joe = new Person("Joe", 23);
joe.greet();



// .prototype

// In JavaScript, all objects have a prototype that they inherit methods and properties from. When working with OOP, it is important to be aware of what the prototype is and how we can access it.

const MyObjConstructor = function(name) {
  const myPrivateVar = "Hello"; // just to show that it is hard to see this private var easily
  this.name = name; // but you can see the name!
  this.method = function() {
    console.log( "I am a method");
  };
}
const obj1 = new MyObjConstructor('object1');
const obj2 = new MyObjConstructor('object2');
console.log(obj1);
obj1.newProperty = "newProperty!";
obj1.__proto__.anotherProperty = "anotherProperty!";
console.log(obj1.anotherProperty); // anotherProperty!
console.log(obj1.newProperty); // newProperty!
// What about obj2?
console.log(obj2.newProperty); // undefined
console.log(obj2.anotherProperty); // anotherProperty! <= THIS IS THE COOL PART!

// While, expectedly, the line obj1.newProperty = 'newProperty!' gave obj1 a new property that obj2 couldn't access, the code obj1.__proto__.anotherProperty = 'anotherProperty!' can be accessed by both obj1 and obj2. That's because they both share a prototype object since they're both instances of MyObjConstructor.

// Major PROS of Prototype
//
// One memory space for all! If you are creating lots of the same object and use prototype, it can save you significant memory
// Great for general methods for objects
// We can access prototype methods with just using .method or .property.
// The interpreter will go through all prototypes in the prototype chain to check if any of them have the called method or property before giving up (it'll return/use the first match it finds).

// Major CONS of Prototype
//
// Methods generated in prototype cannot access the private variables inside the constructor function
// Lots of prototypes can be hard to read

// After we create our MyObjConstructor:
MyObjConstructor.prototype.methodName = function() {
  //do stuff here!
}
function Cat(catName) {
  const name = catName;
  this.getName = function() {
    return name;
  };
}
//adding a method to the cat prototype
Cat.prototype.sayHi = function() {
  console.log('meow');
};
//adding properties to the cat prototype
Cat.prototype.numLegs = 4;
const muffin = new Cat('muffin');
const biscuit = new Cat('biscuit');
console.log(muffin, biscuit);
//we access prototype properties the same way as we would access 'own' properties
muffin.sayHi();
biscuit.sayHi();
console.log(muffin.numLegs);
// poor mutant cats: muffin.__proto__.numLegs ++;
// doing this to muffin will mess up all the cats!


// Prototype methods make our code faster. If we were creating thousands of instances, adding methods to the shared prototype will improve the performance of our code significantly! However, if you are only going to have a small amount of instances, you should balance prototype methods with readability. We only get performance gains from prototype methods when using a large number of instances.

// Define the class
function Person(name, age) {
    this.name = name;
    this.age = age;
}
// Attach class methods using .prototype
Person.prototype.greet = function() {
    console.log("Hello my name is " + this.name + " and I am " + this.age + " years old!");
    return this;
};
// Create new instances with the new keyword
const amelia = new Person('Amelia', 36);
// Create instance methods by attaching the function directly to an instance
amelia.sing = function() {
    console.log("Lalalala!");
};


// Soft Privacy & Method Chaining
// In order to keep data private in a particular instance, we just need to leverage JavaScripts scoping rules. By creating variables scoped to the Object Constructor, we keep them out of the global scope. To read and update private data, we'll need to write getter and setter methods.
//
// Additionally, we can chain methods together by returning this. Essentially, whenever we tell a public or prototype method to return this, we're asking for the entire object back. This lets us chain function calls together.

// Private variables are scoped to the constructor with the 'let' keyword
function Car(make, model) {
    let odometer = 0;
    this.make = make;
    this.model = model;

    // To make functions private, we scope them to the constructor
    function updateOdometer(distance) {
        odometer += distance;
    };

    // 'Getter' functions help us read private variables
    this.readOdometer = function() {
      return odometer;
    }

    // 'Setter' functions help us update private variables
    this.drive = function(distance) {
      updateOdometer(distance);
      // return this will allow us to chain methods
      return this;
    }
}
const myCarInstance = new Car("Chevy", "Camaro");
// by returning this, we can chain drive()
myCarInstance.drive(50).drive(90);
// private variable is undefined
console.log(myCarInstance.odometer);
// but we can read it with our getter function
console.log(myCarInstance.readOdometer());



//
// Classes in ES6
// ES6's Classes are just syntactic wrappers around the Object Constructors we've already learned.
//
// All ES6 classes have a constructor, and the constructor always runs whenever we create a new instance.
// Classes are NOT hoisted. No matter what, the class keyword will stay where it was written and not move during interpretation.
//
// ES6 vs ES5:

// Old ES5 way
function Dot(x, y) {
    this.x = x;
    this.y = y;
}
Dot.prototype.showLocation = function() {
    console.log("This Dot is at x " + this.x + " and y " + this.y);
}
const dot1 = new Dot(55, 20);
dot1.showLocation();

// New ES6 way
class Dot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    showLocation() {
        // ES6 String Interpolation!
        console.log(`This Dot is at x ${this.x} and y ${this.y}`);
    }
}
const dot2 = new Dot(5, 13);
dot2.showLocation();



// class methods are called 'static methods`, while instance methods are called 'prototype methods'.

// Here we added a static method called getHelp(). This means that getHelp() is accessible from the Class, not the instance.

class Dot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    // prototype method
    showLocation() {
        console.log(`This Dot is at x ${this.x} and y ${this.y}`);
    }
    // static method
    static getHelp() {
        console.log("This is a Dot class, for created Dots! A Dot takes x and y coordinates, type 'new Dot' to create one!");
    }
}
const dot3 = new Dot(4, 2);
// we can see showLocation from our instance...
console.log(dot3.showLocation);
// but we can't see getHelp
console.log(dot3.getHelp);
// however we can call getHelp this way:
Dot.getHelp();



// Inheritance is much easier with the ES6 class syntax. Using the extends keyword, we can define new classes that inherit from existing classes. Inheritance is a common aspect of OO programming, and it's important to see how JavaScript does it a little differently.

// Super is a special function that allows us to call the constructor of the parent class. Just like how Dot needs an x and y value, the super() of our Circle class requires that exact same thing.

// parent Dot class
class Dot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    showLocation() {
        console.log(`This ${ this.constructor.name } is at x ${this.x} and y ${this.y}`);
    }
}
// child Circle class
class Circle extends Dot {
    constructor(x, y, radius) {
        super(x, y);
        this.radius = radius;
    }
}


// Another important property of super is we can call Parent methods with it. Consider this example:
// Much like how we use super() to call the parent constructor, super can also be used to call other methods from the parent!

// parent Dot class
class Dot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    showLocation() {
        console.log(`This ${ this.constructor.name } is at x ${ this.x } and y ${ this.y }`);
    }
    // simple method in the parent class
    parentFunction(){
        return "This is coming from the parent!";
    }
}
// child Circle class
class Circle extends Dot {
    constructor(x, y, radius) {
        super(x, y);
        this.radius = radius;
    }
    // simple function in the child class
    childFunction() {
        // by using super, we can call the parent method
        const message = super.parentFunction();
        console.log(message);
    }
}
const circle = new Circle(1, 2, 3);
circle.childFunction();



// A common way to read and update attributes within our objects is to use Getters and Setters. While we can recreate this technique in many situations, JavaScript supports Getters and Setters syntactically.

class Pizza {
    constructor(radius, slices) {
        this.radius = radius;
        this._slices = slices;
    }
    get slices () {
        return this._slices;
    }
    set slices (slices) {
        this._slices = slices;
    }
};


// Using these same patterns, we can create custom Getters. Consider the following snippet:

class Circle{
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    get diameter() {
        return this.radius * 2;
    }
}
const circle1 = new Circle(1, 2, 5);
console.log(circle1.diameter);
