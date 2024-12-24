**Fetch Entry function**
The async keyword makes this function asynchronous, allowing you to use the await keyword inside it.
_const response = await fetch("https://67697b74863eaa5ac0dbcaab.mockapi.io/incomecalculator/entries");_
fetch is a built-in JavaScript function used to make HTTP requests.
Here, it is making a GET request to the specified API endpoint (https://67697b74863eaa5ac0dbcaab.mockapi.io/incomecalculator/entries).
The await keyword pauses the execution of the function until the fetch promise resolves. This ensures you have the response before moving forward.
