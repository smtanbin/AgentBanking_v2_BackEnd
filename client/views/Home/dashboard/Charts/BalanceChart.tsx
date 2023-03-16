import React, { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useAuth } from "../../../../Context/AuthProvider";
import { generateRandomColors } from "../../../../lib/generateRandomColors";

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

  const { token }: any = useAuth();

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
      const response = await axios.get(
        `${process.env.VITE_API_URL}/api/dashboard/charts/balanceChart`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.token}`,
            refrash_key: token.refreshToken,
          },
        }
      );

      if (response.status === 200) {
        const balanceArray: number[] = [];
        const typeArray: string[] = [];

        response.data.forEach(({ BALANCE, TYPE }: { BALANCE: number; TYPE: string }) => {
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
      } else {
        toast.error("Error retrieving balance chart");
        setError(true);
      }
    } catch (err) {
      toast.error("Error retrieving balance chart" + err);
    }
  }, [token]);

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
