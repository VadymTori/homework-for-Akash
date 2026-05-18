/* Task 1: Declare a Destination Variable */
// TODO: Use `let` to declare a variable named `destination` and assign it the value `"Ancient Egypt"`. Print the destination to the console.
let destination = "Ancient Egypt";
console.log(destination);

/* Task 2: Change the Destination */
// TODO: Now, change the `destination` variable to `"Medieval Europe"`. Print the new destination to the console.
destination = "Medieval Europe";
console.log(destination);

/* Task 3: Declare a Constant Travel Date */
// TODO: Use `const` to declare a variable named `travelDate` and set it to `"2024-03-15"`. Try to change the `travelDate` to another value and observe and explain what happens as a comment.
const travelDate = "2024-03-15";
console.log(travelDate);

// Attempting to change travelDate:
// travelDate = "2024-04-20"; // This line would cause an error

/*
 * Observations:
 * When using `const`, the variable cannot be reassigned after initialization. 
 * Attempting to change travelDate to another value results in a TypeError: 
 * "Assignment to constant variable". This is the key difference between `const` and `let`/`var` - 
 * const provides immutability, ensuring the value cannot be changed once declared.
 */

/* Task 4: Experiment with Variable Hoisting */
// TODO: Before declaring any variable, try to print a variable named `timeMachineModel` to the console. Then, declare `timeMachineModel` using `var` and assign it the value `"T-800"`. Observe and explain what happens as a comment.
console.log(timeMachineModel); // Prints: undefined

var timeMachineModel = "T-800";
console.log(timeMachineModel); // Prints: T-800

/*
 * Observations:
 * This demonstrates JavaScript hoisting. When using `var`, the variable declaration is 
 * hoisted to the top of its scope during the compilation phase, but the assignment stays 
 * in place. So `timeMachineModel` is recognized (hoisted) but not yet assigned a value, 
 * resulting in `undefined` when accessed before the assignment. After the assignment line, 
 * it correctly prints "T-800". This behavior is specific to `var` and doesn't occur with 
 * `let` or `const`, which would throw a ReferenceError instead.
 */
