import axios from "axios";
import { useRef } from "react";
import { generateAlert } from "../../functions";

const AddBikeForm = () => {
  const getBikeTypeInput = useRef();
  const extraInformationInput = useRef();
  const getPriceInput = useRef();
  const formReset = useRef();

  function addBikeType(event) {
    event.preventDefault();
    const bikeTypeValue = getBikeTypeInput.current.value;
    const priceValue = getPriceInput.current.value;
    const informationValue = extraInformationInput.current.value;

    const data = {
      id: bikeTypeValue,
      description: informationValue,
      price_per_minute: +priceValue
    };

    formReset.current.reset();

    axios.post("/bike_types/addBikeType", data).then((response) => {
      generateAlert(response.data.type, response.data.message);
    });
  }

  return (
    <div className="flex justify-center bg-white rounded-lg border border-gray-300 py-40 max-w-[30%] mx-[10%] text-lg font-medium shadow-lg relative">
      <div className="absolute top-0 text-center text-white w-full py-4 overflow-hidden bg-dark-red">
        Add Bike Types
        <span className="block text-sm text-center">
          Add new bike type in the system
        </span>
      </div>
      <form className="w-full max-w-md" onSubmit={addBikeType} ref={formReset}>
        <div className=" border-b border-dark-red py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 ml-2  py-1 px-2 leading-tight focus:outline-none"
            type="text"
            ref={getBikeTypeInput}
            placeholder="Type(1-classic,2-electric,3-scooter...)"
            aria-label="Type(1-classic,2-electric,3-scooter...)"
          />
        </div>

        <div className=" border-b border-dark-red py-2 mt-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 ml-2  py-1 px-2 leading-tight focus:outline-none"
            type="number"
            ref={getPriceInput}
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
              ref={extraInformationInput}
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border rounded"
        >
          Add Entry
        </button>
      </form>
    </div>
  );
};

export default AddBikeForm;
