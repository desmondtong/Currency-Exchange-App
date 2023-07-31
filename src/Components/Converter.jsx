import React, { useState, useEffect, useRef } from "react";
import CurrencyCard from "./CurrencyCard";
import useGet from "../Hooks/useGet";

const todayDate = new Date().toISOString().split("T")[0];

const Converter = () => {
  const dateRef = useRef();

  // state for API endpoints
  const [currSymbol, setcurrSymbol] = useState({});
  const [cryptoSymbol, setCryptoSymbol] = useState({});
  const [convert, setConvert] = useState({});

  // state
  const [selection, setSelection] = useState({
    from: "AED",
    to: "AED",
    amount: 1,
    date: todayDate,
  });
  const [reverse, setReverse] = useState(false);

  // function to call API
  const getData = useGet();

  const getCurrSymbol = async () => {
    const data = await getData("symbols");
    setcurrSymbol(data.symbols);
  };

  const getCryptoSymbol = async () => {
    const data = await getData("cryptocurrencies");
    setCryptoSymbol(data.cryptocurrencies);
  };

  const getConvert = async () => {
    const data = await getData(
      `convert?from=${selection.from}&to=${selection.to}&amount=${selection.amount}&date=${selection.date}`
    );
    setConvert(data);
  };

  // function
  const handleReverse = () => {
    let a, b;
    [a, b] = [selection.from, selection.to];
    setSelection((currState) => {
      return { ...currState, from: b, to: a };
    });
    setReverse(true);
  };

  const handleDate = () => {
    setSelection((currState) => {
      return { ...currState, date: dateRef.current.value };
    });
  };

  //use effect
  useEffect(() => {
    getCurrSymbol();
    getCryptoSymbol();
    console.log("useEff run");
  }, []);

  useEffect(() => {
    getConvert();
  }, [selection]);

  return (
    <>
      {JSON.stringify(convert)}
      <br></br>
      {JSON.stringify(selection)}
      <div className="row">Converter</div>
      <div className="row">
        <div className="col-sm-5">
          <CurrencyCard
            currSymbol={currSymbol}
            cryptoSymbol={cryptoSymbol}
            setSelection={setSelection}
            selection={selection}
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
            currSymbol={currSymbol}
            cryptoSymbol={cryptoSymbol}
            setSelection={setSelection}
            selection={selection}
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
          defaultValue={todayDate}
          max={todayDate}
          ref={dateRef}
          onChange={handleDate}
        ></input>
      </div>
      <div className="row"></div>
    </>
  );
};

export default Converter;
