import React, { useState, useCallback, useEffect } from "react";
import { Placeholder } from 'rsuite';
import { Bar, Line } from 'react-chartjs-2';
import { useAuth } from "../../../../Context/AuthProvider";
import { useTheme } from "../../../../Context/TheamProvider";
import Api from "../../../../app/useApi";


// import { CategoryScale, Chart, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
// Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)



import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const POLL_INTERVAL_IN_MINUTES = 4;

const BalanceDifference: React.FC = () => {
    const auth: any = useAuth();
    const api = new Api(auth);
    const { theme } = useTheme();
    const legendTextColor = theme === 'light' ? '#000000' : '#ffffff';
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [barChartData, setBarChartData] = useState<any>({
        labels: ['Today', 'Previous'],
        datasets: [
            {

                data: [0, 0],
                backgroundColor: ['#006DFF', '#68BBE3']
            }
        ]
    });

    const getBalanceChartData = useCallback(async () => {
        try {
            const response = await api.useApi("GET", "/dashboard/charts/balanceDifference");

            if (response) {
                setLoading(false)
            }
            const currentBalance: number = response[0].CURRENT_BALANCE;
            const lastDayBalance: number = response[0].LAST_DAY_BALANCE;
            const dataArray: any[] = [currentBalance, lastDayBalance];
            setError(false);
            setBarChartData((prevState: { datasets: any[]; }) => ({
                ...prevState,
                datasets: [
                    {
                        ...prevState.datasets[0],
                        data: dataArray
                    }
                ]
            }));
        } catch (err) {
            console.error("Error retrieving balance chart", err);
            setError(true);
        }
    }, [api]);

    useEffect(() => {
        const interval = setInterval(() => {
            getBalanceChartData();
        }, POLL_INTERVAL_IN_MINUTES * 60 * 1000);
        getBalanceChartData();
        return () => clearInterval(interval);
    }, [auth.token]);

    return (
        <section>
            {!error ? (
                <Bar

                    data={barChartData}
                    options={{

                        plugins: {
                            legend: {
                                display: false
                            }

                        },
                        scales: {
                            x: {

                                ticks: {
                                    display: false,
                                    color: legendTextColor
                                }
                            },
                            y: {

                                ticks: {
                                    display: false,
                                    color: legendTextColor
                                }
                            }
                        }
                    }}
                />
            ) : error ? <p>Error loading data</p>
                : <Placeholder.Paragraph rows={4} active />
            }
        </section>
    );
};

export default BalanceDifference;
