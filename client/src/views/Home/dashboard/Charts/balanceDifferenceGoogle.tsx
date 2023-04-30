import React, { useState, useCallback, useEffect } from "react";
import { Placeholder } from 'rsuite';
import { Chart } from "react-google-charts";
import { useAuth } from "../../../../Context/AuthProvider";
import { useTheme } from "../../../../Context/TheamProvider";
import Api from "../../../../app/useApi";




const POLL_INTERVAL_IN_MINUTES = 4;


const BalanceDifference: React.FC = () => {
    const auth: any = useAuth();
    const api = new Api(auth);
    const { theme } = useTheme();
    const legendTextColor = theme === 'light' ? '#000000' : '#ffffff';
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [barChartData, setBarChartData] = useState<any>();

    const getBalanceChartData = useCallback(async () => {
        try {
            const response = await api.useApi("GET", "/dashboard/charts/balanceDifference");

            if (response) {
                setLoading(false)
            }
            const currentBalance: number = response[0].CURRENT_BALANCE;
            const lastDayBalance: number = response[0].LAST_DAY_BALANCE;
            const dataArray: any[] = [['Balance Type', 'Amount', { role: 'style' }]];

            dataArray.push(['Current Balance', currentBalance, '#1463D1']);
            dataArray.push(['Last Day Balance', lastDayBalance, '#7261F0']);
            setError(false);
            setBarChartData(dataArray);
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
            {!error && !loading ? (
                <Chart
                    chartType="BarChart"
                    data={barChartData}
                    options={{
                        backgroundColor: 'transparent',

                        legend: { position: 'none' },
                        chartArea: {
                            backgroundColor: {
                                fillOpacity: 0.1
                            },
                            left: 50,
                            top: 20,
                            width: '90%',
                            height: '50%'
                        },
                        hAxis: {
                            textStyle: { color: legendTextColor }
                        },
                        vAxis: {
                            textStyle: { color: legendTextColor }
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
