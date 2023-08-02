import React, { useEffect, useRef, useState } from "react";

const CurrencyCard = (props) => {
  const inputRef = useRef();

  // state
  const init = props.to ? props.selection.to : props.selection.from;
  const [currSelect, setCurrSelect] = useState(init);

  const handleSelect = (event) => {
    setCurrSelect(event.target.value);
  };

  const handleSelection = () => {
    if (props.to) {
      props.setSelection((currState) => {
        return { ...currState, to: currSelect };
      });
    } else {
      props.setSelection((currState) => {
        return {
          ...currState,
          from: currSelect,
          amount: inputRef.current.value,
        };
      });
    }
  };

  const handleReverse = () => {
    setCurrSelect(props.to ? props.selection.to : props.selection.from);
  };

  const handleDisplayConvert = () => {
    if (props.to) inputRef.current.value = props.convert.result;
  };

  // to reverse symbol after button clicked
  useEffect(() => {
    {
      props.reverse && handleReverse();
    }
    props.setReverse(false);
  }, [props.reverse]);

  // to display converted rate
  useEffect(() => {
    handleDisplayConvert();
  }, [props.convert.result]);

  useEffect(() => {
    handleSelection();
  }, [currSelect]);

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

  return (
    <>
      <div className="row">
        <select
          value={currSelect}
          onChange={handleSelect}
          className="boxes boxes-h"
        >
          {Object.values(props.currSymbol).map((item, idx) => {
            return (
              <option key={idx} value={item.code}>
                {`${item.code} - ${item.description} ${emojiFlags[item.code]}`}
              </option>
            );
          })}
        </select>
      </div>
      <div className="row">
        <input
          type="number"
          disabled={props.disabled}
          defaultValue={1}
          ref={inputRef}
          onChange={handleSelection}
          className={props.to ? "boxes" : "boxes boxes-h"}
        ></input>
      </div>
    </>
  );
};

export default CurrencyCard;
