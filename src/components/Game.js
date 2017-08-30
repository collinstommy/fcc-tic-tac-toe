import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import Board from './Board';
import { DropdownButton, Media, MediaList, MenuItem } from 'react-bootstrap';

export default class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

