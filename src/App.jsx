import React from "react";
import Converter from "./Components/Converter";

function App() {
  return (
    <>
    <h1>Website name</h1>
      <div className="container">
        <div className="row">
          <div className="col-sm-9">
            <div className="row border">
              <Converter></Converter>
            </div>
            <div className="row border">GRAPH</div>
          </div>
          <div className="col-sm-3 border">WATCHLIST</div>
        </div>
      </div>
    </>
  );
}

export default App;
