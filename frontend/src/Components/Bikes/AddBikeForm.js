/* eslint-disable no-unused-vars */
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from "../../utils/formatDate";
import generateAlert from "../../utils/generateAlert";
import fetchData from "../../utils/fetchEndPoints";

const url = "/bikes/addBike";

const AddBikeForm = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [bikeTypeOption, setBikeTypeOption] = useState("");

  let formValid = false;

  if (selectedDate !== "" && bikeTypeOption !== "") {
    formValid = true;
  }

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const selectOptionHandler = (event) => {
    const optionSelected = event.target.value;
    optionSelected !== "default"
      ? setBikeTypeOption(optionSelected)
      : setBikeTypeOption("");
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const data = {
      register_date: formatDate(selectedDate, "en-ZA"),
      type: bikeTypeOption
    };
    console.log(data);
    try {
      const response = await fetchData(url, "POST", data);
      generateAlert(response.type, response.message);
      setBikeTypeOption("default");
    } catch (error) {
      console.log(`Cannot insert a new bike ${error}`);
    }
  };

  return (
    <form className="flex flex-col" onSubmit={submitHandler}>
      <div>
        <DatePicker
          className="bg-gray-300 text-black text-center mt-6 h-8 cursor-pointer"
          selected={selectedDate}
          id="datePicker"
          onChange={handleDateChange}
          placeholderText="Select date"
          popperModifiers={[
            {
              name: "offset",
              options: {
                offset: [5, 10]
              }
            },
            {
              name: "preventOverflow",
              options: {
                rootBoundary: "viewport",
                tether: false,
                altAxis: true
              }
            }
          ]}
        />
      </div>

      <div className="mt-6">
        <select
          className="bg-gray-300 text-black w-full h-8 border-solid border-black text-center cursor-pointer"
          id="bikeType"
          onChange={selectOptionHandler}
        >
          <option value="default">Select a type</option>
          <option value="1">classic</option>
          <option value="2">electric</option>
          <option value="3">hibrid</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={!formValid}
        className=" bg-red-500 hover:bg-red-700 text-white font-bold focus:outline-none py-2 px-4 mt-10 border rounded disabled:opacity-75 disabled:cursor-not-allowed"
      >
        Add Bike
      </button>
    </form>
  );
};

export default AddBikeForm;
