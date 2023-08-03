import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Main from "./Pages/Main";
import FullGraph from "./Pages/FullGraph";
import About from "./Pages/About";

const App = () => {
  return (
    <>
      <NavBar></NavBar>
      <div className="container">
        <Routes>
          <Route path="/" element={<Main />}></Route>
          {/* <Route path="/graph" element={<FullGraph />}></Route> */}
          <Route path="/about-me" element={<About />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
