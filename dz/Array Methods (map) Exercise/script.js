const users = [
	{firstName: "Alice", lastName: "Johnson", points: 120},
	{firstName: "Bob", lastName: "Smith", points: 99},
	{firstName: "Charlie", lastName: "Brown", points: 180}
];

const transformedUsers = users.map(user => ({
	fullName: `${user.firstName} ${user.lastName}`,
	membershipStatus: user.points > 100 ? "Premium" : "Standard"
}));
// Displat part --------------------------
const outputElement = document.getElementById('console-output');
const log = message => {
	console.log(message);
	if (outputElement) {
		const entry = document.createElement('div');
		entry.className = 'log-entry info';
		entry.textContent = typeof message === 'string' ? message : JSON.stringify(message, null, 2);
		outputElement.appendChild(entry);
	}
};

log('Transformed users:');
log(transformedUsers);
// ---------------------------------------
