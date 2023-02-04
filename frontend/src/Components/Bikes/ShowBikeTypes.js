import { MdEdit } from "react-icons/md";
import { RiCloseCircleLine } from "react-icons/ri";
import fetchData from "../../utils/fetchEndPoints";
import { useEffect, useState } from "react";
import generateAlert from "../../utils/generateAlert";

let last_bike_type_id = "";
const ShowBikeTypes = ({
  addCount,
  setShowAddBikes,
  setShowInput,
  setIsAnimating
}) => {
  const [bike_types, setBikeTypes] = useState([]);
  const [message, setMessage] = useState({});

  let showBikeTypes = "";

  const deleteBikeType = async (id) => {
    const response = await fetchData("/bike_types/deleteBikeType", "POST", {
      id
    });
    setMessage(response);
  };

  const handleClick = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsAnimating(true);
    }, 0);
  };

  const editBikeType = (id) => {
    setShowAddBikes(true);
    setShowInput(id);
    handleClick();
    if (last_bike_type_id !== id) {
      document.querySelector(`.bike_type_id_${id}`).classList.add("bg-gray-400");
      document.querySelector(`.bike_type_id_${id}`).classList.add("text-white");
      if (last_bike_type_id !== "") {
        document.querySelector(`.bike_type_id_${last_bike_type_id}`).classList.remove("bg-gray-400");
        document.querySelector(`.bike_type_id_${last_bike_type_id}`).classList.remove("text-white");
      }
      last_bike_type_id = id;
    } else {
      document.querySelector(`.bike_type_id_${last_bike_type_id}`).classList.remove("bg-gray-400");
      document.querySelector(`.bike_type_id_${last_bike_type_id}`).classList.remove("text-white");
    }
  };

  useEffect(() => {
    if (message.type) {
      generateAlert(message.type, message.message);
    }

    (async () => {
      const response = await fetchData("/bike_types/getBikeTypes");
      setBikeTypes(response.message);
    })();
  }, [message, addCount]);

  if (bike_types.length === 0) {
    showBikeTypes = "No bike types added";
  } else {
    showBikeTypes = bike_types.map((item, key) => {
      return (
        <div
          key={key}
          className={`${`bike_type_id_${item.id}`} mt-4 text-md cursor-pointer bg-gray-200 shadow-lg rounded-md px-2 py-2 hover:bg-gray-400 hover:text-white w-screen flex lg:justify-between md:justify-start sm:justify-start`}
        >
          {item.id} - {item.price_per_minute}$ per minute - {item.description}{" "}
          <div className="inline cursor-pointer ">
            <button
              className="active:translate-y-1 mr-2"
              onClick={() => editBikeType(item.id)}
            >
              <MdEdit className="text-lg ml-10" />
            </button>
            <button
              className="active:translate-y-1"
              onClick={() => deleteBikeType(item.id)}
            >
              <RiCloseCircleLine className="text-lg" />
            </button>
          </div>
          <hr className="bg-gray-800 mt-2"></hr>
        </div>
      );
    });
  }

  return (
    <div className="flex justify-center w-full mt-10 bg-white rounded-lg  border border-gray-300 py-30 text-sm font-sm shadow-lg relative md:p-20">
      <div className="absolute font-semibold cursor-pointer bg-dark-red top-0 py-4 text-white text-center w-full">
        Modify and Delete Bikes Type
      </div>
      <div>{showBikeTypes}</div>
    </div>
  );
};

export default ShowBikeTypes;
