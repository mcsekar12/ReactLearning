import React from "react";

export default function Square(props) {
  let row = props.row;
  let col = props.col;
  return (
    <button
      className={props.won ? "square highlight" : "square"}
      onClick={props.onClick}
      key={row + "" + col}
    >
      {props.value}
    </button>
  );
}
