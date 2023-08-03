import React from "react";
import Converter from "../Components/Converter";
import ConverterCard from "../Components/ConverterCard";

const FullConverter = (props) => {
  return (
    <>
      <div className="row padding-1 border shadow">
        <Converter
          currSymbol={props.currSymbol}
          getCurrSymbol={props.getCurrSymbol}
          selection={props.selection}
          setSelection={props.setSelection}
          todayDate={props.todayDate}
          emojiFlags={props.emojiFlags}
          convert={props.convert}
          getConvert={props.getConvert}
        ></Converter>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <ConverterCard
            from={props.selection.from}
            to={props.selection.to}
            currSymbol={props.currSymbol}
            emojiFlags={props.emojiFlags}
            convert={props.convert.result}
          ></ConverterCard>
        </div>
        <div className="col-sm-6">
          <ConverterCard
            from={props.selection.to}
            to={props.selection.from}
            currSymbol={props.currSymbol}
            emojiFlags={props.emojiFlags}
            convert={1/(props.convert.result)}
          ></ConverterCard>
        </div>
      </div>
    </>
  );
};

export default FullConverter;
