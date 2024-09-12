Run requirement: Requires 2 simultaneously open terminals on your IDE. 
First, run the DB by typing "npx json-server --watch data/historyDB.json --port 8000".
And then run the app by typing in the other terminal "npm start" (if you're not using the downloaded folder per se, type "cd budget-tracker" in this second terminal).

-The project consist of a main component called "Tracker" which nests 2 other important components: the "Chart" and the "History".
-The "Tracker" is in charge of fetching data from a DB on startup and assigns it to a local state array, calculate the current budget using the "totalBudget" variable and uploading new transactions.
This array is used to whenever it's updated in some form (this being, adding a new transaction or deleting one) and drills the local "transactions" array down to the "History", and drills the "income" & "expenses" variables down to the "Chart".
-The "Chart" is in charge of making a live graphic of the two values that make up the "totalBudget" variable (these being "income" & "expenses). Pretty self-explanatory. This was possible thanks to Chart-js.
-The "History" keeps track of the current transactions and these can be sorted (with a local array, for preventing mutation over the original one) by their title, amount or date, as well as searching for a specific transaction based on its name (via the "SearchBar" component), and delete the desired transaction (affecting the DB and therefore the local array).
