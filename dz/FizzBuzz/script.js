function fizzBuzz(n) {
    try {
        if (typeof n !== "number" || n <= 0 || n >= 100 || !Number.isInteger(n)) {
            return new Error("Invalid input");
        }

        let output = "";
        for (let i = 1; i <= n; i++) {
            if (i % 3 === 0 && i % 5 === 0) {
                output += "FizzBuzz";
            } else if (i % 3 === 0) {
                output += "Fizz";
            } else if (i % 5 === 0) {
                output += "Buzz";
            } else {
                output += i;
            }
            output += "\n";
        }
        return output;
        // Catch error is AI made when I was trying to remove >=100 number
    } catch (error) {
        return "Error";
    }
}
//I've got a problem to show the result in text at HTML, so this part is AI made also
document.getElementById("fizzBuzzButton").addEventListener("click", () => {
    const input = document.getElementById("numberInput").value;
    const n = parseInt(input, 10);
    const result = fizzBuzz(n);
    document.getElementById("result").textContent = result;
});
// -------------------------------------------------------------------------------------------------
function letterOccurrence(word) {
    if (typeof word !== "string" || word.length === 0) {
        return "Error";
    }

    word = word.toLowerCase();
    let counts = {};

    for (let char of word) {
        if (char < 'a' || char > 'z') { //I did know that we can do in that way. That was googled and I was surprised it worked =)
            return "Error";
        }
        counts[char] = (counts[char] || 0) + 1; // I spent much time until I remembered to add +1 =\
    }

    let result2 = "";
    for (let letter in counts) {
        result2 += letter + counts[letter] + "\n";
    }

    return result2;
}

function runLetterCount() {
    const word = document.getElementById("wordInput").value;
    const result2 = letterOccurrence(word);
    document.getElementById("result2").textContent = result2;
}