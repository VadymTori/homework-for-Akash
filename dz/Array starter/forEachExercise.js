/*
Write a function called doubleValues which accepts an array and returns a new array with all the values in the array passed to the function doubled

Examples:
    doubleValues([1,2,3]) // [2,4,6]
    doubleValues([5,1,2,3,10]) // [10,2,4,6,20]

*/
function doubleValues(arr){
    const result = [];
    arr.forEach(num => result.push(num * 2));
    return result;
}

/*
Write a function called onlyEvenValues which accepts an array and returns a new array with only the even values in the array passed to the function

Examples:
    onlyEvenValues([1,2,3]) // [2]
    onlyEvenValues([5,1,2,3,10]) // [2,10]

*/
function onlyEvenValues(arr){
    const result = [];
    arr.forEach(num => {
        if (num % 2 === 0) result.push(num);
    });
    return result;
}

/*
Write a function called showFirstAndLast which accepts an array of strings and returns a new array with only the first and last character of each string.

Examples:
    showFirstAndLast(['colt','matt', 'tim', 'test']) // ["ct", "mt", "tm", "tt"]
    showFirstAndLast(['hi', 'goodbye', 'smile']) // ['hi', 'ge', 'se']

*/
function showFirstAndLast(arr){
    const result = [];
    arr.forEach(str => {
        if (str.length >= 2) {
            result.push(str[0] + str[str.length - 1]);
        } else {
            result.push(str);
        }
    });
    return result;
}

/*
Write a function called addKeyAndValue which accepts an array of objects, a key, and a value and returns the array passed to the function with the new key and value added for each object 

Examples:
    addKeyAndValue([{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}], 'title', 'instructor') 
    
    // [{name: 'Elie', title:'instructor'}, {name: 'Tim', title:'instructor'}, {name: 'Matt', title:'instructor'}, {name: 'Colt', title:'instructor'}]

*/
function addKeyAndValue(arr,key,value){
    arr.forEach(obj => {
        obj[key] = value;
    });
    return arr;
}

/*
Write a function called vowelCount which accepts a string and returns an object with the keys as the vowel and the values as the number of times the vowel appears in the string. This function should be case insensitive so a lowercase letter and uppercase letter should count

Examples:
    vowelCount('Elie') // {e:2,i:1};
    vowelCount('Tim') // {i:1};
    vowelCount('Matt') // {a:1})
    vowelCount('hmmm') // {};
    vowelCount('I Am awesome and so are you') // {i: 1, a: 4, e: 3, o: 3, u: 1};
*/
function vowelCount(str){
    const vowels = 'aeiou';
    const result = {};
    str.toLowerCase().split('').forEach(char => {
        if (vowels.includes(char)) {
            result[char] = (result[char] || 0) + 1;
        }
    });
    return result;
}












// Display code part --------------------------
const outputElementForEach = document.getElementById('console-output1');
const logForEach = message => {
	console.log(message);
	if (outputElementForEach) {
		const entry = document.createElement('div');
		entry.className = 'log-entry info';
		entry.textContent = typeof message === 'string' ? message : JSON.stringify(message, null, 2);
		outputElementForEach.appendChild(entry);
	}
};

logForEach('ForEach Exercises:');
logForEach('doubleValues([1,2,3]):', doubleValues([1,2,3]));
logForEach('onlyEvenValues([1,2,3,4,5]):', onlyEvenValues([1,2,3,4,5]));
logForEach('showFirstAndLast(["colt","matt","tim"]):', showFirstAndLast(["colt","matt","tim"]));
logForEach('addKeyAndValue([{name:"Elie"}], "title", "instructor"):', addKeyAndValue([{name:"Elie"}], "title", "instructor"));
logForEach('vowelCount("Elie"):', vowelCount("Elie"));
// -------------------------------------------