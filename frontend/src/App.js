import React from "react";

import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import RouterLinks from "./Routes/RouterLinks";

const App = () => {
  return (
    <>
      <nav>
        <NavBar />
      </nav>

      <main className="content">
        <RouterLinks />
      </main>
    </>
  );
};

export default App;
