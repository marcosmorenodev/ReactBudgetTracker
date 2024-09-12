import React from 'react'
import { FaCircleQuestion } from 'react-icons/fa6';

const InputFields = ({title, setTitle, amount, setAmount, handleTransaction}) => {
  return (
    <div className='flex flex-col items-center p-2 my-3.5 w-full'>
        <form onSubmit={e => e.preventDefault()}>
            <h1 className="text-3xl my-4">NEW TRANSACTION</h1>

            <div className='flex flex-col items-center'>
                <div
                    id="title-tooltip"
                    className='flex items-center justify-center my-3 w-fit hover:cursor-help'
                >
                    <h2 className='text-yellow-600 text-2xl my-3'>TITLE</h2>
                    <FaCircleQuestion className='ml-3' />
                </div>

                <label className='mt-1'>
                    <input
                        className='bg-slate-600 text-orange-400 text-lg rounded-2xl border-2 border-yellow-400 p-1 focus:outline-yellow-500'
                        type='text'
                        maxLength={40}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </label>

                <div
                    id="value-tooltip"  
                    className='flex items-center justify-center my-3 w-fit hover:cursor-help'
                >
                    <h2 className='text-yellow-600 text-2xl my-3'>AMOUNT</h2>
                    <FaCircleQuestion className='ml-3' />
                </div>

                <label className='mt-1'>
                    <input
                        className='bg-slate-600 text-orange-400 text-lg rounded-2xl border-2 border-yellow-400 p-1 focus:outline-yellow-500' 
                        type="number"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        onClick={() => setAmount("")}
                    />
                </label>

            </div>
        </form>

        <button 
            className="text-lg text-yellow-600 border-4 rounded-3xl my-8 p-2.5 border-yellow-400 transition-colors hover:border-yellow-200 hover:text-yellow-500"
            onClick={handleTransaction}
        >
            ADD TRANSACTION
        </button>
    </div>
  )
}

export default InputFields
