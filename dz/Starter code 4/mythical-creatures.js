const mythicalCreatures = [
	{name: "Dragon", type: "Fire", lastSeen: "Volcano Valley"},
	{name: "Mermaid", type: "Water", lastSeen: "Coral Caves"},
	{name: "Unicorn", type: "Land", lastSeen: "Enchanted Forest"},
	{name: "Griffin", type: "Air", lastSeen: "Highwind Mountains"},
	{name: "Kraken", type: "Water", lastSeen: "Abyssal Depths"}
];
// display -------------------------------------------------------
const outputElement = document.getElementById("console-output");

function logPage(message, cssClass = "info") {
	console.log(message);
	if (outputElement) {
		const entry = document.createElement("div");
		entry.className = `log-entry ${cssClass}`;
		entry.textContent = message;
		outputElement.appendChild(entry);
	}
}
// display -------------------------------------------------------
const firstWaterCreature = mythicalCreatures.find(creature => creature.type === "Water");
logPage(`First Water creature: ${firstWaterCreature ? firstWaterCreature.name : "Not found"}`, "success");

const griffinIndex = mythicalCreatures.findIndex(creature => creature.name === "Griffin");
logPage(`Griffin index: ${griffinIndex}`, "success");

const enchantedForestCreature = mythicalCreatures.find(creature => creature.lastSeen === "Enchanted Forest");
logPage(`First creature last seen in Enchanted Forest: ${enchantedForestCreature ? enchantedForestCreature.name : "Not found"}`, "success");
