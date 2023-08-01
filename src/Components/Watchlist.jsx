import React, { useEffect, useState } from "react";
import useGet from "../Hooks/useGet";

const Watchlist = (props) => {
  // state for API endpoints (GET)
  const [watchlist, setWatchlist] = useState({});

  // state
  const [baseCurr, setBaseCurr] = useState("SGD");
  const [favCurr, setFavCurr] = useState(["USD", "EUR", "JPY", "MYR"]);

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
  }, []);

  return (
    <>
      <div className="row padding-3">
        <div className="col-sm-9">
          <h4>Watchlist</h4>
        </div>
        <div className="col-sm-3">
          <button>Edit</button>
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
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Watchlist;
