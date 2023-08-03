import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import useGet from "../Hooks/useGet";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";

const Graph = (props) => {
  // state for API endpoints (GET)
  const [timeSeries, setTimeSeries] = useState([]);
  const [fluctuation, setFluctuation] = useState({});

  // state
  const [openRepeat, setOpenRepeat] = useState(false);

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
          return (
            (item.sym == `${props.selection.from}/${props.selection.to}`) &
            (item.timeframe == props.selection.timeframe)
          );
        })
      ) {
        // alert(
        //   `${props.selection.from}/${props.selection.to} is already added!`
        // );
        setOpenRepeat(true);
        return [...currState];
      } else {
        // control to max 4 widget
        const arr = [...currState];
        arr.length === 4 && arr.shift();
        // add selection to widgets
        return [
          ...arr,
          {
            sym: `${props.selection.from}/${props.selection.to}`,
            fluctuation: fluctuation.chgPercentage,
            data: data,
            timeframe: props.selection.timeframe,
          },
        ];
      }
    });
  };

  const handleCloseRepeat = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenRepeat(false);
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
        borderColor: "rgba(149, 181, 209, 1)",
        borderWidth: 1,
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
              style={{
                color: fluctuation.chgPercentage < 0 ? "red" : "green",
              }}
            >
              {fluctuation.chgPercentage}%
            </span>{" "}
            {fluctuation.timeframe}
          </h4>
        </div>
        {/* button only in dashboard */}
        {props.isDashboard && (
          <>
            <button
              className="col-sm-1 timeframe-btn btn btn-outline-secondary"
              onClick={handleAddWidget}
            >
              +
            </button>
            <a
              className="col-sm-1 timeframe-btn btn btn-outline-secondary"
              href="/graph"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
            </a>
          </>
        )}
        {/* last updated text only in Chart tab */}
        {!props.isDashboard && (
          <p className="col-sm-2 last-update">
            {`Last updated ${props.todayDate}`}
          </p>
        )}
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
      <Snackbar
        open={openRepeat}
        autoHideDuration={3000}
        onClose={handleCloseRepeat}
      >
        <Alert
          onClose={handleCloseRepeat}
          severity="warning"
          sx={{ width: "300px" }}
        >
          Item already exist!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Graph;
