// const userName = `Akash` 
// document.getElementById("outputText").value = practice01;

const randomDecimal = Math.random(); //Here we take a random number after Decimal
// document.getElementById("outputText").value = randomDecimal
const range = 33 - 3 + 1; // we add 1 co be sure that we have a full number from 3 to 33
// document.getElementById("outputText").value = range
const randomInRange = randomDecimal * range; // I don't know why we doing this... I copied from the answher
// document.getElementById("outputText").value = randomInRange
const randomInt = Math.floor(randomInRange); // we round it to a number in range from 0 to 1 as we need it
// document.getElementById("outputText").value = randomInt
const shiftValue = randomInt + 3; // this will allow us to get numbers from range 30-33 with no problem
document.getElementById("outputText").value = shiftValue
//--------------------------------------------------------------------------------------------------------------
// I DID TASK IN MY WAY AND CHANGED const emblemClue(x) for my needs to better fit the visual part or the task
//--------------------------------------------------------------------------------------------------------------
// let taskResult1= "";
// const emblemClue1 = "Eagle";
// const emblemClue2 = "Laurel";
// const emblemClue3 = 7;

// function secretPlace() {
//   const clue = document.getElementById("clueInput").value.trim();
//   const display = document.getElementById("location");

//   if (clue === "Eagle") {
//     display.textContent = "Forum";
//   }
//   else if (clue === "Lion") {
//     display.textContent = "Colosseum";
//   }
//   else {
//     display.textContent = "Villa";
//   }
// }
//--------------------------------------------------------------------------------------------------------------
function updateLocationStart() {
  const clue = document.getElementById("emblemClue").value.trim();
  let locationStart = "unknown yet";

  if (clue === "Eagle") {
    locationStart = "Forum";
  } else if (clue === "Lion") {
    locationStart = "Colosseum";
  } else if (clue !== "") {
    locationStart = "Villa";
  }

  document.getElementById("locationAuto").textContent = locationStart;
  document.getElementById("resultAuto").textContent = "First location " + locationStart;
}

function showAllResults() {
  const clue1 = document.getElementById("emblemClue").value.trim();
  const clue2 = document.getElementById("secondClue").value.trim();
  const locSelected = document.getElementById("selectedLocation").value;

  let dirValue = "";
  const radios = document.getElementsByName("dir");
  for (let r of radios) {
    if (r.checked) {
      dirValue = r.value;
      break;
    }
  }

  let direction = "-";
  if (dirValue === "7") direction = "North";
  else if (dirValue === "3") direction = "South";
  else if (dirValue === "9") direction = "East";
  else if (dirValue === "4") direction = "West";

  // Update all the fields
  document.getElementById("resultSelected").textContent = "Chosen location: " + (locSelected || "-");
  document.getElementById("resultSecond").textContent   = "Real secret word: " + (clue2 || "-");
  document.getElementById("resultDirection").textContent = "Dirrection: " + direction;

//   if (emblemClue2 === "Laurel" && locationStart === "Forum")
// {
//   locationStart += " of Augustus";
// }
// else if (emblemClue2 === "Grapes" || locationStart === "Villa")
// {
//   locationStart += " of Pompey";
// }

  let final = "uknown yet";
  if (clue1 === "Eagle" && locSelected === "Forum" && dirValue === "7") {
    final = "Forum of Augustus " + direction;
        // final = localStart + dirValue + direction;
  } else if ((clue2 === "Grapes" || locSelected === "Villa") && dirValue === "4") {
    final = "Villa of Pompey " + direction;
      } else if ((clue2 === "Laurel" || locSelected === "Colleseum") && dirValue === "9") {
    final = "Colleseum entrance " + direction;
  } else if (clue1) {
    final = clue1 + " *ops smth wrong* " + document.getElementById("locationAuto").textContent + " " + direction;
  }
  else{
    final = "Oh my... I did not expect that result... nice word Akash... you broke it.... *angry*, ok let it be: " + locationStart + dirValue + direction;
  }
//I tried to connect answhers using `${...} but it always fail... than I tried using variable names....it fails also... so I connect result to else if condtions as text
  document.getElementById("finalMessage").innerHTML = 
    "Secret party will be: <span style='color:#c0392b;'>" + final + "</span>"; //I didn't know I can add style color at JavaScript (O_o) thx GPT
}