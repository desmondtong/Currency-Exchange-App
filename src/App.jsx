import React, { useState } from "react";
import Converter from "./Components/Converter";
import Graph from "./Components/Graph";
import useGet from "./Hooks/useGet";

function App() {
  // state for API endpoints
  const [currSymbol, setcurrSymbol] = useState({});
  const [cryptoSymbol, setCryptoSymbol] = useState({});

  // function to call API
  const getData = useGet();

  const getCurrSymbol = async () => {
    const data = await getData("symbols");
    setcurrSymbol(data.symbols);
  };

  const getCryptoSymbol = async () => {
    const data = await getData("cryptocurrencies");
    setCryptoSymbol(data.cryptocurrencies);
  };

  return (
    <>
      <h1>Website name</h1>
      <div className="container">
        <div className="row">
          <div className="col-sm-9">
            <div className="row border">
              <Converter
                currSymbol={currSymbol}
                cryptoSymbol={cryptoSymbol}
                getCurrSymbol={getCurrSymbol}
                getCryptoSymbol={getCryptoSymbol}
              ></Converter>
            </div>
            <div className="row border">
              <Graph></Graph>
            </div>
          </div>
          <div className="col-sm-3 border">WATCHLIST</div>
        </div>
      </div>
    </>
  );
}

export default App;
