import { MdDirectionsBike, MdOutlineFormatListNumbered } from "react-icons/md";
import fetchData from "../../utils/fetchEndPoints";
import { useEffect, useState } from "react";
import generateAlert from "../../utils/generateAlert";

const EditBikeForm = () => {
  const [bike_types, setBikeTypes] = useState([]);
  const [message, setMessage] = useState({});

  const [isChanged, setIsChanged] = useState(false);

  const deleteBikeType = async (id) => {
    const response = await fetchData("/bike_types/deleteBikeType", "POST", {
      id,
    });
    setMessage(response);
    setIsChanged(Math.random());
  };

  const editBikeType = (id) => {
    setIsChanged(Math.random());
  };

  useEffect(() => {
    if (message.type) {
      generateAlert(message.type, message.message);
    }
  }, [message]);

  useEffect(() => {
    (async () => {
      const response = await fetchData("/bike_types/getBikeTypes");
      setBikeTypes(response.message);
    })();
  }, [isChanged]);

  return (
    <div className="flex justify-center w-[80%] mt-10 mx-auto bg-white rounded-lg border border-gray-300 py-40 text-sm font-sm shadow-lg relative md:p-20">
      <div className="absolute flex font-bold cursor-pointer top-0 w-full py-4 bg-dark-red text-white">
        Modify: <MdOutlineFormatListNumbered className="mx-4" />{" "}
        <span className="active:translate-y-1">Bike Types</span>
        <MdDirectionsBike className="mx-4" />
        <span className="active:translate-y-1">Bikes</span>
      </div>
      <div className="flex flex-col justify-between text-left mr-96">
        {Array.isArray(bike_types) &&
          bike_types.map((item, key) => {
            return (
              <div key={key} className="mt-8 text-sm">
                {item.id}. {item.description} ({item.price_per_minute}$ per
                minute){" "}
                <button onClick={() => editBikeType(item.id)}>✏ </button>
                <button onClick={() => deleteBikeType(item.id)}>X</button>
                <hr className="bg-gray-800 mt-2"></hr>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default EditBikeForm;
