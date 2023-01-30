import React from "react";
import "./Dashboard.css";
import { MdDashboard } from "react-icons/md";
import { MdNotificationsActive } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import DashboardCards from "../Components/DashboardCard/DashboardCards";
import LineChart from "../Components/Charts/LineChart";
import BarChar from "../Components/Charts/BarChart";

const Dashboard = () => {
  const cardStyle =
    "mt-20 max-w-[33%] gap-5 pb-20 px-2 py-2 shadow-lg bg-white rounded-lg";

  return (
    <>
      <div className="flex flex-col md:flex-row md:gap-6 justify-between">
        <div className="font-light text-2xl">Dashboard</div>
        <div className="flex cursor-pointer px-1 py-1">
          <input
            type="text"
            placeholder="Search..."
            className="text-lg bg-transparent focus:outline-none border-b-2 border-gray-300 focus:border-dark-red"
          />
          <MdDashboard className="mx-2 mt-1 px-1 py-1 text-gray-700 " />
          <MdNotificationsActive className="mx-2 mt-1 px-1 py-1 text-gray-700" />
          <FaUser className="mx-2 mt-1 px-1 py-1 text-gray-700" />
        </div>
      </div>
      <div className="flex mt-20 justify-center">
        <DashboardCards />
      </div>
      <div className="flex justify-center gap-5">
        <div className={cardStyle}>
          <LineChart color={"lightgreen"} />
        </div>
        <div className={cardStyle}>
          <BarChar />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
