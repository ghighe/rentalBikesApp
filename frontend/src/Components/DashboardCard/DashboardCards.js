import React from "react";
import axios from "axios";

const DashboardCards = () => {
  const [rentals_count, setRentalsCount] = React.useState(null);
  const [bikes_count, setBikesCount] = React.useState(null);
  const show_bikes_count = React.useRef(true);
  React.useEffect(() => {
    if (show_bikes_count.current == false) return;
    axios.get("/bikes/getBikesCount").then(response => {
      let data = response.data;
      setRentalsCount(data.message.rentals_count);
      setBikesCount(data.message.bikes_count);
    });
    show_bikes_count.current = false;
  }, []);
  const cardLayout = "block rounded-lg shadow-lg bg-white text-center relative";

  return (
    <div className="flex flex-wrap justify-center gap-5 mt-10 max">
      <div className={cardLayout}>
        <div className="p-6">
          <h5 className="text-gray-400 text-md font-light mb-2  top-2 right-1 text-center">
            Available Bikes
          </h5>
          <p className="text-gray-500 text-2xl  mb-4 text-center mt-2 ">{rentals_count}/{bikes_count}</p>
        </div>
        <div className="py-3 px-6 border-t font-light border-gray-300 text-gray-400">
          7 bikes are malfunctioning
        </div>
      </div>

      <div className={cardLayout}>
        <div className="p-6">
          <h5 className="text-gray-400 text-md font-light mb-2  top-2 right-1 text-center">
            Available Bikes
          </h5>
          <p className="text-gray-500 text-2xl  mb-4 text-center mt-2 ">40/51</p>
        </div>
        <div className="py-3 px-6 border-t font-light border-gray-300 text-gray-400">
          7 bikes are malfunctioning
        </div>
      </div>

      <div className={cardLayout}>
        <div className="p-6">
          <h5 className="text-gray-400 text-md font-light mb-2  top-2 right-1 text-center">
            Available Bikes
          </h5>
          <p className="text-gray-500 text-2xl  mb-4 text-center mt-2 ">40/51</p>
        </div>
        <div className="py-3 px-6 border-t font-light border-gray-300 text-gray-400">
          7 bikes are malfunctioning
        </div>
      </div>

      <div className={cardLayout}>
        <div className="p-6">
          <h5 className="text-gray-400 text-md font-light mb-2  top-2 right-1 text-center">
            Available Bikes
          </h5>
          <p className="text-gray-500 text-2xl  mb-4 text-center mt-2 ">40/51</p>
        </div>
        <div className="py-3 px-6 border-t font-light border-gray-300 text-gray-400">
          7 bikes are malfunctioning
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
