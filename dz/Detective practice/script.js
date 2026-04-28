// Override console.log to display in HTML
const consoleOutput = document.getElementById('console-output');
const originalLog = console.log;

console.log = function(...args) {
    originalLog.apply(console, args);
    
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    
    const text = args.join(' ');
    if (text.includes('Success')) {
        entry.classList.add('success');
    } else if (text.includes('Failed')) {
        entry.classList.add('fail');
    } else if (text.includes('Total')) {
        entry.classList.add('total');
    } else if (text.includes('completed')) {
        entry.classList.add('info');
    }
    
    entry.textContent = text;
    consoleOutput.appendChild(entry);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
};

//This task has been done by AI- due to my idea failed and I was looking to way how to make it. I checked th esolution and edit it in my way. I'm not proud of that
function mysteryOperation() {
    const outcome = Math.random(); // Generates a random number between 0 and 1.

    if (outcome < 0.5) {
        console.log("The operation is completed successfully!");
    } else {
        throw new Error("The operation is failed mysteriously!");
    }
}

// Days tracking
let totalVacationDays = 0;
const totalMissions = 20;

for (let i = 1; i <= totalMissions; i++) {
    try {
        mysteryOperation();
        // If successful: 13 days vacation + 3 days attendance
        totalVacationDays += 13 + 3;
        console.log(`Mission ${i}: Success! +16 days`);
    } catch (error) {
        // If failed: 1 day vacation + 3 days attendance
        totalVacationDays += 1 + 3;
        console.log(`Mission ${i}: Failed! +4 days`);
    } finally {
        // Attendance days are already included in both cases
        console.log(`Mission ${i} completed.`);
    }
}

console.log(`\n🎉 Total vacation days earned: ${totalVacationDays} days!`);

// Display result
document.getElementById('result').textContent = `Total vacation days: ${totalVacationDays}`;
