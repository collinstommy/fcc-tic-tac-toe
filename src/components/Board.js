import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import Square from './Square';

export default class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      player: "X",
      playerGo: true
    };
  }

  calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  handleClick = (i) => {
    const squares = this.state.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      player: "X",
      playerGo: false
    });
  }

  computerGo = () => {
    
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  ChooseX = () => {
    this.setState({ player: "X", xIsNext: true });
    console.log(this.state);
  }

  ChooseO = () => {
    this.setState({ player: "O", xIsNext: false });
  }

  reset = () => {
    this.setState({
    squares: Array(9).fill(null),
      xIsNext: true,
      player: "X"});
}

render() {
  const winner = this.calculateWinner(this.state.squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
  }
  return (
    <div>
      <div className="playerChoice">
        Play as: <span class onClick={this.ChooseX}>"X"</span> or
                    <span onClick={this.ChooseO}>"O"</span>
        <br />You are playing as {this.state.player}
        <button onClick={this.reset}>Reset</button>
      </div>
      <div className="status">{status}</div>
      <div className="board-row">
        {this.renderSquare(0)}
        {this.renderSquare(1)}
        {this.renderSquare(2)}
      </div>
      <div className="board-row">
        {this.renderSquare(3)}
        {this.renderSquare(4)}
        {this.renderSquare(5)}
      </div>
      <div className="board-row">
        {this.renderSquare(6)}
        {this.renderSquare(7)}
        {this.renderSquare(8)}
      </div>
    </div>
  );
}
}

