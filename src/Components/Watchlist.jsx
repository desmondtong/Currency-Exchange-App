import React, { useEffect, useState, useRef } from "react";
import useGet from "../Hooks/useGet";

const Watchlist = (props) => {
  const selectRef = useRef();

  // state for API endpoints (GET)
  const [watchlist, setWatchlist] = useState({});

  // state
  const [baseCurr, setBaseCurr] = useState("SGD");
  const [favCurr, setFavCurr] = useState(["USD", "EUR", "JPY", "MYR"]);

  // function
  const handleFavCurr = (isRemove) => {
    if (isRemove) {
      console.log("REMOVE");
    } else {
      setFavCurr((currState) => {
        return [...currState, selectRef.current.value];
      });
    }
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

  useEffect(() => {
    getWatchlistData();
  }, [favCurr]);

  return (
    <>
      <div className="row padding-3">
        <div className="col-sm-9">
          <h4>Watchlist</h4>
        </div>
        <div className="col-sm-3">
          <button className="timeframe-btn btn btn-outline-secondary">
            Edit
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-3">Currency</div>
        <div className="col-sm-3">Rate</div>
        <div className="col-sm-6">{"Change%(1Y)"}</div>
      </div>
      <div className="row base-currency">
        <div className="col-sm-3">{baseCurr}</div>
        <div className="col-sm-3"></div>
        <div className="col-sm-3"></div>
        <div className="col-sm-3"></div>
      </div>

      <ul className="list-group list-group-flush">
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
                  className="col-sm-3"
                  onClick={(event) => console.log(event.target.textContent)}
                >
                  {item}
                </div>
                <div className="col-sm-3">{watchlist[item]?.rate}</div>
                <div
                  className="col-sm-3"
                  style={{
                    color: watchlist[item]?.fluctuation < 0 ? "red" : "green",
                  }}
                >
                  {watchlist[item]?.fluctuation}
                </div>
                <div className="col-sm-3">graph</div>
                <button
                  className="col-sm-1 del-btn btn btn-outline-danger"
                  onClick={() => handleFavCurr(true)}
                >
                  -
                </button>
              </div>
            </li>
          );
        })}
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
              className="col-sm-2 timeframe-btn btn btn-outline-success"
              onClick={() => handleFavCurr(false)}
            >
              +
            </button>
          </div>
        </li>
      </ul>
    </>
  );
};

export default Watchlist;
