const API_URL = "https://67697b74863eaa5ac0dbcaab.mockapi.io/incomecalculator/entries"; 
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const addButton = document.getElementById("add-button");
const resetButton = document.getElementById("reset-button");
const entryList = document.getElementById("entry-list");
const totalIncome = document.getElementById("total-income");
const totalExpense = document.getElementById("total-expense");
const netBalance = document.getElementById("net-balance");

let entries = [];

// Fetch Entries from MockAPI (GET)
async function fetchEntries() {
    try {
        const response = await fetch("https://67697b74863eaa5ac0dbcaab.mockapi.io/incomecalculator/entries");
        entries = await response.json();
        renderEntries();
    } catch (error) {
        console.error("Error fetching entries:", error);
    }
}

// Create Entry in MockAPI (POST)
async function createEntry(description, amount) {
    const type = amount >= 0 ? "income" : "expense";
    const entry = { description, amount: Math.abs(amount), type };

    try {
        const response = await fetch("https://67697b74863eaa5ac0dbcaab.mockapi.io/incomecalculator/entries", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(entry),
        });
        const newEntry = await response.json();
        entries.push(newEntry);
        renderEntries();
    } catch (error) {
        console.error("Error creating entry:", error);
    }
}

// Update Entry in MockAPI (PUT)
async function updateEntry(id, updatedEntry) {
    try {
        const response = await fetch(`${"https://67697b74863eaa5ac0dbcaab.mockapi.io/incomecalculator/entries"}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedEntry),
        });
        const data = await response.json();
        entries = entries.map((entry) => (entry.id === id ? data : entry));
        renderEntries();
    } catch (error) {
        console.error("Error updating entry:", error);
    }
}

// Delete Entry from MockAPI (DELETE)
async function deleteEntry(id) {
    try {
        await fetch(`${"https://67697b74863eaa5ac0dbcaab.mockapi.io/incomecalculator/entries"}/${id}`, { method: "DELETE" });
        entries = entries.filter((entry) => entry.id !== id);
        renderEntries();
    } catch (error) {
        console.error("Error deleting entry:", error);
    }
}

// Render Entries
function renderEntries(filter = "all") {
    entryList.innerHTML = "";
    const filteredEntries =
        filter === "all" ? entries : entries.filter((e) => e.type === filter);

    filteredEntries.forEach((entry) => {
        const entryDiv = document.createElement("div");
        entryDiv.className =
            "flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm";

        entryDiv.innerHTML = `
            <div>
                <p class="font-semibold">${entry.description}</p>
                <p class="${entry.type === "income" ? "text-green-500" : "text-red-500"} font-bold">
                    $${entry.amount}
                </p>
            </div>
            <div class="flex gap-2">
                <button
                    class="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                    onclick="editEntry('${entry.id}')"
                >
                    Edit
                </button>
                <button
                    class="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    onclick="deleteEntry('${entry.id}')"
                >
                    Delete
                </button>
            </div>
        `;
        entryList.appendChild(entryDiv);
    });

    updateSummary();
}

// Update Summary
function updateSummary() {
    const income = entries
        .filter((e) => e.type === "income")
        .reduce((sum, e) => sum + e.amount, 0);
    const expense = entries
        .filter((e) => e.type === "expense")
        .reduce((sum, e) => sum + e.amount, 0);

    totalIncome.textContent = `$${income}`;
    totalExpense.textContent = `$${expense}`;
    netBalance.textContent = `$${income - expense}`;
}

// Add Entry
addButton.addEventListener("click", () => {
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (!description || isNaN(amount)) {
        alert("Please provide a valid description and amount.");
        return;
    }

    createEntry(description, amount);
    descriptionInput.value = "";
    amountInput.value = "";
});

// Reset Input Fields
resetButton.addEventListener("click", () => {
    descriptionInput.value = "";
    amountInput.value = "";
});

// Filter Entries
document.querySelectorAll('input[name="filter"]').forEach((radio) => {
    radio.addEventListener("change", (e) => renderEntries(e.target.value));
});

// Edit Entry
function editEntry(id) {
    const entry = entries.find((e) => e.id === id);
    if (!entry) return;

    descriptionInput.value = entry.description;
    amountInput.value = entry.type === "income" ? entry.amount : -entry.amount;

    deleteEntry(id);
}

// Initialize
fetchEntries();
