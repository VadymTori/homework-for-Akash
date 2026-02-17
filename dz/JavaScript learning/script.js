const userName = `Akash` //if we use const inside other const. make sure yuo declarate it before (i spent much time looking for bug due to this issue)
const practice01 =`${userName},You owe me ${125 * 8+0.25} $`;
document.getElementById("outputText").value = practice01; //Here we output result(s)