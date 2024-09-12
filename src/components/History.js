import React, { useEffect, useReducer, useState } from 'react'
import {FaArrowDown91, FaArrowDownZA, FaTrash} from "react-icons/fa6";
import SearchBar from './SearchBar';
import Error from './Error';
import axios from 'axios';
import fetchReducer, { initialState } from '../reducers/fetchReducer';
import { actionType } from '../reducers/actionTypes';

const History = ({transactions, setTransactions}) => {
    const [fetchState, dispatch] = useReducer(fetchReducer, initialState);

    const [order, setOrder] = useState("DESC");
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    function sortByTitle(arr) { 
        if (order === "DESC") {
            const sortedArr = arr.sort((a, b) => (a.title).localeCompare(b.title)); //"localeCompare" method ensures proper multiple language support!
            setSearchResults(sortedArr);

            setOrder("ASC");
        }

        else {
            const sortedArr = arr.sort((a, b) => (b.title).localeCompare(a.title));
            setSearchResults(sortedArr);

            setOrder("DESC");
        }
    }

    function sortByValue(arr) { 
        if (order === "DESC") {
            const sortedArr = arr.sort((a, b) => b.amount - a.amount);
            setSearchResults(sortedArr);

            setOrder("ASC");
        }

        else {
            const sortedArr = arr.sort((a, b) => a.amount - b.amount);
            setSearchResults(sortedArr);

            setOrder("DESC");
        }
    }

    function sortByDate(arr) {
        if (order === "DESC") {
            const sortedArr = arr.sort((a, b) => new Date(a.date) - new Date(b.date));
            setSearchResults(sortedArr);

            setOrder("ASC");
        }

        else {
            const sortedArr = arr.sort((a, b) => new Date(b.date) - new Date(a.date));
            setSearchResults(sortedArr);

            setOrder("DESC");
        }
    }

    async function deleteTransaction(id) {
        //* I chose a "pessimistic" approach because I value much more data consistency than snappy UI changes at the cost of a hypothetically de-sync in UI and DB (which may rarely happen following an "optimistic" approach).

        try {
            dispatch({type: actionType.fetchStart});

            const res = await axios.delete(`http://localhost:8000/transactions/${id}`);
            await res.data;
            
            const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
            
            setTransactions(updatedTransactions);
            setSearchResults(transactions);

            dispatch({type: actionType.fetchSuccess});
        }

        catch(err) { 
            const error = "Transaction couldn't be deleted! Try again!";
            console.log(err.message);

            dispatch({type: actionType.fetchError, payload: error});
        }

        finally { dispatch({type: actionType.fetchEnd}); }
    }

    useEffect(() => {
        setSearchResults(transactions); 
    }, [transactions]); //* Whenever the DB is updated (either by uploading or deleting a transaction), the "searchResults" will update accordingly

    useEffect(() => {
        if (query) {
            const results = transactions.filter(transaction => (transaction.title).toLowerCase().includes(query.toLowerCase()));

            setSearchResults(results);
        }
        
        else { setSearchResults(transactions); }
    }, [query]); //* Sets the "searchResults" on mount and whenever the "query" changes via "SearchBar" component

    return (
        <div className='flex justify-center w-full'>
            { fetchState.isLoading ? (<h1 className='text-xl text-blue-400'>Deleting transaction...</h1>) : null }

            { fetchState.error ? <Error error={fetchState.error} /> : null }

            {
                transactions.length ? 
                (<div className='bg-slate-700 p-4 rounded-3xl my-5 w-fit'>
                    <div className='my-1.5'>
                        <SearchBar 
                            transactions={transactions}
                            setSearchResults={setSearchResults}
                            query={query}
                            setQuery={setQuery}
                        />
                    </div>

                    <table className="w-full rounded-lg shadow-md overflow-hidden">
                        <thead>
                            <tr className="text-left text-md font-semibold bg-slate-600 uppercase tracking-wider">
                                <th scope="col"
                                    className="px-6 py-4 cursor-pointer"
                                >
                                    <button 
                                        className='text-yellow-400 flex items-center'
                                        onClick={() => sortByTitle([...searchResults])} //* Since the "sort" method mutates the original array, we should make a copy of it before using said method
                                    >
                                        TITLE
                                        <FaArrowDownZA />
                                    </button>
                                </th>
                                
                                <th
                                    scope="col"
                                    className="px-6 py-4 cursor-pointer"
                                >
                                    <button 
                                        className='text-yellow-400 flex items-center'
                                        onClick={() => sortByValue([...searchResults])}
                                    >
                                        VALUE
                                        <FaArrowDown91 />
                                    </button>
                                </th>
                                
                                <th scope="col" 
                                    className="px-6 py-4 cursor-pointer"
                                >
                                    <button 
                                        className='text-yellow-400 flex items-center'
                                        onClick={() => sortByDate([...searchResults])}
                                    >
                                        DATE
                                        <FaArrowDown91 />
                                    </button>
                                </th>
                                
                                <th 
                                    scope="col"
                                    className="px-6 py-4 cursor-pointer"
                                >
                                    —
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                                {
                                    searchResults.map(transaction => 
                                        (
                                        <tr 
                                            className='even:bg-slate-600 even:text-blue-400 p-3 text-lg tracking-wide'
                                            key={transaction.id}
                                        >
                                            <td className="px-6 py-4"> {transaction.title} </td>
                                            
                                            <td className="px-6 py-4"> {transaction.amount} </td>

                                            <td className="px-6 py-4"> {transaction.date} </td>

                                            <td className="px-6 py-4">
                                                <button onClick={() => deleteTransaction(transaction.id)}>
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                        )
                                    )
                                }
                        </tbody>
                    </table>
                </div>
                )

                :
                                
                (<h1 className='text-yellow-400 text-xl text-center my-3'>Nothing to see here yet!</h1>)
            }
        </div>
    )
}

export default History
