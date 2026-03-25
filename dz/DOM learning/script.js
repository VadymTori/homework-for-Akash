// Here we go 
const form = document.querySelector('#add-friends');
const input = document.querySelector('#first-name');
const friendList = document.querySelector('#friend-list');

// ----------------------------------------------------------
friendList.addEventListener('click', function (e) {
    //Deleting part
    if (e.target.classList.contains('remove-btn')) {
        e.target.parentElement.remove();
    }

    // Editing part
    if (e.target.classList.contains('edit-btn')) {
        const li = e.target.parentElement;
        const nameSpan = li.querySelector('.friend-name');
        if (nameSpan) {
            const currentName = nameSpan.textContent;
            const newName = prompt('Correct the name for Death Note', currentName);
            //ChatGPT give idea for Trim and said to trim the new name and check if it's not empty before updating the text content
            if (newName !== null && newName.trim() !== '') {
                nameSpan.textContent = newName.trim();
            }
        }
    }
});

// ----------------------------------------------------------
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!input.value.trim()) return;

    const newFriend = document.createElement('li');

    const nameSpan = document.createElement('span');
    nameSpan.className = 'friend-name';
    nameSpan.textContent = input.value.trim();

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.innerText = 'Edit';

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.innerText = 'Mandatory sepoku';

    newFriend.appendChild(nameSpan);
    newFriend.appendChild(editBtn);
    newFriend.appendChild(removeBtn);

    friendList.appendChild(newFriend);
    input.value = '';
});