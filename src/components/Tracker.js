import React, { useEffect, useState, useReducer} from 'react'
import History from './History';
import axios from 'axios';
import { format } from "date-fns";
import Error from './Error';
import Chart from './Chart';
import Loading from './Loading';
import fetchReducer, {initialState} from "../reducers/fetchReducer";
import { actionType } from '../reducers/actionTypes';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import BudgetDisplay from './BudgetDisplay';
import InputFields from './InputFields';

const Tracker = () => {
    //Tooltips:
    
    tippy("#title-tooltip", {
        content: "Max. length is 40 characters."
    });
        
    tippy("#value-tooltip", {
        content: `Values greater than 0 will be "income". Values lesser than 0 will be "expenses".`
    });

    //===============================//

    const [fetchState, dispatch] = useReducer(fetchReducer, initialState);
    const [transactions, setTransactions] = useState([]);

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState(0);
    const [hidden, setHidden] = useState(true);

    let [income, setIncome] = useState(0);
    let [expenses, setExpenses] = useState(0);
    let [totalBudget, setTotalBudget] = useState(0);
    
    function calculateBudget() {
        if (transactions) {
            let totalIncome = 0;
            let totalExpenses = 0;
    
            transactions.forEach(item => item.amount > 0 ? (totalIncome += item.amount) : (totalExpenses += item.amount));
            
            let budget = totalIncome + totalExpenses;
            
            setIncome(totalIncome);
            setExpenses(totalExpenses);
            setTotalBudget(budget);
        }

        else { return; }
    }
    
    async function handleTransaction() {
        try {
            dispatch({type: actionType.fetchStart});

            const date = new Date(Date.now());
            
            //* json-server will automatically assign the ID. While this works perfectly for a lightweight DB like this, however it may not be as performant with larger DBs and/or more complex queries.

            const newTransaction = {
                title: title ? title : "Generic transaction",
                amount: Number(amount) ? Number(amount) : 1,
                date: format(date, "dd/MM/yyyy"),
                id: undefined
            };
    
            uploadTransaction(newTransaction);
            setTitle("");
            setAmount(0);

            dispatch({type: actionType.fetchSuccess});
        }

        catch(err) { 
            console.log(err.message);

            const error = "Transaction couldn't be created! Try again!";
            dispatch({type: actionType.fetchFailed, payload: error});
        }

        finally { dispatch({type: actionType.fetchEnd}); }
    }

    async function uploadTransaction(newTransaction) {
        try {
            dispatch({type: actionType.fetchStart});
            
            const res = await axios.post("http://localhost:8000/transactions", newTransaction);
            const updatedDB = await res.data;

            setTransactions([...transactions, updatedDB]);

            dispatch({type: actionType.fetchSuccess});
        }
        
        catch(err) { 
            const error = "Transaction couldn't be uploaded! Try again!";
            dispatch({type: actionType.fetchFailed, payload: error});

            console.log(err.message);
        }

        finally { dispatch({type: actionType.fetchEnd}); }
    }

    async function fetchData() {
        try {
            dispatch({type: actionType.fetchStart});

            const res = await axios.get("http://localhost:8000/transactions");

            if (res.status === 200 || res.status === 304) { 
                const fetchedData = await res.data;

                setTransactions(fetchedData);
                dispatch({type: actionType.fetchSuccess});
            } 
        }
        
        catch(err) { dispatch({type: actionType.fetchError, payload: err.message}); }

        finally { dispatch({type: actionType.fetchEnd}); }
    }

    useEffect(() => { calculateBudget(); }, [transactions]); //Calculates on start-up and whenever the DB is updated

    useEffect(() => { fetchData(); }, []); //Fetches and sets data on start-up

    return (
        <main className='bg-slate-800 text-yellow-400 h-full w-full flex flex-col items-center'>
            { fetchState.isLoading ? (<Loading />) : null}

            { fetchState.error ? (<Error error={fetchState.error} />) : null }

            {
                transactions ?
                <>
                    <BudgetDisplay 
                        income={income}
                        expenses={expenses}
                        totalBudget={totalBudget}
                    />

                    <InputFields 
                        title={title}
                        setTitle={setTitle}
                        amount={amount}
                        setAmount={setAmount}
                        handleTransaction={handleTransaction}
                    />
        
                    <Chart 
                        income={income}
                        expenses={expenses}
                    />
        
                    {
                        !hidden ? //"hidden" is true by default
                        <div className='mt-9'>
                            <button
                                className='text-lg bg-inherit text-yellow-600 border-4 rounded-3xl mb-3 p-2.5 border-yellow-600 transition-colors hover:border-yellow-500 hover:text-yellow-600' 
                                onClick={() => setHidden(curr => !curr)}>
                                HIDE HISTORY
                            </button>
                        </div>
        
                        :
        
                        <div className='mt-9'>
                            <button
                                className='text-lg bg-inherit text-yellow-600 border-4 rounded-3xl mb-3 p-2.5 border-yellow-600 transition-colors hover:border-yellow-500 hover:text-yellow-600' 
                                onClick={() => setHidden(curr => !curr)}>
                                SHOW HISTORY
                            </button>
                        </div>
                    }
                    
                    {
                        !hidden ? //"hidden" is true by default
                        (<History
                            transactions={transactions}
                            setTransactions={setTransactions}
                        />)
        
                        :
        
                        null
                    }
                </> 
                
                :

                <Error error={"Transactions couldn't be fetched! Try again!"} />
            }
        </main>
    )
}

export default Tracker
