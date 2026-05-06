const planets = [
	{name: "Mercury", temperature: 440, distance: 0.39},
	{name: "Venus", temperature: 737, distance: 0.72},
	{name: "Earth", temperature: 288, distance: 1},
	{name: "Mars", temperature: 253, distance: 1.5},
	{name: "Jupiter", temperature: 163, distance: 5.2},
	{name: "Saturn", temperature: 133, distance: 9.58},
	{name: "Uranus", temperature: 78, distance: 19.22},
	{name: "Neptune", temperature: 73, distance: 30.05}
];
//take elements from html
const tempMinInput = document.getElementById('temp-min');
const tempMaxInput = document.getElementById('temp-max');
const distMinInput = document.getElementById('dist-min');
const distMaxInput = document.getElementById('dist-max');
const resultsList = document.getElementById('results-list');
const showResultsButton = document.getElementById('show-results');

const parseNumber = value => {
	const parsed = Number(value);
	return Number.isFinite(parsed) ? parsed : null; //null
};

const renderResults = filteredPlanets => {
	resultsList.innerHTML = '';

	if (filteredPlanets.length === 0) {
		const empty = document.createElement('p');
		empty.className = 'empty-state';
		empty.textContent = 'No planets match the selected filter criteria.';
		resultsList.appendChild(empty);
		return;
	}
// Should add  max\min values later
	filteredPlanets.forEach(planet => {
		const card = document.createElement('div');
		card.className = 'planet-card';
		card.innerHTML = `
			<strong>${planet.name}</strong>
			<p>Temperature: ${planet.temperature} K</p>
			<p>Distance from Sun: ${planet.distance} AU</p>
		`;
		resultsList.appendChild(card);
	});
};
//fiters temp
const filterPlanets = () => {
	const tempMin = parseNumber(tempMinInput.value);
	const tempMax = parseNumber(tempMaxInput.value);
//dist
	const distMin = parseNumber(distMinInput.value);
	const distMax = parseNumber(distMaxInput.value);
//temp
	const filtered = planets.filter(planet => {
		const matchesTempMin = tempMin === null || planet.temperature >= tempMin;
		const matchesTempMax = tempMax === null || planet.temperature <= tempMax;
//dist
		const matchesDistMin = distMin === null || planet.distance >= distMin;
		const matchesDistMax = distMax === null || planet.distance <= distMax;

		return matchesTempMin && matchesTempMax && matchesDistMin && matchesDistMax;
	});

	renderResults(filtered);//??? add at index
};
//results
showResultsButton.addEventListener('click', filterPlanets);

