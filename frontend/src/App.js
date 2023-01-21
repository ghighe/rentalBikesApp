import React from "react";

import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import RouterLinks from "./Routes/RouterLinks";

const App = () => {
  return (
    <div className="main-container">
      <nav className="left-menu">
        <NavBar />
      </nav>
      <main className="content">
        <RouterLinks />
      </main>
    </div>
  );
};

export default App;
