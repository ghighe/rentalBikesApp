import Card from "../UI/Card";
import { useEffect, useState, useRef } from "react";
import generateAlert from "../../utils/generateAlert";
import axios from "axios";

const DashboardCards = () => {
  const [rentals_count, setRentalsCount] = useState(0);
  const [bikes_count, setBikesCount] = useState(0);
  const [revenueValue, setRevenueValue] = useState(0);
  const show_bikes_count = useRef(true);

  useEffect(() => {
    if (show_bikes_count.current === false) return;
    axios.get("/rentals/getBikesCount").then((response) => {
      let data = response.data;
      setRentalsCount(data.message.rentals_count);
      setBikesCount(data.message.bikes_count);
    });
    axios.get("/rentals/getRevenueRentals").then((response) => {
      let data = response.data;
      if (data.type === "error" && data.message.total_net_amount !== 0) {
        generateAlert("error", response.data.message);
      } else {
        setRevenueValue(data.message.total_net_amount);
      }
    });
    show_bikes_count.current = false;
  }, []);

  const cardLayout =
    "block rounded-lg shadow-lg w-80 bg-white text-center relative";
  const cardTitleStyle =
    "text-gray-400 text-md font-light mb-2  top-2 right-1 text-center";
  const cardContentStyle = "text-gray-500 text-2xl  mb-4 text-center mt-2 ";
  const cardFooterStyle =
    "py-3 px-6 border-t font-light border-gray-300 text-gray-400";

  return (
    <div className="flex flex-wrap justify-center gap-5 mt-10 max">
      <Card
        cardLayout={cardLayout}
        cardTitle={cardTitleStyle}
        cardContent={cardContentStyle}
        cardFooter={cardFooterStyle}
        cardTitleText={"Available Bikes"}
        cardCentralText={`${rentals_count}/${bikes_count}`}
        cardFooterText={"3 bikes are malfunctioning"}
      ></Card>

      <Card
        cardLayout={cardLayout}
        cardTitle={cardTitleStyle}
        cardContent={cardContentStyle}
        cardFooter={cardFooterStyle}
        cardTitleText={"Revenue"}
        cardCentralText={`$${revenueValue}`}
        cardFooterText={"Last Month"}
      ></Card>

      <Card
        cardLayout={cardLayout}
        cardTitle={cardTitleStyle}
        cardContent={cardContentStyle}
        cardFooter={cardFooterStyle}
        cardTitleText={"Fixed Issues"}
        cardCentralText={"75"}
        cardFooterText={"Tracked from github"}
      ></Card>

      <Card
        cardLayout={cardLayout}
        cardTitle={cardTitleStyle}
        cardContent={cardContentStyle}
        cardFooter={cardFooterStyle}
        cardTitleText={"Followers"}
        cardCentralText={"+240"}
        cardFooterText={"Just Uploaded"}
      ></Card>
    </div>
  );
};

export default DashboardCards;
