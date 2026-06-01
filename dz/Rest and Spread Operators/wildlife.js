/* Task 1: Track Animal Sightings */
// TODO: Write a function with rest parameters to print sightings of different animals within the sanctuary. This function should accept an arbitrary number of animal names.
function trackAnimalSightings(...animals) {
	console.log("Animal Sightings: " + animals.join(", "));
}
trackAnimalSightings("Lion", "Elephant", "Zebra", "Giraffe");

/* Task 2: Merge Habitat Areas */
const forestHabitats = ["Forest A", "Forest B"];
const savannahHabitats = ["Savannah C", "Savannah D"];
// TODO: You are given two arrays of habitat names. Use the spread operator to combine them into a comprehensive list of protected areas within the sanctuary.
const allHabitats = [...forestHabitats, ...savannahHabitats];
console.log("Protected Areas: " + allHabitats.join(", "));

/* Task 3: Update Conservation Status */
const rhinoStatus = {
	population: 500,
	status: "Endangered"
};
// TODO: You are given an object representing an animal's conservation status. Use the spread operator to update this status with new information, such as an increase in population or a change in habitat.
const updatedRhinoStatus = { ...rhinoStatus, population: 520, habitat: "Savannah" };
console.log("Updated Rhino Status: " + JSON.stringify(updatedRhinoStatus));

/* Task 4: Catalog Genetic Diversity */
const lionProfile = {
	name: "Leo",
	age: 5,
	species: "Lion"
};
const lionProfileCopy = { ...lionProfile, genetics: { purity: "High", diversity: "Strong" } };
console.log("Lion Profile Copy: " + JSON.stringify(lionProfileCopy));
/*
 * Observations:
 * The shallow copy spreads the top-level properties of the original object into a new object.
 * Since we added a new property (genetics), it only exists in the copy, not the original.
 * If the original object had nested objects, both the original and copy would reference the same nested object (shallow copy behavior)
 * Observations:
 * TODO: Explain here.
 */

/* Task 5: Analyze Ecosystem Health */
const ecosystemHealth = {
	waterQuality: "Good",
	foodSupply: {
		herbivores: "Abundant",
		carnivores: "Sufficient"
	}
};
const ecosystemHealthCopy = { ...ecosystemHealth, foodSupply: { ...ecosystemHealth.foodSupply, herbivores: "Decreasing" } };
console.log("Original Ecosystem: " + JSON.stringify(ecosystemHealth));
console.log("Ecosystem Copy (Updated): " + JSON.stringify(ecosystemHealthCopy));
/*
 * Observations:
 * When using a shallow copy with the spread operator, the top-level properties are copied, but nested objects are still referenced.
 * To properly update nested properties without affecting the original, we need to spread the nested object too.
 * In this example, we created a new foodSupply object for the copy, so the original remains unchanged.
 * Without spreading the nested object, modifications to foodSupply in the copy would also affect the original
// TODO: You are given an object with a nested structure detailing the ecosystem's health, including water quality and food supply. Perform a shallow copy and modify a nested property. Observe and explain how changes to nested properties affect both the original and the copied object.
/*
 * Observations:
 * TODO: Explain here.
 */