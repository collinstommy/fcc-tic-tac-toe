import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import Square from './Square';

export default class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
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
    squares[i] = this.state.player
    this.computerGo(squares);
  }


  movesLeft = (squares) => {
    return squares.filter((square) => square === null).length > 0;
  }

  computerGo = (newSquares) => {
    let squareToMove = this.getRandomInt(0, 9);
    let lookingForSquare = true;

    while (lookingForSquare && this.movesLeft(newSquares)) {
      if (newSquares[squareToMove] === null) {
        newSquares[squareToMove] = this.state.player === "X" ? "0" : "X";
        lookingForSquare = false;

      }
      squareToMove = this.getRandomInt(0, 9);
    }
    this.setState({
      squares: newSquares,
    })
  }

  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
    this.setState({ player: "X" });
    console.log(this.state);
  }

  ChooseO = () => {
    this.setState({ player: "O" });
  }

  reset = () => {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
      player: "X"
    });
  }

  render() {
    const winner = this.calculateWinner(this.state.squares);
    const finished = !this.movesLeft(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    }
    else if (finished) {
      status = "Its a stalemate, no winner this time."
    } 

    return (
      <div>
        <div className="playerChoice">
          Play as: <span className="letter-choice" onClick={this.ChooseX}>"X"</span> or
                    <span className="letter-choice" onClick={this.ChooseO}>"O"</span>
        </div>
        <div className="playerChoice">You are playing as {this.state.player}</div>
         <div className="playerChoice"><button onClick={this.reset}>Reset</button></div>
        
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

