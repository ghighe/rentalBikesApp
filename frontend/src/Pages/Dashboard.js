import React from "react";
import "./Dashboard.css";
import { MdDashboard } from "react-icons/md";
import { MdNotificationsActive } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import DashboardCards from "../Components/DashboardCard/DashboardCards";
import LineChart from "../Components/Charts/LineChart";

const Dashboard = () => {
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
      <div>
        <DashboardCards />
      </div>
      <div className="flex flex-wrap justify-evenly gap-5 mb-2 mt-8">
        <LineChart />
        <LineChart />
        <LineChart />
      </div>
    </>
  );
};

export default Dashboard;
