import React, { useState, useEffect, useRef } from "react";
import useGet from "../Hooks/useGet";
import Chart from "chart.js/auto";

const Graph = (props) => {
  const chartRef = useRef();

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

  const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  new Chart(chartRef.current, {
    type: "bar",
    data: {
      labels: data.map((row) => row.year),
      datasets: [
        {
          label: "Acquisitions by year",
          data: data.map((row) => row.count),
        },
      ],
    },
  });

  return (
    <>
      {JSON.stringify(timeSeries)}
      <br></br>
      {/* {console.log(chartRef.current.id)} */}
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
      <div className="row">
        <canvas id="chart" ref={chartRef}></canvas>
      </div>
    </>
  );
};

export default Graph;
