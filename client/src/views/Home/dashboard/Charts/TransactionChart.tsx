<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import useChartData from "./TransactionChart/ChartData";
import { Line } from 'react-chartjs-2';

import { CategoryScale, Chart, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)


const TransactionChart = () => {
    const currentHour = new Date().getHours(); // Get the current hour
    const labels = Array.from({ length: currentHour - 8 }, (_, i) => {
        const hour = i + 9;
        if (hour < 12) {
            return hour.toString() + " AM";
        } else if (hour === 12) {
            return "12 PM";
        } else if (hour < 19) {
            return (hour - 12).toString() + " PM";
        }
    }).filter(label => label !== undefined);

    const [data, setData] = useState<any>([]);
    const [error, setError] = useState<boolean>(false)
    const { currentCr, currentDr, pastCr, pastDr } = useChartData()

    useEffect(() => {
        if (currentCr && currentDr && pastCr && pastDr) {
            const arr = labels.map((_, index) => ({ "labels": labels[index], "currentCr": currentCr[index], "pastCr": pastCr[index], "currentDr": currentDr[index], "pastDr": pastDr[index] })
            )
            console.log(arr)
            setData(arr)
            setError(false)
        } else {
            setError(true)
        }
    }, [currentCr, currentDr, pastCr, pastDr]) // add pastCr and pastDr to dependency array

    return (
        <div>
            {labels.length ? (
                <Line data={{

                    labels: data.map((d: any) => d.labels),
                    datasets: [
                        {
                            label: "Current Credit",
                            data: data.map((d: any) => d.currentCr),
                            borderColor: '#006DFF',
                            fill: false,
                        },
                        {
                            label: "Past Credit",
                            data: data.map((d: any) => d.pastCr),
                            borderColor: '#68BBE3',
                            fill: false,
                        },
                        {
                            label: "Current Debit",
                            data: data.map((d: any) => d.currentDr),
                            borderColor: '#D10000',
                            fill: false,
                        },
                        {
                            label: "Past Debit",
                            data: data.map((d: any) => d.pastDr),
                            borderColor: '#FF5C5C',
                            fill: false,
                        },
                    ],
                }} />
            ) : (
                <p>Loading...</p>
            )}
        </div >
    );
};

export default TransactionChart;
=======
import React, { useEffect, useState } from "react";
import useChartData from "./TransactionChart/ChartData";
import { Line } from 'react-chartjs-2';

import { CategoryScale, Chart, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)


const TransactionChart = () => {
    const currentHour = new Date().getHours(); // Get the current hour
    const labels = Array.from({ length: currentHour - 8 }, (_, i) => {
        const hour = i + 9;
        if (hour < 12) {
            return hour.toString() + " AM";
        } else if (hour === 12) {
            return "12 PM";
        } else if (hour < 19) {
            return (hour - 12).toString() + " PM";
        }
    }).filter(label => label !== undefined);

    const [data, setData] = useState<any>([]);
    const [error, setError] = useState<boolean>(false)
    const { currentCr, currentDr, pastCr, pastDr } = useChartData()

    useEffect(() => {
        if (currentCr && currentDr && pastCr && pastDr) {
            const arr = labels.map((_, index) => ({ "labels": labels[index], "currentCr": currentCr[index], "pastCr": pastCr[index], "currentDr": currentDr[index], "pastDr": pastDr[index] })
            )
            console.log(arr)
            setData(arr)
            setError(false)
        } else {
            setError(true)
        }
    }, [currentCr, currentDr, pastCr, pastDr]) // add pastCr and pastDr to dependency array

    return (
        <div>
            {labels.length ? (
                <Line data={{

                    labels: data.map((d: any) => d.labels),
                    datasets: [
                        {
                            label: "Current Credit",
                            data: data.map((d: any) => d.currentCr),
                            borderColor: '#006DFF',
                            fill: false,
                        },
                        {
                            label: "Past Credit",
                            data: data.map((d: any) => d.pastCr),
                            borderColor: '#68BBE3',
                            fill: false,
                        },
                        {
                            label: "Current Debit",
                            data: data.map((d: any) => d.currentDr),
                            borderColor: '#D10000',
                            fill: false,
                        },
                        {
                            label: "Past Debit",
                            data: data.map((d: any) => d.pastDr),
                            borderColor: '#FF5C5C',
                            fill: false,
                        },
                    ],
                }} />
            ) : (
                <p>Loading...</p>
            )}
        </div >
    );
};

export default TransactionChart;
>>>>>>> 1f6de8d40a045e02159cbb47d8c4198fffa9cd84
