import React, { useState, useEffect } from "react";
import CurrencyCard from "./CurrencyCard";
import useGet from "../Hooks/useGet";

const Converter = () => {
  // state for API endpoints
  const [currSymbol, setcurrSymbol] = useState({});
  const [cryptoSymbol, setCryptoSymbol] = useState({});
  const [convert, setConvert] = useState({});

  const [selection, setSelection] = useState({ from: "AED", to: "AED" });

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
      `convert?from=${selection.from}&to=${selection.to}`
    );
    setConvert(data);
  };

  const reverseSym = () => {
    console.log("clicked");
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
      <div className="row">Date selection</div>
      <div className="row">
        <div className="col-sm-5">
          <CurrencyCard
            currSymbol={currSymbol}
            cryptoSymbol={cryptoSymbol}
            setSelection={setSelection}
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
            to={true}
            disabled={true}
          ></CurrencyCard>
        </div>
      </div>
      <div className="row"></div>
    </>
  );
};

export default Converter;
