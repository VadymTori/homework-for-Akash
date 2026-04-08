const form = document.querySelector('#add-friends');
const input = document.querySelector('#first-name');
const friendList = document.querySelector('#friend-list');

const colorBtn = document.createElement('button');
colorBtn.type = 'button';
colorBtn.id = 'color-picker-btn';
colorBtn.textContent = '🎨 Change Boxes Color'; // icons inside code is fun....
form.appendChild(colorBtn);

let boxCounter = 1;
let currentBorderColor = '#00ff9d';

// localStorage keys
const STORAGE_BOXES = 'deathNoteBoxes'; //box keys
const STORAGE_COLOR = 'deathNoteColor'; //color keys
const STORAGE_COUNTER = 'deathNoteCounter'; //counter keys
// const STORAGE_BOXES_PREFIX = 'box-'; //prefix for box keys

// load from localStorage function
function loadFromStorage() {
    const savedColor = localStorage.getItem(STORAGE_COLOR); 
 // const savedColor = localStorage.getList(STORAGE_COLOR);
    if (savedColor) {
        currentBorderColor = savedColor;
        applyColorToAllBoxes();
        // else{
    //         }
    } //just a small symbol has been commented and all code ruined for long time (X_x)

    const savedCounter = localStorage.getItem(STORAGE_COUNTER);
    if (savedCounter) boxCounter = parseInt(savedCounter);

    const savedBoxes = JSON.parse(localStorage.getItem(STORAGE_BOXES)) || []; // JSON.parse - get data\list\object\string
    
    savedBoxes.forEach(boxData => {
        createBox(boxData.name, boxData.id);
    });
}

// should save all boxes, color and counter to localStorage function
function saveBoxes() {
    const boxes = [];
    document.querySelectorAll('.box').forEach(box => {
        const id = parseInt(box.id.replace('box-', ''));
        const name = box.querySelector('.friend-name').value || box.querySelector('.friend-name').textContent;
        boxes.push({ id, name });
    });
    localStorage.setItem(STORAGE_BOXES, JSON.stringify(boxes)); //save as JSON to use it later with JSON.parse
}

function saveColor() {
    localStorage.setItem(STORAGE_COLOR, currentBorderColor);
}

function saveCounter() {
    localStorage.setItem(STORAGE_COUNTER, boxCounter.toString());
}

// color for all boxes function
function applyColorToAllBoxes() {
    document.querySelectorAll('.box').forEach(box => {
        box.style.borderColor = currentBorderColor;
        box.style.boxShadow = `0 0 20px ${currentBorderColor}80`; //use ${} for dynamic color with opacity
    });

    let style = document.getElementById('dynamic-box-style');
    if (!style) {
        style = document.createElement('style');
        style.id = 'dynamic-box-style';
        document.head.appendChild(style);
    }
    style.textContent = `
        .box { border-color: ${currentBorderColor} !important; }
        .box:hover { box-shadow: 0 0 35px ${currentBorderColor}b3 !important; }
    `;
}

// resize function P.S. add save funcion in local
function createBox(name, forcedId = null) {
    const id = forcedId !== null ? forcedId : boxCounter++;

    const box = document.createElement('div');
    box.className = 'box';
    box.id = `box-${id}`;

    const idSpan = document.createElement('span');
    idSpan.className = 'box-id';
    idSpan.textContent = box.id;

    // box+nameArea+editBtn+removeBtn
    const nameArea = document.createElement('textarea');
    nameArea.className = 'friend-name';
    nameArea.value = name;
    nameArea.spellcheck = false;
    // box+nameArea+editBtn+removeBtn
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = 'Edit';
    //box+nameArea+editBtn+removeBtn
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'Mandatory sepoku';

    box.append(idSpan, nameArea, editBtn, removeBtn);

    // Double click -> ddelete function
    box.addEventListener('dblclick', (e) => {
        if (e.target.tagName !== 'TEXTAREA') {
            box.remove();
            saveBoxes();
        }
    });

    // Hover — coordinates
    box.addEventListener('mouseenter', () => {
        const rect = box.getBoundingClientRect();
        idSpan.textContent = `x:${Math.round(rect.left)} y:${Math.round(rect.top)}`;
    });

    box.addEventListener('mouseleave', () => {
        idSpan.textContent = box.id;
    });

    // save box after change to us is later at resize and input
    nameArea.addEventListener('input', () => saveBoxes());
    nameArea.addEventListener('blur', () => saveBoxes());

    // try saveBoxes to save size after refresh, but it doesn't work, so I add resizeObserver to save size after change
    const resizeObserver = new ResizeObserver(() => {
        saveBoxes();
    });
    resizeObserver.observe(box);

    friendList.appendChild(box);

    if (forcedId === null) {
        saveBoxes();
        saveCounter();
    }

    return box;
}

// Change color
colorBtn.addEventListener('click', () => {
    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.value = currentBorderColor;
    
    colorInput.addEventListener('input', (e) => {
        currentBorderColor = e.target.value;
        applyColorToAllBoxes();
        saveColor();
    });
    
    colorInput.click();
});

// Add box on form submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!input.value.trim()) return;
    createBox(input.value.trim());
    input.value = '';
});

// Pressing "n" to add box, but not when focus on input or textarea P.S. fix a bug while press 'n' in input text
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'n' && 
        !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        
        const name = prompt('Введіть ім’я для нового боксу:');
        if (name && name.trim()) createBox(name.trim());
    }
});

// Edit\delete buttons 
friendList.addEventListener('click', (e) => {
    const box = e.target.closest('.box');
    if (!box) return;

    if (e.target.classList.contains('edit-btn')) {
        const nameArea = box.querySelector('.friend-name');
        const newName = prompt('Correct the name for Death Note', nameArea.value);
        if (newName && newName.trim()) {
            nameArea.value = newName.trim();
            saveBoxes();
        }
    }

    if (e.target.classList.contains('remove-btn')) {
        box.remove();
        saveBoxes();
    }
});

// Inizialize starter page
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#friend-list li').forEach(li => li.remove());
    
    loadFromStorage();

    // Test box to play with
    if (document.querySelectorAll('.box').length === 0) {
        createBox("Kira");
    }
});