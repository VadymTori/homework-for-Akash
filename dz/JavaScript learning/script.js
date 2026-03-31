const userName = `Akash` //if we use const inside other const. make sure yuo declarate it before (i spent much time looking for bug due to this issue)
const practice01 =`${userName},You owe me ${125 * 8+0.25} $`;
document.getElementById("outputText").value = practice01; //Here we output result(s)
// ------------------------------------------------------------------------------------------------------------
// Trying to make a password saving function
let savedPassword = "";

function checkAndSave() {
  const input = document.getElementById("passwordInput");
  const password = input.value.trim(); //autamation remove spaces?!
  const display = document.getElementById("savedPassword");
  // if (password.indexOf(' ') >= 0) { // not perfect paty of condition
  if (password.indexOf(' ') !== -1) {  //better condition
    alert("Space(s) are not allowed");
    return;
  }
  if (password.length < 5) {
    alert("Password must be more than 5 symbols");
    return;
  }
  else{
    alert("Wow! You didn't make any mistakes!!!!!11")
  }

  // update the password
savedPassword = password;
  display.textContent = savedPassword;

  alert(`Password ${password} has been saved, thank you!`);
}

function showSavedMessage() {
  if (savedPassword) {
    alert(`Password ${savedPassword} has been saved, thank you!`);
  }
  // showing message
}
function getRandomCard() {
    const suits = [" ♠ (Spades)", " ♥ (Hearts)", " ♦ (Diamonds)", " ♣ (Clubs)"];
    const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    const randomRank = ranks[Math.floor(Math.random() * ranks.length)];
    const card = randomRank + randomSuit;
    document.getElementById("cardResult").textContent = card;
}