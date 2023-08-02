import React, { useEffect, useState } from "react";
import Converter from "./Components/Converter";
import Graph from "./Components/Graph";
import useGet from "./Hooks/useGet";
import Watchlist from "./Components/Watchlist";
import Widget from "./Components/Widget";
import EmptyWidget from "./Components/EmptyWidget";

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
    timeframe: "1Y",
  });
  const [widgetInfo, setWidgetInfo] = useState([]);

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

  // subtract date
  const historyDate = (days, months, years) => {
    var date = new Date();
    date.setDate(date.getDate() + days);
    date.setMonth(date.getMonth() + months);
    date.setFullYear(date.getFullYear() + years);
    return date.toISOString().split("T")[0];
  };

  return (
    <>
      <h1>Website name</h1>
      {JSON.stringify(widgetInfo)}
      <div className="container">
        <div className="row">
          <div className="col-sm-9">
            <div className="row padding-1 border shadow">
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
            <div className="row padding-1 border shadow graph">
              <div className="col-sm-10">
                <Graph
                  selection={selection}
                  setSelection={setSelection}
                  todayDate={todayDate}
                  historyDate={historyDate}
                  setWidgetInfo={setWidgetInfo}
                ></Graph>
              </div>
              <div className="col-sm-2">
                {widgetInfo.map((item, idx) => {
                  return (
                    <Widget
                      key={idx}
                      id={idx}
                      sym={item.sym}
                      fluctuation={item.fluctuation}
                      data={item.data}
                      setWidgetInfo={setWidgetInfo}
                    ></Widget>
                  );
                })}
                {Array.from("1".repeat(4 - widgetInfo.length)).map(
                  (item, idx) => {
                    return <EmptyWidget key={idx}></EmptyWidget>;
                  }
                )}
              </div>
            </div>
          </div>
          <div className="col-sm-3 border shadow">
            <Watchlist
              todayDate={todayDate}
              historyDate={historyDate}
              currSymbol={currSymbol}
            ></Watchlist>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
