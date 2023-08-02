import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const Widget = (props) => {
  // function
  const handleDel = (event) => {
    props.setWidgetInfo((currState) => {
      return [...currState].toSpliced(event.target.id, 1);
    });
  };

  // graph chart options & data
  const options = {
    responsive: true,
    events: [],
    plugins: {
      legend: {
        display: false,
      },
    },
    // remove point/dot from line chart
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      // remove x-axis labels
      x: {
        ticks: {
          display: false,
        },

        // remove x-axis grid
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      // remove y-axis labels
      y: {
        ticks: {
          display: false,
          beginAtZero: true,
        },
        // remove y-axis grid
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
  };

  // add BorderColor
  props.data.datasets[0].borderColor = "purple";
  props.data.datasets[0].fill = true;
  props.data.datasets[0].backgroundColor = "lightgrey";

  const data = () => {
    return props.data;
  };

  return (
    <>
      {/* {JSON.stringify(props.widgetInfo)} */}
      <div className="row widget border">
        <div className="row widget-item">
          <div className="col-sm-9">
            {props.sym}
            <br></br>
            <span
              style={{
                color: props.fluctuation < 0 ? "red" : "green",
              }}
            >
              {props.fluctuation}%
            </span>
          </div>
          <button
            className="col-sm-1 btn del-btn remove-btn btn-outline-danger"
            id={props.id}
            onClick={handleDel}
          >
            -
          </button>
        </div>
        <div className="widget-item-2">
          <Line data={data()} options={options}></Line>
        </div>
      </div>
    </>
  );
};

export default Widget;
