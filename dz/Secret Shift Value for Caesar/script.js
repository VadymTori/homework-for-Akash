// const userName = `Akash` 
// document.getElementById("outputText").value = practice01;

const randomDecimal = Math.random(); //Here we take a random number after Decimal
// document.getElementById("outputText").value = randomDecimal
const range = 33 - 3 + 1; // we add 1 co be sure that we have a full number from 3 to 33
// document.getElementById("outputText").value = range
const randomInRange = randomDecimal * range; // I don't know why we doing this... I copied from the answher
// document.getElementById("outputText").value = randomInRange
const randomInt = Math.floor(randomInRange); // we round it to a number in range from 0 to 1 as we need it
// document.getElementById("outputText").value = randomInt
const shiftValue = randomInt + 3; // this will allow us to get numbers from range 30-33 with o problem
document.getElementById("outputText").value = shiftValue
