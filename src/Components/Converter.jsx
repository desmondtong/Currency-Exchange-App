import React, { useState, useEffect, useRef } from "react";
import CurrencyCard from "./CurrencyCard";
import useGet from "../Hooks/useGet";

const Converter = (props) => {
  const dateRef = useRef();

  // state for API endpoints
  const [convert, setConvert] = useState({});

  // state
  const [reverse, setReverse] = useState(false);

  // function to call API
  const getData = useGet();

  const getConvert = async () => {
    const data = await getData(
      `convert?from=${props.selection.from}&to=${props.selection.to}&amount=${props.selection.amount}&date=${props.selection.date}`
    );
    setConvert(data);
  };

  // function
  const handleReverse = () => {
    let a, b;
    [a, b] = [props.selection.from, props.selection.to];
    props.setSelection((currState) => {
      return { ...currState, from: b, to: a };
    });
    setReverse(true);
  };

  const handleDate = () => {
    props.setSelection((currState) => {
      return { ...currState, date: dateRef.current.value };
    });
  };

  //use effect
  useEffect(() => {
    props.getCurrSymbol();
    props.getCryptoSymbol();
    console.log("useEff run");
  }, []);

  useEffect(() => {
    getConvert();
  }, [props.selection]);

  return (
    <>
      {JSON.stringify(convert)}
      <br></br>
      <br></br>
      {JSON.stringify(props.selection)}
      <br></br>
      <br></br>

      <div className="row">Converter</div>
      <div className="row">
        <div className="col-sm-5">
          <CurrencyCard
            currSymbol={props.currSymbol}
            cryptoSymbol={props.cryptoSymbol}
            setSelection={props.setSelection}
            selection={props.selection}
            setReverse={setReverse}
            reverse={reverse}
            convert={convert}
          ></CurrencyCard>
        </div>
        <div className="col-sm-2">
          <button onClick={handleReverse}>rev btn</button>
        </div>
        <div className="col-sm-5">
          <CurrencyCard
            currSymbol={props.currSymbol}
            cryptoSymbol={props.cryptoSymbol}
            setSelection={props.setSelection}
            selection={props.selection}
            setReverse={setReverse}
            reverse={reverse}
            convert={convert}
            to={true}
            disabled={true}
          ></CurrencyCard>
        </div>
      </div>
      <div className="row">
        <label className="col-sm-1">Date:</label>
        <input
          className="col-sm-4"
          type="date"
          defaultValue={props.todayDate}
          max={props.todayDate}
          ref={dateRef}
          onChange={handleDate}
        ></input>
      </div>
      <div className="row"></div>
    </>
  );
};

export default Converter;
