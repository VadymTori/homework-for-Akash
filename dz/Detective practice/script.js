//This task has been done by AI- due to my idea failed and I was looking to way how to make it. I checked th esolution and edit it in my way. I'm not proud of that
function mysteryOperation() {
    const outcome = Math.random(); // Generates a random number between 0 and 1.

    if (outcome < 0.5) {
        console.log("The operation is completed successfully!");
    } else {
        throw new Error("The operation is failed mysteriously!");
    }
}

// Track vacation days
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

// Display result on page
document.getElementById('result').textContent = `Total vacation days: ${totalVacationDays}`;
