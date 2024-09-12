import React from 'react'

const BudgetDisplay = ({income, expenses, totalBudget}) => {
  return (
    <>
      <div className='flex justify-center w-full'>
            <div className='p-5 mt-8 border-4 border-solid border-slate-600 rounded-lg w-1/4'>
                <div className="flex justify-between items-center gap-10">
                    <div className='flex flex-col gap-2'>
                        <h1 className=' text-yellow-400 text-xl cursor-default'>INCOME</h1>
                        <p 
                            id = "income-el"
                            className='text-lg text-green-400 cursor-default'
                        >
                            {income ? income : 0} 
                        </p>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-yellow-400 text-xl cursor-default'>EXPENSES</h1>
                        <p 
                            id = "expenses-el"
                            className='text-lg text-red-400 cursor-default'
                        >
                            {expenses ? expenses : 0} 
                        </p>
                    </div>
                </div>

                <div className='flex flex-col gap-2 bg-inherit mt-6'>
                    <h1 className='text-yellow-400 text-xl cursor-default'>TOTAL BUDGET</h1>
                    <p 
                        id="budget-el"
                        className='text-blue-300 text-lg cursor-default'
                    >
                    
                        {totalBudget ? totalBudget : 0}
                    </p>
                </div>
            </div>
        </div>
    </>
  )
}

export default BudgetDisplay
