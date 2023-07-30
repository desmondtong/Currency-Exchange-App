import React, { useEffect, useState, useRef } from "react";

const CurrencyCard = (props) => {
  const selectRef = useRef();

  const [option, setOption] = useState("AED");

  const handleOption = (event) => {
    setOption(event.target.value);
  };

  const handleSelection = () => {
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

  const handleReverse = () => {
    selectRef.current.value = props.to
      ? props.selection.to
      : props.selection.from;
  };

  useEffect(() => {
    handleSelection();
  }, [option]);

  useEffect(() => {
    {
      props.reverse && handleReverse();
    }
    props.setReverse(false);
  }, [props.reverse]);

  return (
    <>
      <div className="row">
        <select defaultValue={"SGD"} onChange={handleOption} ref={selectRef}>
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
