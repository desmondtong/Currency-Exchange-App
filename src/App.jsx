import React, { useState } from "react";
import Converter from "./Components/Converter";
import Graph from "./Components/Graph";
import useGet from "./Hooks/useGet";

const defaultCurrency = { from: "SGD", to: "MYR" };

const todayDate = new Date().toISOString().split("T")[0];

function App() {
  // state for API endpoints (GET)
  const [currSymbol, setcurrSymbol] = useState({});
  const [cryptoSymbol, setCryptoSymbol] = useState({});

  // state
  const [selection, setSelection] = useState({
    from: defaultCurrency.from,
    to: defaultCurrency.to,
    amount: 1,
    date: todayDate,
  });

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
                selection={selection}
                setSelection={setSelection}
                todayDate={todayDate}
              ></Converter>
            </div>
            <div className="row border">
              <Graph selection={selection} todayDate={todayDate}></Graph>
            </div>
          </div>
          <div className="col-sm-3 border">WATCHLIST</div>
        </div>
      </div>
    </>
  );
}

export default App;
