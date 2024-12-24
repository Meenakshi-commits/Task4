### Fetch Entry Function
The async keyword makes this function asynchronous, allowing you to use the await keyword inside it.
> `const response = await fetch("https://67697b74863eaa5ac0dbcaab.mockapi.io/incomecalculator/entries");`
fetch is a built-in JavaScript function used to make HTTP requests.
Here, it is making a GET request to the specified API endpoint (https://67697b74863eaa5ac0dbcaab.mockapi.io/incomecalculator/entries).
The await keyword pauses the execution of the function until the fetch promise resolves. This ensures you have the response before moving forward.
> _entries = await response.json();_
The response.json() method processes the response and converts it into a JavaScript object or array (if the response is in JSON format).
It processes the fetched data using renderEntries.
If anything goes wrong, the error is caught and logged.

### Create Entry Function
async: Marks this function as asynchronous, allowing the use of await for handling asynchronous operations.
description, amount: These are parameters passed to the function, representing the description and amount of the new entry.
An object named entry is created with three properties:
       description: The description of the entry (passed as an argument).
       amount: The absolute value of the amount (to ensure it's always positive).
       type: Either "income" or "expense" as determined earlier.
1.fetch:
    Makes an HTTP request to the API endpoint:_ "https://67697b74863eaa5ac0dbcaab.mockapi.io/incomecalculator/entries"._
2.method:>  _"POST"_:
    Specifies that the HTTP method is POST, meaning the request will create a new resource on the server.
3.headers:
    Includes metadata about the request:
4."Content-Type": 
  > _"application/json"_: Indicates the data being sent is in JSON format.
5.body:
    The entry object is converted into a JSON string using JSON.stringify and sent as the request payload.
6.await:
     Pauses the function until the server responds to the request, storing the response in the response variable.
The >  _response.json()_ method extracts and parses the JSON data from the server's response.
> entries.push(newEntry);
Adds the newEntry (created entry) to the entries array.
Calls the _renderEntries()_ function to update the UI and display the newly added entry.

### Update Entry Function
> async function updateEntry(id, updatedEntry) {
_async:_ Declares this function as asynchronous, allowing the use of await for handling asynchronous operations.
_id:_ The unique identifier of the entry to be updated.
_updatedEntry:_ An object containing the updated data for the entry.
> const response = await fetch(`${"https://67697b74863eaa5ac0dbcaab.mockapi.io/incomecalculator/entries"}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedEntry),
});
1.fetch
   Sends an HTTP request to update the entry with the given id.
2.Dynamic URL
  > `${"https://67697b74863eaa5ac0dbcaab.mockapi.io/incomecalculator/entries"}/${id}`
Uses template literals to dynamically insert the id into the URL.
This creates a URL like _https://67697b74863eaa5ac0dbcaab.mockapi.io/incomecalculator/entries/1_
3.method:"PUT"
    Specifies the HTTP method as PUT, which is used to update an existing resource on the server.
4.headers: { "Content-Type": "application/json" },
    Indicates the request body is in JSON format.
5.body: JSON.stringify(updatedEntry),
     Converts the updatedEntry object into a JSON string for sending in the request body.
> const data = await response.json();
    response.json() extracts the JSON data and parses it into a JavaScript object.
> entries = entries.map((entry) => (entry.id === id ? data : entry));
     entries.map:
  Iterates through the entries array to update the relevant entry.
  If the entry.id matches the id of the updated entry:
  Replace the old entry with the updated entry (data).
  Otherwise, keep the existing entry unchanged.








