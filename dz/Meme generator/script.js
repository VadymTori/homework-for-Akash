//Here we go... keys go first

const memeForm = document.getElementById('meme-form');
const memeContainer = document.getElementById('meme-container');
const STORAGE_MEMES = 'deathNoteMemes';   // ok, I planned to do it from zero, but than to save my time I used functions from previus task
// const STORAGE_BOXES = 'deathNoteBoxes'; //box keys
// const STORAGE_COLOR = 'deathNoteColor'; //color keys
// const STORAGE_COUNTER = 'deathNoteCounter'; //counter keys
//create "meme" element, class name "meme", div "meme"

// create meme
function createMeme(imageLink, topText, bottomText, isNew = false) {
    const memeDiv = document.createElement('div');
    memeDiv.className = 'meme';

    memeDiv.innerHTML = `
        <img src="${imageLink}" alt="meme" 
             onerror="this.src='https://t4.ftcdn.net/jpg/02/97/01/65/360_F_297016511_NWrJG1s3mpyjqD3hwdKidfYsvhEnrPm4.jpg';">
        <div class="meme-text top-text">${topText || ''}</div>
        <div class="meme-text bottom-text">${bottomText || ''}</div>
        <button class="delete-btn">✕</button>
    `;

    // delete meme
    const deleteBtn = memeDiv.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        memeDiv.remove();
        saveMemesToStorage();
    });

    memeContainer.appendChild(memeDiv);

    // locas save
    if (isNew) {
        saveMemesToStorage();
    }
}

// Oh... I can save at all using querySelectorAll at localStorage
function saveMemesToStorage() {
    const memes = [];
    document.querySelectorAll('.meme').forEach(meme => { //there you are
        const img = meme.querySelector('img').src;
        const top = meme.querySelector('.top-text').textContent;
        const bottom = meme.querySelector('.bottom-text').textContent;
        
        // save image as an array for JSON
        memes.push({
            imageLink: img,
            topText: top,
            bottomText: bottom
        });
    });
    localStorage.setItem(STORAGE_MEMES, JSON.stringify(memes));
}

// load from storage
function loadMemesFromStorage() {
    const savedMemes = JSON.parse(localStorage.getItem(STORAGE_MEMES)) || [];
    
    savedMemes.forEach(memeData => {
        createMeme(memeData.imageLink, memeData.topText, memeData.bottomText);
    });
}

// fumnction e:
// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     if (!input.value.trim()) return;
//     createBox(input.value.trim());
//     input.value = '';
// });
memeForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const imageLink = document.getElementById('image-link').value.trim();
    const topText    = document.getElementById('top-text').value.trim();
    const bottomText = document.getElementById('bottom-text').value.trim();

    if (!imageLink || !topText || !bottomText) return;

    // create all together
    createMeme(imageLink, topText, bottomText, true);

    // clear memes
    memeForm.reset();
});

// load page from storage
document.addEventListener('DOMContentLoaded', () => {
    loadMemesFromStorage();
});