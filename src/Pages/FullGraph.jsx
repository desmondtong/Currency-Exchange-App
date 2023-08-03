import React from "react";
import Graph from "../Components/Graph";

const FullGraph = (props) => {
  return (
    <div className="row padding-1 border shadow">
      <Graph
        selection={props.selection}
        setSelection={props.setSelection}
        todayDate={props.todayDate}
        historyDate={props.historyDate}
        setWidgetInfo={props.setWidgetInfo}
      ></Graph>
    </div>
  );
};

export default FullGraph;
