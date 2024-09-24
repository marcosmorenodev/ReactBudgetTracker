# Budget Tracker

Project made to showcase my CRUD skills using React.

# Requirements

Requires 2 simultaneously open terminals on your IDE. 
First, run the DB by typing "npx json-server --watch data/historyDB.json --port 8000".
And then, run the app by typing in the other terminal "npm start" (if you're not using the downloaded folder per se, type "cd budget-tracker" in this second terminal first).

# Features & Usage

The project consist of a main component called "Tracker" which nests the rest of the components, but just to name the most relevant ones, these are: the "Chart" and the "History" component.
  - The parent component ("Tracker") is in charge of fetching data from the DB (**READ**) on startup and assigns it to a local state array, calculating the current budget in the process using the "totalBudget" variable; and is in charge of uploading new transactions as well (**CREATE**).
  - The "Chart" component is in charge of tracking any changes in the budget in real-time through a graphic of the two values that make up the "totalBudget" variable (these being "income & "expenses") (**UPDATE**). Pretty self-explanatory. This was possible thanks to Chart-js.
  - The "History" component keeps track of the current transactions and these can be sorted (using a local array, for preventing mutation over the original) by their title, amount or date; as well as searching for a specific transaction based on its name (via the "SearchBar" component), and delete the desired transaction (**DELETE**). Thus, affecting the DB and therefore, the local array and updating the "Chart".
