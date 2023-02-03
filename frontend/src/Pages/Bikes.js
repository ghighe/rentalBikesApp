import AddBikeForm from "../Components/Bikes/AddBikeForm";
import EditBikeForm from "../Components/Bikes/EditBikeForm";
import { useState } from "react";
const Bikes = () => {
  const [addCount, setAddCount] = useState(0);

  return (
    <>
      <div className="flex justify-center w-1/2 mt-10 m-auto bg-white rounded-lg border border-gray-300 py-40 text-sm font-sm shadow-lg relative md:p-20">
        <div className="absolute top-0  w-full py-4 bg-dark-red text-center text-white">
          Add Bike Types
          <span className="block text-sm text-center">
            Add new bike type in the system
          </span>
        </div>
        <AddBikeForm setAddCount={setAddCount} />
      </div>
      <EditBikeForm addCount={addCount} />
    </>
  );
};

export default Bikes;
