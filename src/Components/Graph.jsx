import React, { useState, useEffect } from "react";
import useGet from "../Hooks/useGet";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const Graph = (props) => {
  // state for API endpoints (GET)
  const [timeSeries, setTimeSeries] = useState([]);
  const [fluctuation, setFluctuation] = useState({});

  // function to call API
  const getData = useGet();

  const getGraphData = async (startDate, duration) => {
    // get time-series data
    const dataTimeSeries = await getData(
      `timeseries?start_date=${startDate}&end_date=${props.todayDate}&base=${props.selection.from}&symbols=${props.selection.to}`
    );
    setTimeSeries(
      Object.entries(dataTimeSeries.rates).map((item) => {
        return {
          date: new Date(item[0]).toDateString(),
          rate: item[1][props.selection.to],
        };
      })
    );

    // get fluctuation
    const dataFluc = await getData(
      `fluctuation?start_date=${startDate}&end_date=${props.todayDate}&base=${props.selection.from}&symbols=${props.selection.to}`
    );
    const chgPercentage =
      Math.ceil(dataFluc.rates[props.selection.to]["change_pct"] * -10000) /
      100;
    setFluctuation({ chgPercentage, duration });
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
    getGraphData(historyDate(0, 0, -1), "1Y");
  }, [props.selection]);

  const data = {
    labels: timeSeries.map((item) => item.date),
    datasets: [
      {
        // label: "Acquisitions by year",
        data: timeSeries.map((item) => item.rate),
      },
    ],
    options: {
      scales: {
        x: {
          ticks: {
            callback: (value) => value.slice(4),
          },
        },
      },
    },
  };

  return (
    <>
      {/* {JSON.stringify(fluctuation)} */}
      {/* <br></br> */}
      <div className="row">
        <p>
          {props.selection.from} to {props.selection.to} Chart{" "}
          <span
            style={{ color: fluctuation.chgPercentage < 0 ? "red" : "green" }}
          >
            {fluctuation.chgPercentage}%
          </span>{" "}
          {fluctuation.duration}
        </p>
      </div>
      <div className="row">
        <div className="col-sm-5"></div>
        <div className="col-sm-2">
          <button onClick={() => getGraphData(historyDate(-7, 0, 0), "1W")}>
            1W
          </button>
          <button onClick={() => getGraphData(historyDate(0, -1, 0), "1M")}>
            1M
          </button>
          <button onClick={() => getGraphData(historyDate(0, 0, -1), "1Y")}>
            1Y
          </button>
        </div>
        <div className="col-sm-5"></div>
      </div>
      <div className="row">
        <Line data={data}></Line>
      </div>
    </>
  );
};

export default Graph;
