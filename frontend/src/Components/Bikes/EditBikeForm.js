import { useEffect, useState } from "react";
import generateAlert from "../../utils/generateAlert";
import fetchData from "../../utils/fetchEndPoints";

const url = ["/bike_types/editBikeType", "/bike_types/getBikeType"];

const AddBikeForm = ({ setAddCount, showInput }) => {
  let initialFormInputs = {
    id: showInput,
    description: "",
    price_per_minute: ""
  };
  const [formInputs, setFormInputs] = useState(initialFormInputs);

  let isFormValid = false;

  useEffect(() => {
    const data = {
        id: showInput
    };
    (async () => {
        const response = await fetchData(url[1], "POST", data);
        if (response.type !== "error") {
            setFormInputs({
                id: response.message[0].id,
                description: response.message[0].description,
                price_per_minute: response.message[0].price_per_minute 
            });
        }
    })();
  }, [showInput]);

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

  function editBikeType(event) {
    event.preventDefault();

    const data = {
      id: formInputs.id,
      description: formInputs.description,
      price_per_minute: +formInputs.price_per_minute
    };
    (async () => {
      const response = await fetchData(url[0], "POST", data);
      if (response.type !== "error") {
        setFormInputs(initialFormInputs);
        setAddCount((currCount) => currCount + 1);
      }
      generateAlert(response.type, response.message);
    })();
    isFormValid = false;
  }

  return (
    <>
      <form
        className="w-full max-w-md flex flex-col justify-center items-center"
        onSubmit={editBikeType}
      >
        <div className=" border-b border-gray-300 py-2 ">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 ml-2  py-1 px-2 leading-tight focus:outline-none focus:shadow-outline border-b border-dark-red-500"
            type="text"
            value={formInputs.id}
            disabled={true}
            onChange={idChangeHandler}
            placeholder="Type(1-classic,2-electric,3-scooter...)"
            aria-label="Type(1-classic,2-electric,3-scooter...)"
          />
        </div>

        <div className=" border-b border-gray-300 py-2 mt-2">
          <input
            className="bg-transparent border-none w-full text-gray-700 mr-3 ml-2  py-1 px-2 leading-tight focus:outline-none appearance-none"
            type="number"
            value={formInputs.price_per_minute}
            onChange={priceChangeHandler}
            placeholder="Price per minute.."
            aria-label="Price per minute.."
          />
        </div>
        <div className="mb-3 xl:w-96">
          <label
            htmlFor="exampleFormControlTextarea1"
            className="form-label inline-block mb-2 text-gray-400 mt-1 relative top-2"
          >
            Extra
          </label>
          <textarea
            className="

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

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={!isFormValid}
            className=" bg-red-500 hover:bg-red-700 text-white font-bold focus:outline-none py-2 px-4 border rounded disabled:opacity-75 disabled:cursor-not-allowed"
          >
            Edit bike type
          </button>
        </div>
      </form>
    </>
  );
};

export default AddBikeForm;
