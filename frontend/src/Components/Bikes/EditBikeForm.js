import { MdDirectionsBike, MdOutlineFormatListNumbered } from "react-icons/md";
import axios from "axios";
import { useEffect, useState } from "react";
import generateAlert from "../../utils/generateAlert";

const EditBikeForm = () => {
  const [bike_types, setBikeTypes] = useState([]);
  const [message, setMessage] = useState({});

  const loadBikeTypes = async () => {
    await axios.get("/bike_types/getBikeTypes")
    .then(response => setBikeTypes(response.data.message));
  }

  const deleteBikeType = (id) => {
    axios.post('/bike_types/deleteBikeType', { id: id })
      .then(response => setMessage(response.data));
  }

  useEffect(() => {
    if (message.type) {
      generateAlert(message.type, message.message);
    }
  }, [message]);

  useEffect(() => {
    if (bike_types.length === 0) {
      loadBikeTypes();
    }
  }, [bike_types]);

  return (
    <div className="flex justify-center w-full  m-auto bg-white rounded-lg border border-gray-300 mt-5 h-[45%] overflow-y-hidden py-30 text-sm font-sm shadow-lg relative md:p-20">
      <div className="absolute flex font-bold    cursor-pointer top-0 w-full py-4 bg-dark-red text-white">
        Modify: <MdOutlineFormatListNumbered className="mx-4" />{" "}
        <span className="active:translate-y-1">Bike Types</span>
        <MdDirectionsBike className="mx-4" />
        <span className="active:translate-y-1">Bikes</span>
      </div>
      <div className="flex flex-col flex-wrap  justify-between text-left mr-96">
        {
          bike_types.map((item, key) => {
            return <div key={key} className="mt-8">{item.id}. {item.description} ({item.price_per_minute}$ per minute) <button onClick={() => deleteBikeType(item.id)}>x</button></div>;
          })
        }
      </div>
    </div>
  );
};

export default EditBikeForm;
