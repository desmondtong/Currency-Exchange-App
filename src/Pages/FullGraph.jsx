import React from "react";
import Graph from "../Components/Graph";

const FullGraph = (props) => {
  return (
    <>
      <Graph
        selection={props.selection}
        setSelection={props.setSelection}
        todayDate={props.todayDate}
        historyDate={props.historyDate}
        setWidgetInfo={props.setWidgetInfo}
      ></Graph>
    </>
  );
};

export default FullGraph;
