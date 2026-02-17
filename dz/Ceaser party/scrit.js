function makeSecure() {
    const input = document.getElementById("inputText").value;
    let result = "";

    for (let i = 0; i < input.length; i++) { //here we identify a letters in the inputed text
        let char = input[i];

        if (char >= 'a' && char <= 'z') { //here we check the letters if they don't have to move "3" numbers left due to last "3 letters of alphabet"
            result += String.fromCharCode((char.charCodeAt(0) - 97 + 3) % 26 + 97); // result "+3" letters left
        } 
        else if (char >= 'A' && char <= 'Z') { //here we use letters that are close to end of alphabit and need to run alphabet from the beginning
            result += String.fromCharCode((char.charCodeAt(0) - 65 + 3) % 26 + 65); // result "+3" letters left from the stat of alphabet
        } 
        else {
            result += char; //result saved
        }
    }

    document.getElementById("outputText").value = result.toLowerCase(); //output result and change to lowercarse
}

const friend = "BRUTUS"
const shiftValue = 3;
// ## Step 1 🧩

// Store the Latin alphabet in a variable with all letters in lowercase.
//ANSWHER: I think it's much better just add .toLowerCase at the result to output lowercase, but task require to make a const for this
const getElementById2= "abcdefghijklmnopqrstuvwxyz"
// const index = getElementById.indexOf(firstLetter.toLowerCase());
const firstLetter = friend[0];
const index = getElementById2.indexOf(firstLetter.toLowerCase());
// ## Step 2 🧩

// Find the index of the first letter of Ceaser's friend. Store it in a variable.
// ## Question 1 🤔

// Oh, I know B is the 2nd letter of the alphabet. Then, why the result is 1 instead of 2?
// ANSWHER: in javascript "index" (not just javascript) starting from 0(zero), not 1(one)
// ## Step 3 🧩

// Use the Caesar Cipher technique to shift the first letter of Caesar's friend by the given shift value, which is 3 positions. Find and store the encrypted letter in a variable.

// ### Hints 💡

// - Once you find the index of the letter, add the shift value to it to find the new index.
const newIndex2 = index + shiftValue;
const encryptedFirstLetter2 = getElementById2[newIndex2];
// ## Question 2 🤔

// If we continue shifting letters and go beyond the last letter, "z", which operator could help us to wrap around and continue from the beginning of the alphabet?
// We devide index on total amount of letters in alpabet and take the less of result using %. We can use the result as a new index to move it on "3" left to get a new letter if the alpahbet started from the new circle
// ## Step 4 🧩

// Determine the length of the alphabet.

// ### Hints 💡

// - Use a specific property of strings in JavaScript to get their length.
const alphabetLength = getElementById2.length;
// ## Step 5 🧩

// Use the Caesar Cipher technique to shift the first letter of Caesar's friend by the given shift value, ensuring the shift wraps around the alphabet if it exceeds.

// ### Hints 💡

// - Use the modulus operator to handle wrapping around the alphabet based on its length.
const getElementById2Length = getElementById2.length;
const newIndex = (index + shiftValue) % alphabetLength;
const encryptedFirstLetter = getElementById2[newIndex];
// ## Step 6 🧩

// Caesar remembers that Brutus is particularly fond of challenges. Before sending the encrypted message, Caesar decides to send only a part of it as a teaser. Extract the first 3 characters from the encrypted message using the `slice` method. (Assume that the encrypted message is "EUXWXV".)

// ### Hints 💡

// - The `slice` method extracts a section of a string and returns it as a new string without modifying the original string.
// - It accepts two parameters: the starting index (inclusive) and the ending index (exclusive).
const encryptedMessage = "EUXWXV";
const teaserMessage = encryptedMessage.slice(0, 3);
