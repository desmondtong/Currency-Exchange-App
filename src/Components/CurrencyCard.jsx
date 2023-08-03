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

  return (
    <>
      <div className="row">
        <select
          value={currSelect}
          onChange={handleSelect}
          className="boxes boxes-h select"
        >
          {Object.values(props.currSymbol).map((item, idx) => {
            return (
              <option key={idx} value={item.code}>
                {`${item.code} - ${item.description} ${props.emojiFlags[item.code]}`}
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
