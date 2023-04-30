import React, { useState, useCallback, useEffect, Dispatch, SetStateAction } from "react";
import { Chart } from "react-google-charts";
import { useAuth } from "../../../../Context/AuthProvider";
import { generateRandomHexColors } from "../../../../lib/generateRandomColors";
import Api from "../../../../app/useApi";
import { useTheme } from "../../../../Context/TheamProvider";


interface BalanceChartProps {
  setTotalBalance: Dispatch<SetStateAction<number>>;
}

const POLL_INTERVAL_IN_MINUTES = 4;


const BalanceChart: React.FC<BalanceChartProps> = ({ setTotalBalance }) => {
  const auth: any = useAuth();
  const api = new Api(auth);
  const { theme } = useTheme();
  const legendTextColor = theme === 'light' ? '#000000' : '#ffffff';
  const [color, setColor] = useState<[string]>();
  const [error, setError] = useState<boolean>(false);
  const [pieChartData, setPieChartData] = useState<any>();

  const getBalanceChartData = useCallback(async () => {
    try {
      const response = await api.useApi("GET", "/dashboard/charts/balanceChart");
      const dataArray: any[] = [];
      let balance: number = 0
      response.forEach(({ BALANCE, TYPE }: { BALANCE: number; TYPE: string }) => {
        balance += BALANCE
        dataArray.push([TYPE, BALANCE])
      });
      const _colors: any = generateRandomHexColors(dataArray.length + 1)
      setTotalBalance(balance)
      setColor(_colors)
      setError(false);

      dataArray.unshift(['Type', 'Balance']);
      setPieChartData(dataArray);
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
        <Chart
          chartType="PieChart"
          data={pieChartData}
          options={{
            backgroundColor: 'transparent',
            colors: color,

            legend: { textStyle: { color: legendTextColor } },
            chartArea: {
              backgroundColor: {
                fill: '#FF0000',
                fillOpacity: 0.1
              },
              left: 0,
              top: 0,
              width: '100%',
              height: '100%'
            },
          }}
        />
      ) : (
        <p>Error loading data</p>
      )}
    </section>
  );
};

export default BalanceChart;
