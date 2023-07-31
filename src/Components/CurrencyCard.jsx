import React, { useEffect, useRef } from "react";

const CurrencyCard = (props) => {
  const selectRef = useRef();
  const inputRef = useRef();

  const handleSelection = () => {
    if (props.to) {
      props.setSelection((currState) => {
        return { ...currState, to: selectRef.current.value };
      });
    } else {
      props.setSelection((currState) => {
        return {
          ...currState,
          from: selectRef.current.value,
          amount: inputRef.current.value,
        };
      });
    }
  };

  const handleReverse = () => {
    selectRef.current.value = props.to
      ? props.selection.to
      : props.selection.from;
  };

  const handleDisplayConvert = () => {
    if (props.to) inputRef.current.value = props.convert.result;
  };

  // why not working?
  // useEffect(() => {
  //   selectRef.current.defaultValue = props.to ? "MYR" : "SGD";
  //   console.log("set default");
  // }, []);

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

  return (
    <>
      <div className="row">
        <select onChange={handleSelection} ref={selectRef}>
          {Object.keys(props.currSymbol).map((item, idx) => {
            return <option key={idx} value={item}>{`${item}`}</option>;
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
        ></input>
      </div>
    </>
  );
};

export default CurrencyCard;
