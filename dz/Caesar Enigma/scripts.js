const alphabet = "abcdefghijklmnopqrstuvwxyz";

//After selecting number more than 31 due to alpabet length of 26 would broke the part of code. Guiding with AI changed my code and fixed tones of bugs and issues-//
function normalizeShift(shift){
    //Check this part was after changed to roller to select a number
    return ((shift % 26) + 26) % 26;
}

// I did this part to every function below *dummy*, but AI helped me and take out it as separate function. Then I just call it //
function randomLetter(){
    return alphabet[Math.floor(Math.random() * alphabet.length)];
}

//I remake this function tones of times trying to decrypt a message of Springboard. Me and AI are thinking that message cannot be decrypted //
// Iuuuau juxuu cuytudyuwxuj uixuqtuemu euv uHeuckubkui uqdut uHuuckui.u Juxuuhuu, umxuyiufuuh ujxuu umeuhtu 'uQkuhuubyukiu' ujeu juxuu muydutiu. uQdut urou ruuyudwu qurbuu ujeu wuuju jue ujxuyiu cuuiuiquwuu, uoeuk uxquluu suecufbuujuutu juxuu gukuuiju!
function shiftLetter(char, shift){

    let index = alphabet.indexOf(char.toLowerCase());

    if(index === -1){
        return char;
    }

    shift = normalizeShift(shift);

    let newIndex = (index + shift) % 26; //Check if work with letters: xyz
    let newLetter = alphabet[newIndex];

    if(char === char.toUpperCase()){
        newLetter = newLetter.toUpperCase(); //working! Finally!
    }

    return newLetter;
}

//ENCRYPT PART// (It take too much time to encrypt it in the same way,,, so the function will 
// be not finished *until better times* and left unfinished, while decrypt is working... sry =* )
function encrypt(message, shiftValue){
    shiftValue = ((shiftValue % 26) + 26) % 26; 
    let result = "";
    let letterCount = 0;
    let base = "a".charCodeAt(0);
    for(let char of message){
        if(char.match(/[a-z]/i)){
            let isUpper = char === char.toUpperCase();
            let lowerChar = char.toLowerCase();
          let shifted =
            ((lowerChar.charCodeAt(0) - base + shiftValue) % 26) + base;
            let newChar = String.fromCharCode(shifted);
            result += isUpper ? newChar.toUpperCase() : newChar;
            letterCount++;
            if(letterCount % 2 === 0){
                result += randomLetter();
            }

        } else {
            result += char;
        }
    }
    return result;
}
//DECRYPT PART//


function decrypt(encryptedMessage, shiftValue) {
    shiftValue = ((shiftValue % 26) + 26) % 26; //If shiftValue more than 26
    let filtered = ""; //remove every 2 letter
    for (let i = 0; i < encryptedMessage.length; i++) {
        if (i % 3 !== 2) {
            filtered += encryptedMessage[i];
        }
    }

//this is fnal part of rotating has been taking from task solution and upgradet by AI
    let result = "";
    let base = "a".charCodeAt(0);
    for (let char of filtered) {
        if (char.match(/[a-z]/i)) {
            let isUpper = char === char.toUpperCase();
            let lowerChar = char.toLowerCase();
            let shifted =((lowerChar.charCodeAt(0) - base - shiftValue + 26) % 26) + base;
            let newChar = String.fromCharCode(shifted);
            // output the result
            result += isUpper ? newChar.toUpperCase() : newChar;
        } else {
            result += char;
        }
    }

    return result;
}

/* --- DOM elements --- */
//DOM is AI maide//
const inputText = document.getElementById("inputText");
const encryptedText = document.getElementById("encryptedText");

const decryptInput = document.getElementById("decryptInput");
const decryptedText = document.getElementById("decryptedText");

const shiftDisplay = document.getElementById("shiftValue");

let shiftValue = 3;

//output forms//
function updateTexts(){

    encryptedText.value = encrypt(inputText.value, shiftValue);
    decryptedText.value = decrypt(decryptInput.value, shiftValue);

}

inputText.addEventListener("input", updateTexts);
decryptInput.addEventListener("input", updateTexts);

//Copy button//
function copyText(id){
    navigator.clipboard.writeText(document.getElementById(id).value);
}
//Clear button//
function clearText(input,output){
    document.getElementById(input).value="";
    document.getElementById(output).value="";
}

/* --- DIAL --- */
const canvas = document.getElementById("dial");
const ctx = canvas.getContext("2d");

const radius = canvas.width/2 - 10;

let dragging = false;
//---------------------------------------------------------------------------------------------------//
//Fully AI maid part for shiftValue. And I like it :) //
function drawDial(value){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, radius, 0, 2*Math.PI);
    ctx.fillStyle="#14141c";
    ctx.fill();

    ctx.lineWidth=4;
    ctx.strokeStyle="#a855f7";
    ctx.stroke();

    /* arrow */
    let angle = (value/99) * 2*Math.PI - Math.PI/2;

    let x = canvas.width/2 + radius*0.8*Math.cos(angle);
    let y = canvas.height/2 + radius*0.8*Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(canvas.width/2, canvas.height/2);
    ctx.lineTo(x,y);

    ctx.strokeStyle="#c084fc";
    ctx.lineWidth=3;
    ctx.stroke();
}

drawDial(shiftValue);

/* dial interaction */
canvas.addEventListener("mousedown",()=>dragging=true);
canvas.addEventListener("mouseup",()=>dragging=false);
canvas.addEventListener("mouseleave",()=>dragging=false);

canvas.addEventListener("mousemove",(e)=>{

    if(!dragging) return;

    const rect = canvas.getBoundingClientRect();

    const dx = e.clientX - (rect.left + canvas.width/2);
    const dy = e.clientY - (rect.top + canvas.height/2);

    let angle = Math.atan2(dy,dx) + Math.PI/2;

    if(angle < 0) angle += 2*Math.PI;

    shiftValue = Math.round(angle/(2*Math.PI)*99);

    if(shiftValue < 1) shiftValue = 1;

    shiftDisplay.textContent = shiftValue;

    drawDial(shiftValue);

    updateTexts();

});