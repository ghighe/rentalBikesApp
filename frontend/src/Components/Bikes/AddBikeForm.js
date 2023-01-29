import axios from "axios";
import { useState } from "react";
import generateAlert from "../../utils/generateAlert";

let initialFormInputs = {
  id: "",
  description: "",
  price_per_minute: ""
};

const AddBikeForm = () => {
  const [formInputs, setFormInputs] = useState(initialFormInputs);

  let isFormValid = false;

  if (
    formInputs.id &&
    formInputs.price_per_minute &&
    formInputs.description.length > 5
  ) {
    isFormValid = true;
  }

  const idChangeHandler = (e) => {
    setFormInputs({ ...formInputs, id: e.target.value });
  };

  const priceChangeHandler = (e) => {
    setFormInputs({ ...formInputs, price_per_minute: e.target.value });
  };

  const infoChangeHandler = (e) => {
    setFormInputs({ ...formInputs, description: e.target.value });
  };

  function addBikeType(event) {
    event.preventDefault();

    const data = {
      id: formInputs.id,
      description: formInputs.description,
      price_per_minute: +formInputs.price_per_minute
    };
    axios.post("/bike_types/addBikeType", data).then((response) => {
      generateAlert(response.data.type, response.data.message);
    });
    setFormInputs(initialFormInputs);
    isFormValid = false;
  }

  return (
    <div className=" flex justify-center mt-10 bg-white rounded-lg border border-gray-300 py-40 text-sm font-sm shadow-lg relative md:p-20">
      <div className="absolute top-0  w-full py-4 bg-dark-red text-center text-white">
        Add Bike Types
        <span className="block text-sm text-center">
          Add new bike type in the system
        </span>
      </div>
      <form className="w-full max-w-md" onSubmit={addBikeType}>
        <div className=" border-b border-dark-red py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 ml-2  py-1 px-2 leading-tight focus:outline-none"
            type="text"
            value={formInputs.id}
            onChange={idChangeHandler}
            placeholder="Type(1-classic,2-electric,3-scooter...)"
            aria-label="Type(1-classic,2-electric,3-scooter...)"
          />
        </div>

        <div className=" border-b border-dark-red py-2 mt-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 ml-2  py-1 px-2 leading-tight focus:outline-none"
            type="number"
            value={formInputs.price_per_minute}
            onChange={priceChangeHandler}
            placeholder="Price per minute.."
            aria-label="Price per minute.."
          />
        </div>
        <div className="w-full">
          <div className="mb-3 xl:w-96">
            <label
              htmlFor="exampleFormControlTextarea1"
              className="form-label inline-block mb-2 text-gray-400 mt-1 relative top-2"
            >
              Extra
            </label>
            <textarea
              className="
        block
        border
        w-full
        px-3
        py-1.5
        focus:border-dark-red
        appearance-none
        outline-0
        resize-none
      "
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Here you can specify additional information"
              value={formInputs.description}
              onChange={infoChangeHandler}
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={!isFormValid}
            className=" bg-red-500 hover:bg-red-700 text-white font-bold focus:outline-none py-2 px-4 border rounded disabled:opacity-75 disabled:cursor-not-allowed"
          >
            Add Entry
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBikeForm;
