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
