import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import useGet from "./Hooks/useGet";
import NavBar from "./Components/NavBar";
import Main from "./Pages/Main";
import FullGraph from "./Pages/FullGraph";
import About from "./Pages/About";
import FullConverter from "./Pages/FullConverter";

const App = () => {
  const defaultCurrency = { from: "SGD", to: "MYR" };
  const todayDate = new Date().toISOString().split("T")[0];

  // state for API endpoints (GET)
  const [currSymbol, setcurrSymbol] = useState({});

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
      <NavBar></NavBar>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <Main
                todayDate={todayDate}
                selection={selection}
                setSelection={setSelection}
                historyDate={historyDate}
                widgetInfo={widgetInfo}
                setWidgetInfo={setWidgetInfo}
                currSymbol={currSymbol}
                getCurrSymbol={getCurrSymbol}
              />
            }
          ></Route>
          <Route
            path="/converter"
            element={
              <FullConverter
                currSymbol={currSymbol}
                getCurrSymbol={getCurrSymbol}
              />
            }
          ></Route>
          <Route
            path="/graph"
            element={
              <FullGraph
                selection={selection}
                setSelection={setSelection}
                todayDate={todayDate}
                historyDate={historyDate}
                setWidgetInfo={setWidgetInfo}
              />
            }
          ></Route>
          <Route path="/about-me" element={<About />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
