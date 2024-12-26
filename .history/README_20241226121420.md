README: Income Expense Calculator
Project Title
Income Expense Calculator

Description
The Income Expense Calculator is a web application that allows users to manage their finances by tracking income and expenses. It includes features for adding, editing, and deleting entries, and provides an overview of total income, expenses, and net balance. The app implements CRUD (Create, Read, Update, Delete) operations and persists data using MockAPI.

Features
Add Entries: Users can add income or expense entries with a description, amount, and type.
Edit Entries: Modify existing entries directly from the list.
Delete Entries: Remove entries that are no longer needed.
Filter Data: View all entries, or filter by income or expense using radio buttons.
Summary Display: Shows total income, total expenses, and the calculated net balance.
Responsive Design: The app works seamlessly on both desktop and mobile devices.
Local Storage: Ensures data is persistent across user sessions using MockAPI.
Reset Button: Clears the input fields for a fresh start.
Technologies Used
Frontend:
HTML
TailwindCSS
JavaScript
Backend:
MockAPI for data persistence and CRUD operations.
Getting Started
1. Clone the Repository
bash
Copy code
git clone <repository_url>
cd income-expense-calculator
2. Set Up MockAPI
Go to MockAPI and log in.

Create a new project named "Income Expense Calculator".

Create a resource called entries with the following fields:

id: Auto-generated
description: String
amount: Number
type: String (values: "income" or "expense")
Copy the API endpoint URL for the entries resource (e.g.,     const API_URL = "https://67697b74863eaa5ac0dbcaab.mockapi.io/incomecalculator/entries"; 
).

3. Update API URL
Replace the placeholder URL in script.js with your MockAPI URL:

javascript
Copy code
const API_URL = "https://67697b74863eaa5ac0dbcaab.mockapi.io/incomecalculator/entries";
4. Open the Application
Open index.html in a browser to use the Income Expense Calculator.

Usage
Enter a description, amount, and select whether it is income or an expense.
Click "Add Entry" to save the record.
View all entries in the table and use the Edit or Delete buttons to manage them.
Use the radio buttons to filter entries by type (All, Income, Expense).
Review the financial summary at the top of the page for insights.
File Structure
bash
Copy code
├── index.html      # The main HTML file for the app
├── script.js       # JavaScript file for logic and functionality
├── README.md       # Documentation file
