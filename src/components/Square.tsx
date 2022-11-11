import React from "react";
import { Isquare } from "../Interfaces";

const Square = ({onClick, value}:Isquare) => {
  return (
    <div>
      <button className="btn" onClick={() => onClick()}>
        {value}
      </button>
    </div>
  );
};

export default Square;
