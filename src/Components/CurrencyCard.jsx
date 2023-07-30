import React, { useEffect, useState } from "react";

const CurrencyCard = (props) => {
  const [option, setOption] = useState("AED");

  const handleOption = (event) => {
    setOption(event.target.value);
  };

  const selection = () => {
    if (props.to) {
      props.setSelection((currState) => {
        return { ...currState, to: option };
      });
    } else {
      props.setSelection((currState) => {
        return { ...currState, from: option };
      });
    }
  };

  useEffect(() => {
    selection();
  }, [option]);

  return (
    <>
      <div className="row">
        <select defaultValue={"SGD"} onChange={handleOption}>
          {Object.keys(props.currSymbol).map((item, idx) => {
            return <option key={idx} value={item}>{`${item}`}</option>;
          })}
        </select>
      </div>
      <div className="row">
        <input disabled={props.disabled}></input>
      </div>
    </>
  );
};

export default CurrencyCard;
