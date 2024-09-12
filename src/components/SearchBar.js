import React, { useEffect, useState } from 'react'

const SearchBar = ({query, setQuery}) => {
    return (
        <form onSubmit={e => e.preventDefault()}>
            <label>
                <input
                    className='text-blue-200 text-xl bg-slate-600 p-2 rounded-3xl my-4 w-3/4 shadow-lg' 
                    type='text'
                    maxLength={40}
                    value={query}
                    onClick={() => setQuery("")}
                    onChange={e => setQuery(e.target.value)}
                    placeholder='Search By Title...'
                />
            </label>
        </form>
    )
}

export default SearchBar