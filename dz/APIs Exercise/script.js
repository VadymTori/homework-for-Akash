// //COMMENTED PART WAS FULLY MADE BY AI. I NEED IT TO MY CODE COMPATING.
// // My hybrid code version is starting at line 114

// // APIs Exercise - Very Secret Hacker Hub
// // Using dummyjson.com (free, no key required) for login + users data

// const loginForm = document.getElementById('login-form');
// const logoutButton = document.getElementById('logout-button');
// const systemMessage = document.getElementById('system-message');
// const intelligenceForm = document.getElementById('intelligence-form');
// const pageInput = document.getElementById('page-number-input');
// const hackersContainer = document.getElementById('hackers');

// let authToken = null;

// // Restore token from localStorage on page load (optional persistence)
// document.addEventListener('DOMContentLoaded', () => {
//   const saved = localStorage.getItem('secretHackerToken');
//   if (saved) {
//     authToken = saved;
//     axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
//     systemMessage.textContent = 'Token restored from previous session. Ready to gather intel.';
//   }
// });

// // Handle Login (Infiltrate)
// loginForm.addEventListener('submit', async (e) => {
//   e.preventDefault();

//   const email = document.getElementById('email-input').value.trim();
//   const password = document.getElementById('password-input').value.trim();

//   if (!email || !password) {
//     systemMessage.textContent = 'Please provide both email and password.';
//     return;
//   }

//   systemMessage.textContent = 'Attempting infiltration...';

//   try {
//     // DummyJSON expects username + password (we treat email field as username for demo)
//     // Recommended test creds: username "emilys" password "emilyspass"
//     // But since form uses email input, we accept username or map email->username
//     const username = email.includes('@') ? email.split('@')[0] : email;

//     const res = await axios.post('https://dummyjson.com/auth/login', {
//       username,
//       password,
//       expiresInMins: 30
//     });

//     authToken = res.data.token;
//     localStorage.setItem('secretHackerToken', authToken);
//     axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

//     const user = res.data;
//     systemMessage.textContent = `Infiltration successful! Welcome, ${user.firstName} ${user.lastName}. Token stored.`;
//   } catch (err) {
//     const msg = err.response?.data?.message || err.message;
//     systemMessage.textContent = `Login failed: ${msg}. (Try: emilys / emilyspass  OR  michaelw / michaelwpass)`;
//   }
// });

// // Handle Logout (Sneak Away)
// logoutButton.addEventListener('click', () => {
//   authToken = null;
//   localStorage.removeItem('secretHackerToken');
//   delete axios.defaults.headers.common['Authorization'];

//   systemMessage.textContent = 'You have successfully sneaked away.';
//   hackersContainer.innerHTML = '...';
// });

// // Handle Fetch Hackers (Gather Intelligence)
// intelligenceForm.addEventListener('submit', async (e) => {
//   e.preventDefault();

//   const page = parseInt(pageInput.value, 10) || 1;
//   const limit = 6; // number of hackers per "page"
//   const skip = (page - 1) * limit;

//   hackersContainer.innerHTML = 'Fetching hackers...';

//   try {
//     const res = await axios.get(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);
//     const hackers = res.data.users;

//     hackersContainer.innerHTML = '';

//     if (!hackers || hackers.length === 0) {
//       hackersContainer.textContent = 'No hackers found on this page.';
//       return;
//     }

//     hackers.forEach((hacker) => {
//       const el = document.createElement('div');
//       el.className = 'hacker';
//       el.innerHTML = `
//         <img src="${hacker.image}" alt="${hacker.firstName} ${hacker.lastName}" width="60" height="60">
//         <div>
//           <strong>${hacker.firstName} ${hacker.lastName}</strong><br>
//           <small>${hacker.email}</small><br>
//           <small>@${hacker.username}</small>
//         </div>
//       `;
//       hackersContainer.appendChild(el);
//     });
//   } catch (err) {
//     hackersContainer.textContent = 'Failed to fetch hackers. Check your connection or try again.';
//     console.error('Fetch error:', err);
//   }
// });
//---------------------------------------------------------------------------------------
const loginForm = document.getElementById('login-form');
const logoutButton = document.getElementById('logout-button');
const systemMessage = document.getElementById('system-message');
const intelligenceForm = document.getElementById('intelligence-form');
const pageInput = document.getElementById('page-number-input');
const hackersContainer = document.getElementById('hackers');

let authToken = null;

function restoreSession() {
  const savedToken = localStorage.getItem('secretHackerToken');

  if (savedToken) {
    authToken = savedToken;
    systemMessage.textContent = 'Token restored from previous session. Ready to gather intel.';
  }
}
// Function restoreSession is AI made, I even don't understand how it's working. I need it to my code to work properly. I don't want to delete it.
document.addEventListener('DOMContentLoaded', restoreSession);

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email-input').value.trim();
  const password = document.getElementById('password-input').value.trim();

  if (!email || !password) {
    systemMessage.textContent = 'Please provide both email and password.';
    return;
  }

  systemMessage.textContent = 'Attempting infiltration...';
//should I use catch error here?
  try {
    const username = email.includes('@') ? email.split('@')[0] : email;

    const res = await axios.post('https://dummyjson.com/auth/login', {
      username,
      password,
      expiresInMins: 30,
    });

    const token = res.data.accessToken || res.data.token;
    authToken = token;
    localStorage.setItem('secretHackerToken', authToken);
    systemMessage.textContent = `Infiltration successful! Welcome, ${res.data.firstName} ${res.data.lastName}. Token stored.`;
  } catch (err) {
    const message = err.response?.data?.message || err.message;
    systemMessage.textContent = `Login failed: ${message}. Try emilys / emilyspass or michaelw / michaelwpass.`;
  }
});

logoutButton.addEventListener('click', () => {
  authToken = null;
  localStorage.removeItem('secretHackerToken');
  systemMessage.textContent = 'You have successfully sneaked away.';
  hackersContainer.innerHTML = '...';
});

intelligenceForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!authToken) {
    hackersContainer.textContent = 'You must log in before gathering intelligence.';
    return;
  }

  const page = parseInt(pageInput.value, 10) || 1;
  const limit = 6;
  const skip = (page - 1) * limit;
  hackersContainer.innerHTML = 'Fetching hackers...';

  try {
    const res = await axios.get(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);
    const hackers = res.data.users;

    hackersContainer.innerHTML = '';

    if (!hackers || hackers.length === 0) {
      hackersContainer.textContent = 'No hackers found on this page.';
      return;
    }

    hackers.forEach((hacker) => {
      const card = document.createElement('div');
      card.className = 'hacker';
      card.innerHTML = `
        <img src="${hacker.image}" alt="${hacker.firstName} ${hacker.lastName}" width="60" height="60">
        <div>
          <strong>${hacker.firstName} ${hacker.lastName}</strong><br>
          <small>${hacker.email}</small><br>
          <small>@${hacker.username}</small>
        </div>
      `;
      hackersContainer.appendChild(card);
    });
  } catch (err) {
    hackersContainer.textContent = 'Failed to fetch hackers. Check your connection or try again.';
    console.error('Fetch error:', err);
  }
});
