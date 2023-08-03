import React from "react";
import { json } from "react-router-dom";

const ConverterCard = (props) => {
  const from = props.currSymbol[props.from]?.description;
  const to = props.currSymbol[props.to]?.description;
  const forMap = [1, 5, 10, 25, 50, 100, 1000, 5000, 10000];
  return (
    <>
      <div className="card converter-card shadow border">
        <div className="card-header converter-card-header">
          <h5 className="row converter-card-header">{`Convert ${from} to ${to}`}</h5>
          <div className="row">
            <div className="col-sm-6">
              <h5>{`${props.emojiFlags[props.from]} ${props.from}`}</h5>
            </div>
            <div className="col-sm-6">
              <h5>{`${props.emojiFlags[props.to]} ${props.to}`}</h5>
            </div>
          </div>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            {forMap.map((item, idx) => {
              return (
                <div className="row converter-list" key={idx}>
                  <div className="col-sm-6 centered">{`${item} ${props.from}`}</div>
                  <div className="col-sm-6 centered">{`${
                    Math.ceil(item * props.convert * 10000) / 10000
                  } ${props.to}`}</div>
                </div>
              );
            })}
          </li>
        </ul>
      </div>
    </>
  );
};

export default ConverterCard;
