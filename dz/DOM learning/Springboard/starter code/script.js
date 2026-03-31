const form = document.querySelector('#add-friends');
const input = document.querySelector('#first-name');
const friendList = document.querySelector('#friend-list');

// Color button
const colorBtn = document.createElement('button');
colorBtn.type = 'button';
colorBtn.id = 'color-picker-btn';
colorBtn.textContent = '🎨 Change Boxes Color';
form.appendChild(colorBtn);  

let boxCounter = 1;
let currentBorderColor = '#00ff9d';

// Add new box------------------------------------
function createBox(name) {
    const box = document.createElement('div');
    box.className = 'box';
    box.id = `box-${boxCounter++}`;

    // ID classname BOX ID-----------------------
    const idSpan = document.createElement('span');
    idSpan.className = 'box-id';
    idSpan.textContent = box.id;
// Name--------------------------------------
    const nameSpan = document.createElement('span');
    nameSpan.className = 'friend-name';
    nameSpan.textContent = name;
//Edit
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = 'Edit';
//Remove
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'Mandatory sepoku';

    box.append(idSpan, nameSpan, editBtn, removeBtn);

    //Double click
    box.addEventListener('dblclick', () => box.remove());

    // Hover — coordinates
    box.addEventListener('mouseenter', () => {
        const rect = box.getBoundingClientRect();
        idSpan.textContent = `x:${Math.round(rect.left)} y:${Math.round(rect.top)}`;
    });

    box.addEventListener('mouseleave', () => {
        idSpan.textContent = box.id;
    });

    friendList.appendChild(box);
    return box;
}

// This part  has been made with AI help, but it worked bad, so I creater my own button and use part of this code to change color for the all boxes 
colorBtn.addEventListener('click', () => {
    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.value = currentBorderColor;
    
    colorInput.addEventListener('input', (e) => {
        currentBorderColor = e.target.value;

        // Chacnging all current boxes
        document.querySelectorAll('.box').forEach(box => {
            box.style.borderColor = currentBorderColor;
            box.style.boxShadow = `0 0 20px ${currentBorderColor}80`;
        });

        // Changing all futere boxes
        let style = document.getElementById('dynamic-box-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'dynamic-box-style';
            document.head.appendChild(style);
        }
        style.textContent = `
            .box { 
                border-color: ${currentBorderColor} !important; 
            }
            .box:hover {
                box-shadow: 0 0 35px ${currentBorderColor}b3 !important;
            }
        `;
    });
    colorInput.click();
});

// Add new box by click
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!input.value.trim()) return;
    createBox(input.value.trim());
    input.value = '';
});

// Add new box by pressing "n" key
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'n') {
        const name = prompt('Введіть ім’я для нового боксу:');
        if (name && name.trim()) createBox(name.trim());
    }
});

// Meny for edit and remove
friendList.addEventListener('click', (e) => {
    const box = e.target.closest('.box');
    if (!box) return;

    if (e.target.classList.contains('edit-btn')) {
        const nameSpan = box.querySelector('.friend-name');
        const newName = prompt('Correct the name for Death Note', nameSpan.textContent);
        if (newName && newName.trim()) {
            nameSpan.textContent = newName.trim();
        }
    }

    if (e.target.classList.contains('remove-btn')) {
        box.remove();
    }
});

// Box names from the list
document.querySelectorAll('#friend-list li').forEach(oldLi => {
    const name = oldLi.querySelector('.friend-name').textContent;
    oldLi.remove();
    createBox(name);
});