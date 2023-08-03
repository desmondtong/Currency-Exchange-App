import React, { useState } from "react";
import Converter from "../Components/Converter";
import Graph from "../Components/Graph";
import useGet from "../Hooks/useGet";
import Watchlist from "../Components/Watchlist";
import Widget from "../Components/Widget";
import EmptyWidget from "../Components/EmptyWidget";

function Main(props) {
  // state for API endpoints (GET)
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
      {/* <div className="container"> */}
        <div className="row">
          <div className="col-sm-9">
            <div className="row padding-1 border shadow">
              <Converter
                currSymbol={currSymbol}
                cryptoSymbol={cryptoSymbol}
                getCurrSymbol={getCurrSymbol}
                getCryptoSymbol={getCryptoSymbol}
                selection={props.selection}
                setSelection={props.setSelection}
                todayDate={props.todayDate}
              ></Converter>
            </div>
            <div className="row padding-1 border shadow graph">
              <div className="col-sm-10">
                <Graph
                  selection={props.selection}
                  setSelection={props.setSelection}
                  todayDate={props.todayDate}
                  historyDate={props.historyDate}
                  setWidgetInfo={props.setWidgetInfo}
                  isDashboard={true}
                ></Graph>
              </div>
              <div className="col-sm-2">
                {props.widgetInfo.map((item, idx) => {
                  return (
                    <Widget
                      key={idx}
                      id={idx}
                      sym={item.sym}
                      fluctuation={item.fluctuation}
                      data={item.data}
                      timeframe={item.timeframe}
                      setWidgetInfo={props.setWidgetInfo}
                      setSelection={props.setSelection}
                    ></Widget>
                  );
                })}
                {Array.from("1".repeat(4 - props.widgetInfo.length)).map(
                  (item, idx) => {
                    return <EmptyWidget key={idx}></EmptyWidget>;
                  }
                )}
              </div>
            </div>
          </div>
          <div className="col-sm-3 border shadow">
            <Watchlist
              todayDate={props.todayDate}
              historyDate={props.historyDate}
              currSymbol={currSymbol}
            ></Watchlist>
          </div>
        </div>
      {/* </div> */}
    </>
  );
}

export default Main;
