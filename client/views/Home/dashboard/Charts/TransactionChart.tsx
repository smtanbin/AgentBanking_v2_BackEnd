import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import useChartData from "./TransactionChart/ChartData";
import { Placeholder } from "rsuite";

const options: any = {
  responsive: true,
  maintainAspectRatio: true,
  animations: {
    tension: {
      duration: 2000,
      easing: "linear",
      from: 0.3,
      to: 0,
      loop: true,
    },
  },
  scales: {
    x: [
      {
        title: {
          display: true,
          text: 'Time',
        },
      },
    ],
    y: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  }

};

const LineChart: React.FC = () => {
  try {
    const { currentCr, currentDr, pastCr, pastDr } = useChartData();
    return (
      <div>
        {currentCr && currentDr && pastCr && pastDr ? (
          <Line
            data={{
              labels: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
              datasets: [
                {
                  label: "Credit",
                  data: currentCr,
                  fill: false,
                  borderColor: "#C62828",
                },
                {
                  label: "Debit",
                  data: currentDr,
                  fill: false,
                  borderColor: "#2E7D32",
                },
                {
                  label: "Previous Credit",
                  data: pastCr,
                  fill: false,
                  borderColor: "#EF9A9A",
                },
                {
                  label: "Previous Debit",
                  data: pastDr,
                  fill: false,

                  borderColor: "#A5D6A7",
                },
              ],
            }}
            options={options}
          />
        ) : (
          "Loading..."
        )}
      </div>
    );
  } catch (error) {
    console.log("LineChart Error: ", error)
    return (<Placeholder.Paragraph />)
  }
};

export default LineChart;
