import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import useGet from "./Hooks/useGet";
import NavBar from "./Components/NavBar";
import Main from "./Pages/Main";
import FullGraph from "./Pages/FullGraph";
import About from "./Pages/About";
import FullConverter from "./Pages/FullConverter";

const App = () => {
  const defaultCurrency = { from: "SGD", to: "MYR" };
  const todayDate = new Date().toISOString().split("T")[0];
  const emojiFlags = {
    AED: "🇦🇪",
    AFN: "🇦🇫",
    ALL: "🇦🇱",
    AMD: "🇦🇲",
    ANG: "🇳🇱",
    AOA: "🇦🇴",
    ARS: "🇦🇷",
    AUD: "🇦🇺",
    AWG: "🇦🇼",
    AZN: "🇦🇿",
    BAM: "🇧🇦",
    BBD: "🇧🇧",
    BDT: "🇧🇩",
    BGN: "🇧🇬",
    BIF: "🇧🇮",
    BMD: "🇧🇲",
    BND: "🇧🇳",
    BOB: "🇧🇴",
    BRL: "🇧🇷",
    BSD: "🇧🇸",
    BWP: "🇧🇼",
    BYN: "🇧🇾",
    BZD: "🇧🇿",
    CAD: "🇨🇦",
    CDF: "🇨🇩",
    CHF: "🇨🇭",
    CLP: "🇨🇱",
    CNY: "🇨🇳",
    COP: "🇨🇴",
    CRC: "🇨🇷",
    CVE: "🇨🇻",
    CZK: "🇨🇿",
    DJF: "🇩🇯",
    DKK: "🇩🇰",
    DOP: "🇩🇴",
    DZD: "🇩🇿",
    EGP: "🇪🇬",
    ETB: "🇪🇹",
    EUR: "🇪🇺",
    FJD: "🇫🇯",
    FKP: "🇫🇰",
    GBP: "🇬🇧",
    GEL: "🇬🇪",
    GIP: "🇬🇮",
    GMD: "🇬🇲",
    GNF: "🇬🇳",
    GTQ: "🇬🇹",
    GYD: "🇬🇾",
    HKD: "🇭🇰",
    HNL: "🇭🇳",
    HRK: "🇭🇷",
    HTG: "🇭🇹",
    HUF: "🇭🇺",
    IDR: "🇮🇩",
    ILS: "🇮🇱",
    INR: "🇮🇳",
    ISK: "🇮🇸",
    JMD: "🇯🇲",
    JPY: "🇯🇵",
    KES: "🇰🇪",
    KGS: "🇰🇬",
    KHR: "🇰🇭",
    KMF: "🇰🇲",
    KRW: "🇰🇷",
    KYD: "🇰🇾",
    KZT: "🇰🇿",
    LAK: "🇱🇦",
    LBP: "🇱🇧",
    LKR: "🇱🇰",
    LRD: "🇱🇷",
    LSL: "🇱🇸",
    MAD: "🇲🇦",
    MDL: "🇲🇩",
    MGA: "🇲🇬",
    MKD: "🇲🇰",
    MMK: "🇲🇲",
    MNT: "🇲🇳",
    MOP: "🇲🇴",
    MRO: "🇲🇷",
    MUR: "🇲🇺",
    MVR: "🇲🇻",
    MWK: "🇲🇼",
    MXN: "🇲🇽",
    MYR: "🇲🇾",
    MZN: "🇲🇿",
    NAD: "🇳🇦",
    NGN: "🇳🇬",
    NIO: "🇳🇮",
    NOK: "🇳🇴",
    NPR: "🇳🇵",
    NZD: "🇳🇿",
    PAB: "🇵🇦",
    PEN: "🇵🇪",
    PGK: "🇵🇬",
    PHP: "🇵🇭",
    PKR: "🇵🇰",
    PLN: "🇵🇱",
    PYG: "🇵🇾",
    QAR: "🇶🇦",
    RON: "🇷🇴",
    RSD: "🇷🇸",
    RUB: "🇷🇺",
    RWF: "🇷🇼",
    SAR: "🇸🇦",
    SBD: "🇸🇧",
    SCR: "🇸🇨",
    SEK: "🇸🇪",
    SGD: "🇸🇬",
    SHP: "🇸🇭",
    SLL: "🇸🇱",
    SOS: "🇸🇴",
    SRD: "🇸🇷",
    STD: "🇸🇹",
    SZL: "🇸🇿",
    THB: "🇹🇭",
    TJS: "🇹🇯",
    TOP: "🇹🇴",
    TRY: "🇹🇷",
    TTD: "🇹🇹",
    TWD: "🇹🇼",
    TZS: "🇹🇿",
    UAH: "🇺🇦",
    UGX: "🇺🇬",
    USD: "🇺🇸",
    UYU: "🇺🇾",
    UZS: "🇺🇿",
    VND: "🇻🇳",
    VUV: "🇻🇺",
    WST: "🇼🇸",
    XAF: "🇨🇲",
    XCD: "🇦🇮",
    XOF: "🇧🇯",
    XPF: "🇵🇫",
    YER: "🇾🇪",
    ZAR: "🇿🇦",
    ZMW: "🇿🇲",
    ZWL: "🇿🇼",
    BHD: "🇧🇭",
    BTN: "🇧🇹",
    CLF: "🇨🇱",
    CNH: "🇨🇳",
    CUC: "🇨🇺",
    CUP: "🇨🇺",
    ERN: "🇪🇷",
    GGP: "🇬🇬",
    GHS: "🇬🇭",
    IMP: "🇮🇲",
    IQD: "🇮🇶",
    IRR: "🇮🇷",
    JEP: "🇯🇪",
    JOD: "🇯🇴",
    KPW: "🇰🇵",
    KWD: "🇰🇼",
    OMR: "🇴🇲",
    LYD: "🇱🇾",
    MRU: "🇲🇷",
    SDG: "🇸🇩",
    SSP: "🇸🇸",
    STN: "🇸🇹",
    SVC: "🇸🇻",
    SYP: "🇸🇾",
    TMT: "🇹🇲",
    TND: "🇹🇳",
    VEF: "🇻🇪",
    VES: "🇻🇪",
    XAG: "🏳",
    XAU: "🏳",
    XDR: "🏳",
    XPD: "🏳",
    XPT: "🏳",
    BTC: "🏳",
  };

  // state for API endpoints (GET)
  const [currSymbol, setcurrSymbol] = useState({});
  const [convert, setConvert] = useState({ result: 1 });

  // state
  const [selection, setSelection] = useState({
    from: defaultCurrency.from,
    to: defaultCurrency.to,
    amount: 1,
    date: todayDate,
    timeframe: "1Y",
  });
  const [widgetInfo, setWidgetInfo] = useState([]);

  // function to call API
  const getData = useGet();

  const getConvert = async () => {
    const data = await getData(
      `convert?from=${selection.from}&to=${selection.to}&amount=${selection.amount}&date=${selection.date}`
    );
    setConvert(data);
  };

  const getCurrSymbol = async () => {
    const data = await getData("symbols");
    setcurrSymbol(data.symbols);
  };

  // subtract date
  const historyDate = (days, months, years) => {
    var date = new Date();
    date.setDate(date.getDate() + days);
    date.setMonth(date.getMonth() + months);
    date.setFullYear(date.getFullYear() + years);
    return date.toISOString().split("T")[0];
  };

  return (
    <>
      <NavBar></NavBar>
      {/* {JSON.stringify(selection)} */}
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <Main
                todayDate={todayDate}
                selection={selection}
                setSelection={setSelection}
                historyDate={historyDate}
                widgetInfo={widgetInfo}
                setWidgetInfo={setWidgetInfo}
                currSymbol={currSymbol}
                getCurrSymbol={getCurrSymbol}
                emojiFlags={emojiFlags}
                convert={convert}
                getConvert={getConvert}
              />
            }
          ></Route>
          <Route
            path="/converter"
            element={
              <FullConverter
                currSymbol={currSymbol}
                getCurrSymbol={getCurrSymbol}
                selection={selection}
                setSelection={setSelection}
                todayDate={todayDate}
                emojiFlags={emojiFlags}
                convert={convert}
                getConvert={getConvert}
              />
            }
          ></Route>
          <Route
            path="/graph"
            element={
              <FullGraph
                selection={selection}
                setSelection={setSelection}
                todayDate={todayDate}
                historyDate={historyDate}
                setWidgetInfo={setWidgetInfo}
              />
            }
          ></Route>
          <Route path="/about-me" element={<About />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
