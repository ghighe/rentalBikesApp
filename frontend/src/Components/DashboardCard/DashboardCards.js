import Card from "../UI/Card";
import { useEffect, useState, useRef } from "react";
import generateAlert from "../../utils/generateAlert";
import RepositoryStars from "./RepositoryStars";
import fetchData from "../../utils/fetchEndPoints";

const DashboardCards = () => {
  const [rentals_count, setRentalsCount] = useState(0);
  const [bikes_count, setBikesCount] = useState(0);
  const [revenueValue, setRevenueValue] = useState(0);
  const show_bikes_count = useRef(true);

  const repoOwner = "ghighe";
  const repoName = "rentalBikesApp";

  useEffect(() => {
    if (show_bikes_count.current === false) return;
    (async () => {
      const response = await fetchData("/rentals/getBikesCount");
      setRentalsCount(response.message.rentals_count);
      setBikesCount(response.message.bikes_count);
    })();
    (async () => {
      const response = await fetchData("/rentals/getRevenueRentals");
      if (
        response.type === "error" &&
        response.message.total_net_amount !== 0
      ) {
        generateAlert("error", response.message);
      } else {
        setRevenueValue(response.message.total_net_amount);
      }
    })();
    show_bikes_count.current = false;
  }, []);

  const cardLayout =
    "block rounded-lg shadow-lg w-80 bg-white text-center relative cursor-pointer transition duration-200 ease-in-out transform hover:scale-105 hover:bg-gray-100";
  const cardTitleStyle =
    "text-gray-400 text-md font-light mb-2  top-2 right-1 text-center ";
  const cardContentStyle = "text-gray-500 text-2xl  mb-4 text-center mt-2 ";
  const cardFooterStyle =
    "py-3 px-6 border-t font-light border-gray-300 text-gray-400";

  return (
    <div className="flex flex-wrap justify-start gap-5 mt-10 max ">
      <Card
        cardLayout={cardLayout}
        cardTitle={cardTitleStyle}
        cardContent={cardContentStyle}
        cardFooter={cardFooterStyle}
        cardTitleText={"Total Bikes"}
        cardCentralText={`${bikes_count}`}
        cardFooterText={`${rentals_count} rented`}
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
        cardTitleText={"Commits"}
        cardCentralText={
          <RepositoryStars owner={repoOwner} repo={repoName} commits={true} />
        }
        cardFooterText={"Tracked from github"}
      ></Card>

      <Card
        cardLayout={cardLayout}
        cardTitle={cardTitleStyle}
        cardContent={cardContentStyle}
        cardFooter={cardFooterStyle}
        cardTitleText={"Github Stars"}
        cardCentralText={<RepositoryStars owner={repoOwner} repo={repoName} />}
        cardFooterText={"We are waiting for you on Github with a star!"}
      ></Card>
    </div>
  );
};

export default DashboardCards;
