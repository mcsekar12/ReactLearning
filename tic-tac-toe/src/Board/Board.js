import React from "react";
import Square from "../Square/Square";

export default class Board extends React.Component {
  renderSquare(row, col) {
    return (
      <Square
        value={this.props.squares[row * 3 + col]}
        onClick={() => this.props.handleClick(row * 3 + col)}
        row={row}
        col={col}
        key={row + "" + col}
        won={this.props.winnerSquare.indexOf(row * 3 + col) !== -1}
      />
    );
  }
  render() {
    let boardSquares = [];
    for (let i = 0; i < 3; i++) {
      let columns = [];
      for (let j = 0; j < 3; j++) {
        columns.push(this.renderSquare(i, j));
      }
      boardSquares.push(
        <div className="board-row" key={i}>
          {columns}
        </div>
      );
    }
    return <div>{boardSquares}</div>;
  }
}
