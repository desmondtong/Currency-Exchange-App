import React, { useEffect, useState, useRef } from "react";
import useGet from "../Hooks/useGet";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const Watchlist = (props) => {
  const selectRef = useRef();

  // state for API endpoints (GET)
  const [watchlist, setWatchlist] = useState({});
  const [timeSeries, setTimeSeries] = useState({});

  // state
  const [baseCurr, setBaseCurr] = useState("SGD");
  const [favCurr, setFavCurr] = useState(["USD", "EUR", "JPY", "MYR"]);
  const [isEdit, setIsEdit] = useState(false);

  const [openAdd, setOpenAdd] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [openRepeat, setOpenRepeat] = useState(false);

  // function
  const handleFavCurr = (event, isRemove = false) => {
    if (isRemove) {
      console.log(event.target.id);
      setFavCurr((currState) => {
        return [...currState].toSpliced(event.target.id, 1);
      });
      setOpenDel(true);
    } else {
      if (favCurr.includes(selectRef.current.value)) {
        setOpenRepeat(true);
      } else {
        setFavCurr((currState) => {
          return [...currState, selectRef.current.value];
        });
        setOpenAdd(true);
      }
    }
  };

  const handleBaseCurr = (event) => {
    // update baseCurr to clicked symbol
    setBaseCurr(favCurr[event.target.id]);

    // remove the clicked symbol
    setFavCurr((currState) => {
      return [...currState].toSpliced(event.target.id, 1);
    });

    // add current baseCurr to favCurr
    setFavCurr((currState) => {
      return [...currState, baseCurr];
    });
  };

  const handleEdit = () => {
    setIsEdit((currState) => {
      return !currState;
    });
  };

  // snackbar
  const handleCloseAdd = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAdd(false);
  };

  const handleCloseDel = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenDel(false);
  };

  const handleCloseRepeat = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenRepeat(false);
  };

  // function to call API
  const getData = useGet();

  const getWatchlistData = async () => {
    // get rate
    const dataRate = await getData(
      `latest?base=${baseCurr}&symbols=${favCurr}`
    );

    // get fluctuation
    const dataFluc = await getData(
      `fluctuation?start_date=${props.historyDate(0, 0, -1)}&end_date=${
        props.todayDate
      }&base=${baseCurr}&symbols=${favCurr}`
    );

    // get time-series
    favCurr.forEach((item) => {
      getTimeSeries(baseCurr, item);
    });

    // create data structure for setWatchlist
    const obj = favCurr.reduce((acc, item) => {
      const flucRoundUp =
        Math.ceil(dataFluc.rates[item].change_pct * -10000) / 100;
      const rateRoundUp = Math.ceil(dataRate.rates[item] * 100) / 100;

      acc[item] = {
        rate: rateRoundUp,
        fluctuation: flucRoundUp,
      };
      return acc;
    }, {});

    setWatchlist(obj);
  };

  const getTimeSeries = async (base, sym) => {
    const dataTimeSeries = await getData(
      `timeseries?start_date=${props.historyDate(0, 0, -1)}&end_date=${
        props.todayDate
      }&base=${base}&symbols=${sym}`
    );

    const data = Object.entries(dataTimeSeries.rates).map((item) => {
      return {
        date: new Date(item[0]).toDateString(),
        rate: item[1][sym],
      };
    });

    setTimeSeries((currState) => {
      return { ...currState, [sym]: data };
    });
  };

  useEffect(() => {
    getWatchlistData();
  }, [favCurr]);

  // graph chart data & options
  const dataObj = favCurr.reduce((acc, item) => {
    acc[item] = {
      labels: timeSeries[item]?.map((item) => item.date.slice(4)),
      datasets: [
        {
          label: "abc",
          data: timeSeries[item]?.map((item) => item.rate),
          borderColor: watchlist[item]?.fluctuation < 0 ? "red" : "green",
          borderWidth: 1.5,
        },
      ],
    };
    return acc;
  }, {});

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

  return (
    <>
      {/* {JSON.stringify(watchlist)} */}
      {/* {JSON.stringify(dataObj)} */}
      <div className="row padding-tb">
        <div className="col-sm-9">
          <h4>Exchange Rate Watchlist</h4>
        </div>
        <div className="col-sm-3">
          <button
            className="edit-btn btn btn-outline-primary"
            onClick={handleEdit}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </div>
      </div>
      <div className="row base-currency">
        <div className="col-sm-3">{baseCurr}</div>
        <div className="col-sm-3"></div>
        <div className="col-sm-3"></div>
        <div className="col-sm-3"></div>
      </div>

      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <div className="row header">
            <div className="col-sm-2">Sym.</div>
            <div className="col-sm-3">Rate</div>
            <div className="col-sm-7">Change% (1Y)</div>
          </div>
        </li>
        <div className="scroll">
          {favCurr.map((item, idx) => {
            return (
              <li
                className={
                  idx % 2
                    ? "list-group-item list-group-item-action list-group-item-secondary"
                    : "list-group-item list-group-item-action list-group-item-light"
                }
                key={idx}
              >
                <div className="row fav-currency">
                  <div
                    className={isEdit ? "col-sm-2" : "col-sm-2"}
                    id={idx}
                    onClick={handleBaseCurr}
                  >
                    {`${props.emojiFlags[item]} ${item}`}
                  </div>
                  <div className={isEdit ? "col-sm-2" : "col-sm-3"}>
                    {watchlist[item]?.rate}
                  </div>
                  <div
                    className={isEdit ? "col-sm-2" : "col-sm-2"}
                    style={{
                      color: watchlist[item]?.fluctuation < 0 ? "red" : "green",
                    }}
                  >
                    {watchlist[item]?.fluctuation}
                  </div>
                  <div className="col-sm-4">
                    <Line data={dataObj[item]} options={options}></Line>
                  </div>

                  {isEdit && (
                    <button
                      className="col-sm-1 del-btn btn btn-danger"
                      onClick={(event) => handleFavCurr(event, true)}
                      id={idx}
                    >
                      -
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </div>
        <li className="list-group-item">
          <div className="row fav-currency">
            <select className="col-sm-3" ref={selectRef}>
              {Object.values(props.currSymbol).map((item, idx) => {
                return (
                  <option key={idx} value={item.code}>
                    {item.code}
                  </option>
                );
              })}
            </select>
            <div className="col-sm-7"></div>
            <button
              className="col-sm-2 del-btn btn btn-outline-success"
              onClick={(event) => handleFavCurr(event)}
            >
              +
            </button>
            <Snackbar
              open={openAdd}
              autoHideDuration={3000}
              onClose={handleCloseAdd}
            >
              <Alert
                onClose={handleCloseAdd}
                severity="success"
                sx={{ width: "300px" }}
              >
                Symbol successfully added!
              </Alert>
            </Snackbar>
            <Snackbar
              open={openDel}
              autoHideDuration={3000}
              onClose={handleCloseDel}
            >
              <Alert
                onClose={handleCloseDel}
                severity="success"
                sx={{ width: "300px" }}
              >
                Symbol successfully removed!
              </Alert>
            </Snackbar>
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
          </div>
        </li>
      </ul>
    </>
  );
};

export default Watchlist;
