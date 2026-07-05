document.addEventListener("DOMContentLoaded", function ()
{
	const loginForm = document.getElementById("login-form");
	const emailInput = document.getElementById("email-input");
	const passwordInput = document.getElementById("password-input");
	const logoutButton = document.getElementById("logout-button");
	const systemMessageContainer = document.getElementById("system-message");

	const intelligenceForm = document.getElementById("intelligence-form");
	const pageNumberInput = document.getElementById("page-number-input");
	const hackersContainer = document.getElementById("hackers");

	const api = "https://reqres.in/api";
	let token = "";

	loginForm.addEventListener("submit", async function (event)
	{
		event.preventDefault();

		const email = emailInput.value;
		const password = passwordInput.value;

		try
		{
			const response = await axios.post(`${api}/login`, {email, password});
			token = response.data.token;
			systemMessageContainer.innerText = `Access Granted with Token: ${token}`;
		}
		catch (error)
		{
			systemMessageContainer.innerText = `Failed to Infiltrate: Invalid credentials.`;
		}
		finally
		{
			emailInput.value = "";
			passwordInput.value = "";
		}
	});

	logoutButton.addEventListener("click", async function ()
	{
		token = "";
		systemMessageContainer.innerText = "Sneaked away with no trace left.";
	});

	intelligenceForm.addEventListener("submit", async function (event)
	{
		event.preventDefault();

		if (token === "")
		{
			hackersContainer.innerText = `Infiltrate to the system to fetch hackers.`;
			return;
		}

		const pageNumber = pageNumberInput.value;

		try
		{
			const response = await axios.get(`${api}/users`, {params: {delay: 1, page: pageNumber}});
			const hackers = response.data.data;

			hackersContainer.innerHTML = "";

			for (const hacker of hackers)
			{
				const hackerElement = document.createElement("div");
				hackerElement.classList.add("hacker");
				hackerElement.innerHTML = `<p>${hacker.first_name} ${hacker.last_name}</p><p>${hacker.email}</p><img src="${hacker.avatar}" alt="Portraid Picture">`;
				hackersContainer.appendChild(hackerElement);
			}
		}
		catch (error)
		{
			hackersContainer.innerText = `Failed to fetch hackers. Error: ${error}`;
		}
	});
});

