import { useState } from "react";
import AddBikeForm from "../Components/Bikes/AddBikeForm";
import EditBikeForm from "../Components/Bikes/EditBikeForm";
import BikesContext from '../BikesContext';

const Bikes = () => {
  const [isChanged, setIsChanged] = useState(Math.random());
  return (
    <BikesContext.Provider value={{ isChanged, setIsChanged }}>
      <AddBikeForm />
      <EditBikeForm />
    </BikesContext.Provider>
  );
};

export default Bikes;
