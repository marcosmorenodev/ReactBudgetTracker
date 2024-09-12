import React from 'react'
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

const Chart = ( {income, expenses} ) => {
    const options = {
        title: {
            display: true,
            text: "Total Budget"
        }
    };

    const data = {
        labels: ["Total Income"],
        datasets: [
            {
                label: "Income",
                data: [income] || 0,
                backgroundColor: ["rgb(37 99 235)"],
                borderWidth: 3,
                borderColor: ["rgb(14 165 233)"],
            },
            
            {
                label: "Expenses",
                data: [expenses] || 0,
                backgroundColor: [" rgb(167 139 250)"],
                borderWidth: 3,
                borderColor: ["rgb(109 40 217)"]
            }
        ]
    };

    return (
        <div className='bg-slate-400 p-3.5 rounded-3xl'>
            <Bar options={options} data={data} />
        </div>
    )
}

export default Chart