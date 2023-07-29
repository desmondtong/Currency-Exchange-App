import React, { useState, useEffect } from "react";
import CurrencyCard from "./CurrencyCard";
import useGet from "../Hooks/useGet";

const Converter = () => {
  const [currSymbol, setcurrSymbol] = useState({});
  const [cryptoSymbol, setCryptoSymbol] = useState({});
  const [selection, setSelection] = useState({ from: "", to: "" });

  const getData = useGet();

  const getCurrSymbol = async () => {
    const data = await getData("symbols");
    setcurrSymbol(data.symbols);
  };

  const getCryptoSymbol = async () => {
    const data = await getData("cryptocurrencies");
    setCryptoSymbol(data.cryptocurrencies);
  };

  const reverseSym = () => {
    console.log("clicked");
  };

  useEffect(() => {
    getCurrSymbol();
    getCryptoSymbol();
    console.log("useEff run");
  }, []);

  return (
    <>
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
          ></CurrencyCard>
        </div>
      </div>
      <div className="row"></div>
    </>
  );
};

export default Converter;
