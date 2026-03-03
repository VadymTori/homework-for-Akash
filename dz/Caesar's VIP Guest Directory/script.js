// Start with this initial guest directory:
const guests = {
  ANTONY: {
    title: "General",
    region: "Rome",
    dietaryPreference: "Vegetarian",
    pastGifts: ["Golden Laurel", "Chariot"]
  },
  CICERO: {
    title: "Orator",
    region: "Arpinum",
    dietaryPreference: "Omnivore",
    pastGifts: ["Scroll of Proverbs", "Quill"]
  }
};

// -----------------------------------------------------------------------------------------------------
// After our last mentor call- I got an idea. If task give us a "const guests = ..." and probably 
// they don't want me to change it to variable "let guests =...",- so why I 
// couldn't just create and clone anoter variable and make it equal to the original one? =))))))
// When I wanted to create an Refresh page function- AI helped me to return an original object using structuredClone(guests)
// ------------------------------------------------------------------------------------------------------

let guestsClone = structuredClone(guests); //and here it is =))) made by me- modified by AI
// my buttons:
const output = document.getElementById("output");
const refreshBtn = document.getElementById("refresh");
refreshBtn.addEventListener("click", () => {
  window.location.reload();
});
const taskButtons = document.querySelectorAll("button[data-task]");

// function for  refresh page to check the workability (part made by AI)
function render() {
  output.textContent = JSON.stringify(guestsClone, null, 2); // AI said that using JSON whould prevent to brake it all if using Date, Map objects... I have no idea what does it mean =\
}
// update after Task 3- I tryied to remove function of button refresh and change it with regular Page Refresh (not-asign button)
// and at that way - I don't need all those structedClone(guests) but I already made a big part of code using it... so let it be
// how it is... we'll say it: Don't touch it if it works xD

// Default look
render();

// Refresh page and make buttons back to clickable position ( part made by AI)
refreshBtn.addEventListener("click", () => {
  guestsClone = structuredClone(guests);
  taskButtons.forEach(btn => {
    btn.disabled = false;
  });
  render();
});

// Pushing button will activate part of JavaScript code
taskButtons.forEach(button => {
  button.addEventListener("click", () => {
    const taskNumber = button.dataset.task;

    // Step 1: Add "BRUTUS" to the guest directory. He's a "Senator" from "Rome", prefers "Vegan" food, and in the past, he has gifted Caesar a "Silver Dagger" and a "Marble Bust".
    if (taskNumber === "1") {
      guestsClone.BRUTUS = {
        title: "Senator",
        region: "Rome",
        dietaryPreference: "Vegan",
        pastGifts: ["Silver Dagger", "Marble Bust"]
      };
    }
    // Step 2: Update CICERO's past gifts to include a "Golden Lyre".
        if (taskNumber === "2") {
      guestsClone.CICERO.pastGifts.push("Golden Lyre");
    }
    // Step 3: Retrieve the region of "ANTONY".
if (taskNumber === "3") {
  const antonyRegion = guestsClone.ANTONY.region || ""; // Find the region
  document.getElementById("antony-region-value").textContent = antonyRegion; //show the region in small window
}
    // Step 4: Due to unforeseen political events, "CICERO" needs to be discreetly removed from the guest list.
        if (taskNumber === "4") {
      delete guestsClone.CICERO;
    }
    // Step 5
if (taskNumber === "5") {
  const generalProfile = { ...guestsClone.ANTONY }; //well... I used guestsClone instead of guests dut to my specific codding
  generalProfile.region = "Egypt"; //Change new const region to Egypt
// this part also AI helped me to do, due to my window shows me every time result "[Object Object]"
  document.getElementById("generalProfile-ANTONY").textContent = 
    JSON.stringify(generalProfile, null, 2);
}
    // After clicking a button- make this button disabled
    button.disabled = true;

    // Refresh page
    render();
  });
});