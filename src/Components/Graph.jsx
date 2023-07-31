import React, { useState, useEffect } from "react";
import useGet from "../Hooks/useGet";

const Graph = (props) => {
  // state for API endpoints (GET)
  const [timeSeries, setTimeSeries] = useState([]);

  // function to call API
  const getData = useGet();

  const getTimeSeries = async (startDate) => {
    const data = await getData(
      `timeseries?start_date=${startDate}&end_date=${props.todayDate}&base=${props.selection.from}&symbols=${props.selection.to}`
    );
    // create an array of historic rates
    setTimeSeries(
      Object.values(data.rates).map((item) => {
        return item[`${props.selection.to}`];
      })
    );
  };

  // subtract date
  const historyDate = (days, months, years) => {
    var date = new Date();
    date.setDate(date.getDate() + days);
    date.setMonth(date.getMonth() + months);
    date.setFullYear(date.getFullYear() + years);
    return date.toISOString().split("T")[0];
  };

  // useEffect
  useEffect(() => {
    getTimeSeries(historyDate(0, 0, -1));
  }, [props.selection]);

  return (
    <>
      {JSON.stringify(timeSeries)}
      <br></br>
      <div className="row">
        {props.selection.from} to {props.selection.to} Chart
      </div>
      <div className="row">
        <div className="col-sm-5"></div>
        <div className="col-sm-2">
          <button onClick={() => getTimeSeries(historyDate(-7, 0, 0))}>
            1W
          </button>
          <button onClick={() => getTimeSeries(historyDate(0, -1, 0))}>
            1M
          </button>
          <button onClick={() => getTimeSeries(historyDate(0, 0, -1))}>
            1Y
          </button>
        </div>
        <div className="col-sm-5"></div>
      </div>
    </>
  );
};

export default Graph;
