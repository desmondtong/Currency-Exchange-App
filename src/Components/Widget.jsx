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
  const handleDisplay = () => {
    props.setSelection((currState) => {
      return {
        ...currState,
        from: props.sym.slice(0, 3),
        to: props.sym.slice(4),
        timeframe: props.timeframe,
      };
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
  props.data.datasets[0].borderColor = "white";
  props.data.datasets[0].fill = true;
  props.data.datasets[0].backgroundColor = "rgba(255,255,255,0.2)";

  const data = () => {
    return props.data;
  };

  return (
    <>
      <div className="row widget widget-hover border">
        <div className="row widget-item">
          <div className="col-sm-9 widget-sym">
            {props.sym}
            <br></br>
            <span
              style={{
                color: props.fluctuation < 0 ? "red" : "green",
              }}
            >
              {props.fluctuation}%
            </span>
            ({props.timeframe})
          </div>
          <button
            className="col-sm-1 btn remove-btn btn-outline-danger"
            id={props.id}
            onClick={handleDel}
          >
            -
          </button>
        </div>
        <div className="widget-item-2" onClick={handleDisplay}>
          <Line data={data()} options={options}></Line>
        </div>
      </div>
    </>
  );
};

export default Widget;
