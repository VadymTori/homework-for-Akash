//Tasks:
// Task 1
document.getElementById("task1").innerText = "Surprise, Akash xD";

// Task 2
document.getElementById("task2").innerHTML += "<button>Submit button is here</button>";

// Task 3
document.body.style.backgroundColor = "#232323"; //Bad choice for background color....
// document.body.style.backgroundColor = "#ddedf7"; 

// Task 4
const items = document.querySelectorAll(".item");
items.forEach(item => {
  item.style.border = "2px solid black";
});

// Task 5
document.getElementById("task5").href = "https://www.springboard.com/";

// Task 6
document.getElementById("task6").value = "DOM Master";

// Task 7
document.getElementById("task7").classList.add("new-class");

// Task 8
const button = document.createElement("button");
button.innerText = "New Button";
document.getElementById("task8").appendChild(button);

// Task 9
const task9 = document.getElementById("task9");
if (task9) {
  task9.remove();
}
//PS I've been more interested in test.js ---> nice test functions =)