/*
Write a function called doubleValuesWithMap which accepts an array and returns a new array with all the values in the array passed to the function doubled

Examples:
    doubleValuesWithMap([1,2,3]) // [2,4,6]
    doubleValuesWithMap([1,-2,-3]) // [2,-4,-6]
*/

function doubleValuesWithMap(arr) {
    return arr.map(num => num * 2);
}

/*
Write a function called valTimesIndex which accepts an array and returns a new array with each value multiplied by the index it is currently at in the array.

Examples:
    valTimesIndex([1,2,3]) // [0,2,6]
    valTimesIndex([1,-2,-3]) // [0,-2,-6]
*/

function valTimesIndex(arr) {
    return arr.map((val, index) => val * index);
}

/*
Write a function called extractKey which accepts an array of objects and some key and returns a new array with the value of that key in each object.

Examples:
    extractKey([{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}], 'name') // ['Elie', 'Tim', 'Matt', 'Colt']
*/

function extractKey(arr, key){
    return arr.map(obj => obj[key]);
}

/*
Write a function called filterByValue which accepts an array of objects and a key and returns a new array with all the objects that contain that key.

Examples:
    filterByValue([{first: 'Elie', last:"Schoppik"}, {first: 'Tim', last:"Garcia", isCatOwner: true}, {first: 'Matt', last:"Lane"}, {first: 'Colt', last:"Steele", isCatOwner: true}], 'isCatOwner') // [{first: 'Tim', last:"Garcia", isCatOwner: true}, {first: 'Colt', last:"Steele", isCatOwner: true}]
*/

function filterByValue(arr, key) {
    return arr.filter(obj => obj.hasOwnProperty(key));
}





// Display code part --------------------------
const outputElementMapFilter = document.getElementById('console-output2');
const logMapFilter = message => {
	console.log(message);
	if (outputElementMapFilter) {
		const entry = document.createElement('div');
		entry.className = 'log-entry info';
		entry.textContent = typeof message === 'string' ? message : JSON.stringify(message, null, 2);
		outputElementMapFilter.appendChild(entry);
	}
};

logMapFilter('Map/Filter Exercises:');
logMapFilter('doubleValuesWithMap([1,2,3]):', doubleValuesWithMap([1,2,3]));
logMapFilter('valTimesIndex([1,2,3]):', valTimesIndex([1,2,3]));
logMapFilter('extractKey([{name:"Elie"}], "name"):', extractKey([{name:"Elie"}], "name"));
logMapFilter('filterByValue([{isCatOwner:true}], "isCatOwner"):', filterByValue([{isCatOwner:true}], "isCatOwner"));
// -------------------------------------------