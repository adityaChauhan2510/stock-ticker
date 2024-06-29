import { useSelector } from "react-redux"
import useSocket from "../hooks/useSocket"
import { Line } from "react-chartjs-2";
import 'chart.js/auto';
import { StockItemData } from "../types/StockItemData";
import { useMemo } from "react";

const StockDashboard = () => {
    const { loading } = useSocket('ws://localhost:8080');
    const data = useSelector((state: any) => state.data.data || []);
  

    if (loading) {
        return <div className="p-5 pt-8 pb-8 dark:bg-[#121212] bg-[#ffff] w-full dark:text-white h-auto min-h-screen">
            <h1 className="text-4xl text-center mb-20">Stock Ticker</h1>
            <Skeleton />
        </div>
    }

    return (
        <div className="p-5 pt-8 pb-8 dark:bg-[#121212] bg-[#ffff] w-full dark:text-white h-auto min-h-screen">
            <h1 className="text-4xl text-center mb-20">Stock Ticker</h1>
            <div className="max-w-2xl mx-auto ">
                {data.length > 0 && data.map((stock: any) => {
                    const key = Object.keys(stock)[0]
                    const latestData: StockItemData = stock[key][0]
                    const currentPrice = parseFloat(latestData?.close?.toString()).toFixed(2)
                    const chartData: { labels: string[], datasets: { labels: [], data: any, borderColor: string, tension: number }[] } = {
                        labels: [],
                        datasets: [
                            {
                                labels: [],
                                data: [],
                                borderColor: 'rgb(75, 192, 192)',
                                tension: 0.1
                            }
                        ]
                    }
                    stock[key]?.forEach((value: any) => {
                        chartData?.labels.push(value?.datetime)
                        chartData?.datasets[0].data.push(parseFloat(value?.close))
                    })

                    return <div key={key} className="mx-auto grid grid-cols-3 md:grid-cols-3 font-semibold text-lg items-center justify-between px-8 py-2 rounded-md mt-5 shadow-xl dark:shadow-lg bg-[#ffff] dark:bg-[#1E1E1E] min-h-[5rem]">
                        <h3>{key}</h3>
                        <span>${currentPrice}</span>
                        <StockChart key={key} data={chartData} />
                    </div>
                })}
            </div>
        </div>
    );


}

const Skeleton = () => {
    return (
        <div className="max-w-2xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((index) => (
                <div key={index} className="mx-auto grid grid-cols-3 md:grid-cols-3 font-semibold text-lg items-center justify-between px-8 py-2 rounded-md mt-5 shadow-xl dark:shadow-lg bg-[#ffff] dark:bg-[#1E1E1E] min-h-[5rem] animate-pulse">
                    <h3>Stock</h3>
                    <span>$0.00</span>
                    <div className="max-w-[8rem]">
                        <Line data={{ labels: [], datasets: [] }} options={{}} />
                    </div>
                </div>
            ))}
        </div>
    );
}


const StockChart = ({ data }: any) => {
    if (!data || !data.labels || data.labels.length === 0 || !data.datasets || data.datasets.length === 0) {
        return <p>Loading chart...</p>;
    }
    const memoizedData = useMemo(() => data, [data]);


    const options = useMemo(() => ({
        elements: {
            point: {
                radius: 0
            }
        },
        scales: {
            x: {
                ticks: { display: false },
                grid: { display: false },
                grace: '10%',
            },
            y: {
                ticks: { display: false },
                grid: { display: false },
                grace: '10%',
            }
        },
        tooltip: {
            mode: 'index',
            intersect: false,
            enabled: false
        },
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false } // Disabling tooltips for Chart.js 2.x, ensure this is updated if using Chart.js 3.x
        },
        maintainAspectRatio: true
    }), []);

    return <div className="max-w-[8rem]"> <Line data={memoizedData} options={options} /></div>
};


export default StockDashboard