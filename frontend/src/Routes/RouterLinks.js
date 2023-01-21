import { Route, Routes } from "react-router-dom";
import AddBike from "../Pages/AddBike";
import Dashboard from "../Pages/Dashboard";
import Database from "../Pages/Database";
import Maps from "../Pages/Maps";
import Notifications from "../Pages/Notifications";

const RouterLinks = () => {
  const errorMessage = <h1>Page not found!</h1>;

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="add_bikes" element={<AddBike />} />
      <Route path="database" element={<Database />} />
      <Route path="maps" element={<Maps />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="*" element={errorMessage} />
    </Routes>
  );
};

export default RouterLinks;
