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

  const getGraphData = async (timeframe) => {
    // calculate start date
    let startDate;
    if (timeframe === "1W") {
      startDate = props.historyDate(-7, 0, 0);
    } else if (timeframe === "1M") {
      startDate = props.historyDate(0, -1, 0);
    } else {
      startDate = props.historyDate(0, 0, -1);
    }

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
    setFluctuation({ chgPercentage, timeframe });
  };

  // function
  const handleTimeFrame = (event) => {
    props.setSelection((currState) => {
      return { ...currState, timeframe: event.target.name };
    });
  };

  const handleAddWidget = () => {
    props.setWidgetInfo((currState) => {
      if (
        currState.some((item) => {
          return item.sym == `${props.selection.from}/${props.selection.to}`;
        })
      ) {
        alert(
          `${props.selection.from}/${props.selection.to} is already added!`
        );
        return [...currState];
      } else {
        return [
          ...currState,
          {
            sym: `${props.selection.from}/${props.selection.to}`,
            fluctuation: fluctuation.chgPercentage,
            data: data,
          },
        ];
      }
    });
  };

  // useEffect
  useEffect(() => {
    getGraphData(props.selection.timeframe);
  }, [props.selection]);

  // graph chart data & options
  const data = {
    labels: timeSeries.map((item) => item.date.slice(4)),
    datasets: [
      {
        data: timeSeries.map((item) => item.rate),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <>
      {/* {JSON.stringify(timeSeries)} */}
      {/* <br></br> */}
      <div className="row">
        <div className="col-sm-10">
          <h4>
            {props.selection.from} to {props.selection.to} Chart{" "}
            <span
              style={{ color: fluctuation.chgPercentage < 0 ? "red" : "green" }}
            >
              {fluctuation.chgPercentage}%
            </span>{" "}
            {fluctuation.timeframe}
          </h4>
        </div>
        <button
          className="col-sm-1 timeframe-btn btn btn-outline-secondary"
          onClick={handleAddWidget}
        >
          +
        </button>
        <button className="col-sm-1 timeframe-btn btn btn-outline-secondary">
          FC
        </button>
      </div>
      <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-4 centered">
          <button
            className="timeframe-btn btn btn-outline-secondary"
            name={"1W"}
            onClick={handleTimeFrame}
          >
            1W
          </button>
          <button
            className="timeframe-btn btn btn-outline-secondary"
            name={"1M"}
            onClick={handleTimeFrame}
          >
            1M
          </button>
          <button
            className="timeframe-btn btn btn-outline-secondary"
            name={"1Y"}
            onClick={handleTimeFrame}
          >
            1Y
          </button>
        </div>
        <div className="col-sm-4"></div>
      </div>
      <div className="row">
        <Line data={data} options={options}></Line>
      </div>
    </>
  );
};

export default Graph;
