import React, { useState, useCallback, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useAuth } from "../../../../Context/AuthProvider";
import { generateRandomColors } from "../../../../lib/generateRandomColors";
import Api from "../../../../app/useApi";

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    fill: boolean;
  }[];
}

const options: any = {
  responsive: true,
  legend: {
    position: "top",
  },
  plugins: {
    labels: {
      render: "value",
    },
  },
  title: {
    display: true,
    text: "Chart.js Doughnut Chart",
  },
  animation: {
    animateScale: true,
    animateRotate: true,
  },
};

const BalanceChart: React.FC = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const auth: any = useAuth();
  const api = new Api(auth);

  const [error, setError] = useState<boolean>(false);
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: "Balance",
        data: [] as number[],
        backgroundColor: [] as string[],
        fill: true,
      },
    ],
  });


  const getBalanceChartData = useCallback(async () => {

    try {
      const response = await api.useApi('GET', '/dashboard/charts/balanceChart')

      const balanceArray: number[] = [];
      const typeArray: string[] = [];

      response.forEach(({ BALANCE, TYPE }: { BALANCE: number; TYPE: string }) => {
        balanceArray.push(BALANCE);
        typeArray.push(TYPE);
      });
      setError(false);
      setChartData({
        labels: typeArray,
        datasets: [
          {
            label: "Balance",
            data: balanceArray,
            backgroundColor: generateRandomColors(balanceArray.length),
            fill: true,
          },
        ],
      });
    } catch (err) {
      setError(true);
      // toast.error("Error retrieving balance chart" + err);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getBalanceChartData();
    }, 13 * 60 * 1000); // 4 minutes

    return () => clearInterval(interval);
  }, [getBalanceChartData]);

  useEffect(() => {
    getBalanceChartData();
  }, [getBalanceChartData]);

  return (
    <>
      {!error ? (
        <Pie data={chartData} options={options} redraw={true} />
      ) : (
        <p>Error loading data</p>
      )}
    </>
  );
};

export default BalanceChart;
