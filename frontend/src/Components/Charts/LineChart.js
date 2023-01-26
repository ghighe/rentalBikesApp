import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  labels: {
    color: "white"
  },
  plugins: {
    legend: {
      position: "top"
    },
    title: {
      display: true,
      text: "Daily Rentals"
    },
    animation: {
      duration: 4000,
      easing: "easeOutQuart"
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }
};

const labels = ["M", "T", "W", "T", "F", "S", "S"];

export const data = {
  labels,
  datasets: [
    {
      label: "Rentals per weekday",
      data: [5, 2, 1, 4, 3, 7, 8],
      borderColor: "rgb(255,255,255)",
      borderWidth: 1,
      backgroundColor: "rgb(255,255,255)"
    }
  ]
};

const LineChart = () => {
  return (
    <Line
      style={{ backgroundColor: "lightgrey" }}
      options={options}
      data={data}
    />
  );
};

export default LineChart;
