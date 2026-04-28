// Task 1: Declare The Task Array and The Interval ID
// TODO: Begin by declaring an array to hold your one-time tasks (`oneTimeTasks`) and variables for any interval IDs you'll need for continuous tasks (`monitoringTaskId`).

const consoleOutput = document.getElementById('console-output');
const originalLog = console.log;

console.log = function(...args) {
    originalLog.apply(console, args);
    
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.textContent = args.join(' ');
    consoleOutput.appendChild(entry);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
};

// Task 1: Declare The Task Array and The Interval ID
const oneTimeTasks = [];
let monitoringTaskId;

// Task 2: Add One-Time Task Function
function addOneTimeTask(func, delay) {
    oneTimeTasks.push({ func, delay });
}

// Task 3: Run One-Time Tasks Function
function runOneTimeTasks() {
    oneTimeTasks.forEach(task => {
        setTimeout(task.func, task.delay);
    });
}

// Task 4: Start Monitoring Function
function startMonitoring() {
    monitoringTaskId = setInterval(() => {
        console.log("System monitoring: All systems nominal...");
    }, 3000);
}

// Task 5: Stop Monitoring Function
function stopMonitoring() {
    clearInterval(monitoringTaskId);
    console.log("Monitoring stopped.");
}

// Task 6: Start Countdown Function
function startCountdown(duration) {
    let remaining = duration;
    
    console.log("Rocket engines preparing...");
    
    const countdownId = setInterval(() => {
        console.log(`Countdown: ${remaining} seconds remaining`);
        remaining--;
        
        if (remaining < 0) {
            clearInterval(countdownId);
            console.log("Liftoff!");
        }
    }, 1000);
}

// Task 7: Schedule Pre-Launch Activities and Launch
function scheduleMission() {
    // Add one-time tasks
    addOneTimeTask(() => console.log("Pre-launch system check: All systems go!"), 1000);
    addOneTimeTask(startMonitoring, 2000);
    addOneTimeTask(() => {
        stopMonitoring();
        startCountdown(5);
    }, 8000);
    
    // Run all one-time tasks
    runOneTimeTasks();
}

// Start mission on button click
document.getElementById('start-btn').addEventListener('click', function() {
    // Disable button to prevent multiple clicks
    this.disabled = true;
    this.textContent = 'Mission in progress...';
    
    scheduleMission();
});
