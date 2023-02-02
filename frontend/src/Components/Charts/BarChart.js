import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: true,

  plugins: {
    legend: {
      position: "top"
    },
    title: {
      display: true,
      text: "Revenue"
    },
    labels: {
      backgroundColor: "white"
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

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Revenue in the first 6 months",
      data: [22, 25, 60, 15, 45, 20, 11],
      borderColor: "rgb(255,255,255)",
      borderWidth: 1,
      backgroundColor: "rgb(255,255,255)"
    }
  ]
};

const BarChar = () => {
  return (
    <Bar
      style={{ backgroundColor: "lightblue" }}
      options={options}
      data={data}
    />
  );
};

export default BarChar;
