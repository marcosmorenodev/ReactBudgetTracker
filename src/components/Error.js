import React from 'react'
import { FaRotate } from 'react-icons/fa6';

const Error = ({error}) => {
    return (
        <div className="flex flex-col flex-1 items-center font-semibold bg-slate-800 text-red-500 h-screen w-full border-b-8 border-red-400">
            <h1 className='mt-4'>Oops! It seems something went wrong!</h1>

            <div className='mt-4'>
                <h2>Error: {error}</h2>
            </div>

            <button
                className='my-4 rounded-3xl text-lg bg-red-400 text-slate-800 p-2 flex items-center gap-2 transition-all shadow-sm shadow-red-400 hover:bg-red-500'
                onClick={() => window.location.reload()}
            >
                Reload Page
                <FaRotate />
            </button>
        </div>
    )
}

export default Error
