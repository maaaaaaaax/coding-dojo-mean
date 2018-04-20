class Bike {
    constructor(public price: number; public max_speed: number){}
    miles = 0;
    displayInfo = function () {
        console.log("Price: " + this.price + ", Max Speed: " + this.max_speed + ", Miles: " + this.miles);
    }
    ride = function () {
        console.log("Riding");
        this.miles += 10;
        return this;
    }
    reverse = function () {
        console.log("Reversing");
        this.miles -= 5;
        return this;
    }
}

const bike1 = new Bike(100, 25);
const bike2 = new Bike(1000, 40);
const bike3 = new Bike(5,10);

console.log(bike1);

bike1.ride().ride().ride().reverse().displayInfo();

bike2.ride().ride().reverse().reverse().displayInfo();

bike3.reverse().reverse().reverse().displayInfo();
