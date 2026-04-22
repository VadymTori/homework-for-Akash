const initialAccounts = [
	{id: 1, owner: "Alice", balance: 500},
	{id: 2, owner: "Bob", balance: 300}
];

const accounts = initialAccounts.map((account) => ({...account}));

function getAccountById (id)
{
	for (const account of accounts)
	{
		// Fixed bug: use strict equality so string IDs like "1" do not match numeric IDs.
		if (account.id === id)
		{
			return account;
		}
	}
}

function createAccount (newAccountId, newAccountOwner)
{
	// Fixed bug: reject non-integer and non-positive account IDs.
	if (!Number.isInteger(newAccountId) || newAccountId <= 0) 	// Validate ID is a positive integer
	{
		throw new Error("Invalid account ID: ID must be a number over zero."); //If invalid
	}

	// Fixed bug: reject blank owners and non-string values.
	if (typeof newAccountOwner !== "string" || newAccountOwner.trim() === "")	// If validate owner is a non-empty string
	{
		throw new Error("Invalid owner: You forget to type something.");
	}

	// Fixed bug: prevent duplicate account IDs from being created.
	if (getAccountById(newAccountId))
	{
		throw new Error("Account ID already exists.");
	}

	accounts.push(
		{
			id: newAccountId,
			// Fixed bug: trim the owner name before saving it.
			owner: newAccountOwner.trim(),
			// Fixed bug: store balance as a number instead of a string.
			balance: 0
		}
	);
}

function depositMoney (accountId, amount)
{
	const account = getAccountById(accountId);

	if (!account) //!account
	{
		throw new Error("Account not found");
	}

	// Fixed bug: reject strings
	if (!Number.isFinite(amount) || amount <= 0) //isFinite
	{
		throw new Error("Invalid value for deposit amount: The amount must be a positive finite number.");
	}

	account.balance += amount;
}

function withdrawMoney (accountId, amount)
{
	const account = getAccountById(accountId);

	if (!account)
	{
		throw new Error("Account not found.");
	}

	// Fixed bug: reject zero and negative withdrawal amounts.
	if (!Number.isFinite(amount) || amount <= 0)
	{
		throw new Error("Invalid value for withdrawal amount: The amount must be a positive finite number.");
	}

	// Fixed bug: stop withdrawals that are larger than the current balance.
	if (account.balance < amount)
	{
		throw new Error("Insufficient funds: Cannot withdraw more than account balance.")// But I know- you would like to...
	}

	account.balance -= amount;
}

function transferMoney (fromAccountId, toAccountId, amount)
{
	const fromAccount = getAccountById(fromAccountId);
	const toAccount = getAccountById(toAccountId);

	if (!fromAccount)
	{
		throw new Error("Source account not found.");
	}

	if (!toAccount)
	{
		throw new Error("Destination account not found.");
	}

	// Fixed bug: reject zero, negatives, strings, and Infinity for transfers.
	if (!Number.isFinite(amount) || amount <= 0)
	{
		throw new Error("Invalid value for transfer amount: The amount must be a positive finite number.");
	}

	// Fixed bug: prevent transfers when the source account does not have enough money.
	if (fromAccount.balance < amount)
	{
		throw new Error("Insufficient funds: Cannot transfer more than account balance.");
	}

	// Fixed bug: update both accounts during a transfer.
	fromAccount.balance -= amount;
	toAccount.balance += amount;
}

function resetAccounts ()
{
	accounts.length = 0;

	for (const account of initialAccounts)
	{
		accounts.push({...account});
	}
}

if (typeof window !== "undefined")
{
	window.richBank = {
		accounts,
		resetAccounts,
		getAccountById,
		createAccount,
		depositMoney,
		withdrawMoney,
		transferMoney
	};
}

/*
Hints:

getAccountById("1");

createAccount(1, "Alice");
createAccount("3", "Charlie");
createAccount(-3, "Charlie");
createAccount(3, ["Charlie"]);
createAccount(3, "");
createAccount(3, "  ");

depositMoney(1, "300")
depositMoney(1, -300)
depositMoney(1, 0)
depositMoney(1, Infinity)
depositMoney(4, 100)

withdrawMoney(1, -100)
withdrawMoney(1, 0)
withdrawMoney(1, 501)

transferMoney(1, 4, 100)
transferMoney(1, 2, 501);
transferMoney(1, 2, 100);
*/
