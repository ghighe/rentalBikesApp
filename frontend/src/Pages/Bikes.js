import AddBikeTypeForm from "../Components/Bikes/AddBikeTypeForm";
import ShowBikeTypes from "../Components/Bikes/ShowBikeTypes";
import EditBikeForm from "../Components/Bikes/EditBikeForm";
import AddBikeForm from "../Components/Bikes/AddBikeForm";
import { useState } from "react";

const Bikes = () => {
  const [addCount, setAddCount] = useState(0);
  const [showAddBikes, setShowAddBikes] = useState(false);
  const [showInput, setShowInput] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <>
      <main className="flex gap-5 lg:flex-nowrap md:flex-wrap sm:flex-wrap">
        <div
          style={{ display: showAddBikes ? "none" : "" }}
          className="flex justify-center w-1/2 mt-10 m-auto bg-white rounded-lg border border-gray-300 py-40 text-sm font-sm shadow-lg relative md:p-20"
        >
          <div className="absolute top-0  w-full py-4 bg-dark-red text-center text-white">
            Add Bike Types
            <span className="block text-sm text-center">
              Add new bike type in the system
            </span>
          </div>
          <AddBikeTypeForm
            setAddCount={setAddCount}
            showAddBikes={showAddBikes}
          />
        </div>
        <div
          style={{ display: showAddBikes ? "" : "none" }}
          className={`${
            isAnimating ? "shocked" : ""
          } flex justify-center w-1/2 mt-10 m-auto bg-white rounded-lg border border-gray-300 py-40 text-sm font-sm shadow-lg relative md:p-20`}
        >
          <div className="absolute top-0  w-full py-4 bg-dark-red text-center text-white">
            Edit Bike Type
          </div>

          <EditBikeForm
            setShowAddBikes={setShowAddBikes}
            setAddCount={setAddCount}
            showInput={showInput}
          />
        </div>
        <div className="flex justify-center w-1/2  h-[425px] mt-10 m-auto bg-white rounded-lg border border-gray-300 py-40 text-sm font-sm shadow-lg relative md:p-20">
          <div className="absolute top-0  w-full py-4 bg-dark-red text-center text-white">
            Add Bike
            <span className="block text-sm text-center">Add a new bike</span>
          </div>
          <AddBikeForm />
        </div>
      </main>
      <ShowBikeTypes
        addCount={addCount}
        setIsAnimating={setIsAnimating}
        setShowInput={setShowInput}
        setShowAddBikes={setShowAddBikes}
      />
    </>
  );
};

export default Bikes;
