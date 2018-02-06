import React from "react";
import Board from "../Board/Board";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null), col: -1, row: -1 }],
      xIsNext: true,
      stepNumber: 0,
      winnerSquare: [],
      sortDesc: true
    };
    this.handleClick = this.handleClick.bind(this);
    this.jumpTo = this.jumpTo.bind(this);
    this.sortMove = this.sortMove.bind(this);
  }
  componentWillReceiveProps(nextProps, nextState) {}
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    let winnerStatus = calculateWinner(current.squares);
    let winner = winnerStatus ? winnerStatus[0] : winnerStatus;
    if (winner || squares[i]) {
      return;
    }
    if (this.state.xIsNext) {
      squares[i] = "X";
    } else {
      squares[i] = "O";
    }
    let row = -1;
    if (i >= 0 && i < 3) {
      row = 0;
    } else if (i > 2 && i < 6) {
      row = 1;
    } else if (i > 5 && i <= 8) {
      row = 2;
    }

    this.setState(
      {
        history: history.concat([
          {
            squares: squares,
            col: i - row * 3,
            row: row
          }
        ]),
        xIsNext: !this.state.xIsNext,
        stepNumber: this.state.stepNumber + 1
      },
      () => {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        let winnerStatus = calculateWinner(current.squares);
        let winner = winnerStatus ? winnerStatus[0] : winnerStatus;
        let winnerSquare = winnerStatus ? winnerStatus.slice(1) : [];
        if (winner) {
          this.setState({
            winnerSquare: winnerSquare
          });
        }
      }
    );
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
      winnerSquare: []
    });
  }
  sortMove() {
    this.setState({ sortDesc: !this.state.sortDesc });
  }
  render() {
    let history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    let winnerStatus = calculateWinner(current.squares);
    const winner = winnerStatus ? winnerStatus[0] : winnerStatus;
    let sortDesc = this.state.sortDesc;
    if (!sortDesc) {
      history = history.reverse();
    }
    const moves = history.map((step, move) => {
      if (!sortDesc) {
        move = history.length - 1 - move;
      }
      const desc = move
        ? `Go to move # ${move} (${step.row},${step.col})`
        : "Go to game start";
      const bold = move === this.state.stepNumber;
      return (
        <li key={move} className={bold ? "bold" : ""}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      if (this.state.stepNumber === 9) {
        status = "Match Drawn";
      } else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      }
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            xIsNext={this.state.xIsNext}
            handleClick={this.handleClick}
            winnerSquare={this.state.winnerSquare}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
            <button onClick={this.sortMove}>sort by move</button>
            <span>{sortDesc ? "DESC" : "ASC"}</span>
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    );
  }
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], a, b, c];
    }
  }
  return null;
}
