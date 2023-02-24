/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import fetchData from "../../utils/fetchEndPoints";
import { formatDate } from "../../utils/formatDate";

const hoverAndBorder = "border-b hover:bg-gray-300";
const url = `/bikes/getBikes`;

const BikeTable = () => {
  const [bikesPerPage, setBikesPerPage] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  useEffect(() => {
    (async () => {
      const response = await fetchData(url);
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setTotalPages(Math.ceil(response.message.length / itemsPerPage));
      setBikesPerPage(response.message.slice(startIndex, endIndex));
    })();
  }, [currentPage]);

  const handlePrevious = () => {
    if (currentPage === 1) {
      return;
    } else {
      setCurrentPage((currentPage) => currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage === totalPages) {
      return;
    } else {
      setCurrentPage((currentPage) => currentPage + 1);
    }
  };

  let applyElectricStyle =
    "px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600";

  return (
    <div className="flex flex-col bg-white h-[50%] w-[60%] mx-auto rounded-lg shadow-2xl relative">
      <div className="text-start bg-dark-red overflow-hidden text-white py-2 px-4">
        <h1 className="">Bikes</h1>
        <p className="text-sm font-light">Bikes list</p>
      </div>
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden w-1/2 mx-auto my-8">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-black px-6 py-4 text-left cursor-pointer"
                  >
                    Id
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left cursor-pointer"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left cursor-pointer"
                  >
                    Registration Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {bikesPerPage.map((bike) => {
                  return (
                    <tr className={hoverAndBorder} key={bike.bike_id}>
                      <td
                        className={
                          bike.description === "electric"
                            ? applyElectricStyle
                            : "text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap"
                        }
                      >
                        {bike.bike_id}
                      </td>
                      <td
                        className={
                          bike.description === "electric"
                            ? applyElectricStyle
                            : "text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap"
                        }
                      >
                        {bike.description}
                      </td>
                      <td
                        className={
                          bike.description === "electric"
                            ? applyElectricStyle
                            : "text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap"
                        }
                      >
                        {formatDate(new Date(bike.register_date), "ro-RO")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="absolute inline-flex bottom-3 left-[35%] right-[35%]">
              <button
                className="page-link text-sm relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                onClick={handlePrevious}
              >
                Previous
              </button>
              <span className="page-link text-sm relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none">
                {currentPage} / {totalPages}
              </span>
              <button
                className="page-link text-sm relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeTable;
