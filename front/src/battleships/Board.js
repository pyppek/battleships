import React, { Component } from 'react';

import Square from './Square.js';
import './Battleships.css';

class Board extends Component {
  renderSquare(i, j) {
    const {
      game,
      player,
      onClick,
      squareClass,
    } = this.props
    
    let value = game.hasStarted ? player.squares[i][j] : '*';
    const index = i * 10 + j;

    return (
      <Square 
        key={index}
        value={value}
        row={i}
        column={j}
        onClick={() => onClick(i, j)}
        squareClass={squareClass}
      />
    );
  }

  renderGrid = () => {
    const board = [];

    for (let i=0; i<10; i++) {
      let row = [];
      for (let j=0; j<10; j++) {
        row.push(this.renderSquare(i, j));
      }
      board.push(
        <div className='board-row' key={'row-' + i}>
          {row}
        </div>
      );
    }
    return board;
  }

  render() {
    // TODO status??
    return (
      <div>
        <div className='status'>{this.status}</div>
        {this.renderGrid()}
      </div>
    );
  }
}

export default Board;