document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://67697b74863eaa5ac0dbcaab.mockapi.io/incomecalculator/entries"; 

    const form = document.getElementById("entry-form");
    const description = document.getElementById("description");
    const amount = document.getElementById("amount");
    const type = document.getElementById("type");
    const entriesList = document.getElementById("entries-list");
    const totalIncome = document.getElementById("total-income");
    const totalExpenses = document.getElementById("total-expenses");
    const netBalance = document.getElementById("net-balance");
    const resetButton = document.getElementById("reset-button");

    const filterRadios = document.querySelectorAll('input[name="filter"]');

    // Fetch  entries 
    fetchEntries();

    // Add Entry
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const entry = {
            description: description.value,
            amount: parseFloat(amount.value),
            type: type.value,
        };

        try {
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(entry),
            });
            fetchEntries();
        } catch (error) {
            console.error("Error adding entry:", error);
        }

        form.reset();
    });

    // Filter Entries
    filterRadios.forEach((radio) => {
        radio.addEventListener("change", fetchEntries);
    });

    // Reset Form
    resetButton.addEventListener("click", () => form.reset());

    async function fetchEntries() {
        try {
            const response = await fetch(API_URL);
            const entries = await response.json();

            const filter = document.querySelector('input[name="filter"]:checked').value;
            const filteredEntries = filter === "all" ? entries : entries.filter((e) => e.type === filter);

            displayEntries(filteredEntries);
            updateSummary(entries);
        } catch (error) {
            console.error("Error fetching entries:", error);
        }
    }

    function displayEntries(entries) {
        entriesList.innerHTML = "";
        entries.forEach((entry) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td class="border p-2">${entry.description}</td>
                <td class="border p-2">${entry.amount.toFixed(2)}</td>
                <td class="border p-2">${entry.type}</td>
                <td class="border p-2">
                    <button class="bg-yellow-500 text-white px-2 py-1 rounded edit-btn" data-id="${entry.id}">Edit</button>
                    <button class="bg-red-500 text-white px-2 py-1 rounded delete-btn" data-id="${entry.id}">Delete</button>
                </td>
            `;

            row.querySelector(".edit-btn").addEventListener("click", () => editEntry(entry));
            row.querySelector(".delete-btn").addEventListener("click", () => deleteEntry(entry.id));

            entriesList.appendChild(row);
        });
    }

    async function editEntry(entry) {
        description.value = entry.description;
        amount.value = entry.amount;
        type.value = entry.type;

        await deleteEntry(entry.id); 
    }

    async function deleteEntry(id) {
        try {
            await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            fetchEntries();
        } catch (error) {
            console.error("Error deleting entry:", error);
        }
    }

    function updateSummary(entries) {
        const income = entries.filter((e) => e.type === "income").reduce((sum, e) => sum + e.amount, 0);
        const expenses = entries.filter((e) => e.type === "expense").reduce((sum, e) => sum + e.amount, 0);
        const balance = income - expenses;

        totalIncome.textContent = `${income.toFixed(2)}`;
        totalExpenses.textContent = `${expenses.toFixed(2)}`;
        netBalance.textContent = `${balance.toFixed(2)}`;
    }
});
