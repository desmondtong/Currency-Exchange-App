import React from "react";
import Converter from "../Components/Converter";
import Graph from "../Components/Graph";
import Watchlist from "../Components/Watchlist";
import Widget from "../Components/Widget";
import EmptyWidget from "../Components/EmptyWidget";

function Main(props) {
  return (
    <>
      {/* <div className="container"> */}
      <div className="row">
        <div className="col-sm-9">
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
          <div className="row padding-1 border shadow graph">
            <div className="col-sm-10">
              <Graph
                selection={props.selection}
                setSelection={props.setSelection}
                todayDate={props.todayDate}
                historyDate={props.historyDate}
                setWidgetInfo={props.setWidgetInfo}
                isDashboard={true}
              ></Graph>
            </div>
            <div className="col-sm-2">
              {props.widgetInfo.map((item, idx) => {
                return (
                  <Widget
                    key={idx}
                    id={idx}
                    sym={item.sym}
                    fluctuation={item.fluctuation}
                    data={item.data}
                    timeframe={item.timeframe}
                    setWidgetInfo={props.setWidgetInfo}
                    setSelection={props.setSelection}
                  ></Widget>
                );
              })}
              {Array.from("1".repeat(4 - props.widgetInfo.length)).map(
                (item, idx) => {
                  return <EmptyWidget key={idx}></EmptyWidget>;
                }
              )}
            </div>
          </div>
        </div>
        <div className="col-sm-3 border shadow">
          <Watchlist
            todayDate={props.todayDate}
            historyDate={props.historyDate}
            currSymbol={props.currSymbol}
            emojiFlags={props.emojiFlags}
          ></Watchlist>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default Main;
