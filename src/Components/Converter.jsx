import React, { useState, useEffect } from "react";
import CurrencyCard from "./CurrencyCard";
import useGet from "../Hooks/useGet";

const todayDate = new Date().toISOString().split("T")[0];

const Converter = () => {
  // state for API endpoints
  const [currSymbol, setcurrSymbol] = useState({});
  const [cryptoSymbol, setCryptoSymbol] = useState({});
  const [convert, setConvert] = useState({});

  // state
  const [selection, setSelection] = useState({
    from: "AED",
    to: "AED",
    amount: 1,
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
      `convert?from=${selection.from}&to=${selection.to}&amount=${selection.amount}`
    );
    setConvert(data);
  };

  // function
  const reverseSym = () => {
    let a, b;
    [a, b] = [selection.from, selection.to];
    setSelection((currState) => {
      return { ...currState, from: b, to: a };
    });
    setReverse(true);
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
          <button onClick={reverseSym}>rev btn</button>
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
        ></input>
      </div>
      <div className="row"></div>
    </>
  );
};

export default Converter;
