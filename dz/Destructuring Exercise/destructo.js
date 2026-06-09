/* Task 1: Unveiling the Coordinates */
const coordinates = {x: 34, y: 42, z: 67};
const { x, y } = coordinates;
console.log(`Coordinates found: x=${x}, y=${y}`);

/* Task 2: The Map of Secrets */
const locations = {
	first: "Cave of Wonders",
	second: "Lake of Mystery",
	third: "Mount of Ages",
	fourth: "Desert of Shadows"
};
const { first, second, ...remaining } = locations;
console.log(`Key locations: ${first}, ${second}`);
console.log(`Remaining locations: ${JSON.stringify(remaining)}`);

/* Task 3: The Mysterious Door */
const doorCode = {
	upper: "Alpha",
	lower: "Omega"
};
const defaultMiddle = Object.values(remaining)[0];
const { upper, lower, middle = defaultMiddle } = doorCode;
console.log(`Door code sequence: ${upper} - ${middle} - ${lower}`);

/* Task 4: The Guardian's Riddle */
const riddle = {
	ancientWord: "Sphinx",
	modernWord: "Cat"
};
const { ancientWord: translation } = riddle;
console.log(`Riddle translation: ${translation}`);

/* Task 5: The Array of Elements */
const elements = ["Fire", "Water", "Earth", "Air"];
const [firstElement, secondElement] = elements;
console.log(`Essential elements: ${firstElement}, ${secondElement}`);

/* Task 6: Skipping Stones */
const stones = [1, 2, 3, 4, 5, 6];
const [firstStone, , , , , sixthStone] = stones;
console.log(`Skipped stones result: ${firstStone} and ${sixthStone}`);

/* Task 7: The Array of Shadows */
const shadows = ["Darkness", "Silence", "Whisper", "Echo"];
const [visibleShadow, ...hiddenShadows] = shadows;
console.log(`Visible shadow: ${visibleShadow}`);
console.log(`Hidden shadows: ${JSON.stringify(hiddenShadows)}`);

/* Task 8: The Wise Function */
function revealPath({ direction, distance }) {
	console.log(`Reveal path: travel ${distance} towards ${direction}`);
}
revealPath({ direction: "north", distance: "10 paces" });

/* Task 9: The Scroll of Defaults */
function mixPotion({ ingredient1 = "Water", ingredient2 = "Fireflower" } = {}) {
	console.log(`Mixing potion: ${ingredient1} + ${ingredient2}`);
}
mixPotion({ ingredient1: "Mandrake" });
mixPotion({});

/* Task 10: The Array Spell */
function castSpell(ingredients) {
	const [spellIngredient1, spellIngredient2] = ingredients;
	console.log(`Cast spell with: ${spellIngredient1} and ${spellIngredient2}`);
}
castSpell(["Moonstone", "Dragon's Breath", "Stardust"]);

/* Task 11: The Nested Secret */
const nestedSecret = {outer: {inner: "The Final Key"}};
const { outer: { inner: finalKey } } = nestedSecret;
console.log(`Unveiled secret: ${finalKey}`);

/* Task 12: The Swap of Fate */
let stoneA = "Emerald";
let stoneB = "Ruby";
[stoneA, stoneB] = [stoneB, stoneA];
console.log(`Swapped stones: stoneA=${stoneA}, stoneB=${stoneB}`);
