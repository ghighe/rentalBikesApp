import React from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useState } from "react";

import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import RouterLinks from "./Routes/RouterLinks";

const App = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex mx-0 my-0 py-0 px-0 bg-gray-200">
      <div
        className={`bg-dark-red h-screen p-5 pt-8  ${
          isOpen ? "w-72" : "w-20"
        } duration-300 relative`}
      >
        <BsArrowLeftShort
          className={`bg-white text-dark-red text-3xl rounded-full absolute -right-3 top-9 border border-dark-red cursor-pointer ${
            !isOpen && "rotate-180"
          }`}
          onClick={() => setIsOpen((open) => !open)}
        />
        <NavBar isOpen={isOpen} />
      </div>
      <div className="p-7 text-2xl font-semibold w-screen">
        <RouterLinks />
      </div>
    </div>
  );
};

export default App;
