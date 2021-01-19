import React, { Component } from 'react';

import Board from './Board.js';
import './Battleships.css';

import { handleOnClick } from './events/inputEvents.js'
import { startGame, endGame } from './requests/requests.js';
import StatusBar from './StatusBar.js';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game: {
        hasStarted: false,
        id: null,
      },
      player: {
        hasTurn: false,
        id: null,
        squares: [],
      },
      enemy: {
        id: null,
        squares: [],
      } 
    }

    this.startGame = startGame.bind(this)
    this.endGame = endGame.bind(this)
  }

  
  render() {
    const {
      game,
      player,
      enemy,
    } = this.state;

    return (
      <React.Fragment>
        <StatusBar 
          game={game}
          player={player}
          enemy={enemy}
        />
        <section className='game'>
          <div className='game-board'>
            <Board 
              game={game}
              player={enemy}
              onClick={(row, column) => handleOnClick(this, row, column)}
              squareClass='square-enemy'
            />  
          </div>
          <div className='game-board'>
            <Board
              game={game}
              player={player}
              onClick={() => alert('These are your squares!')}
              squareClass='square-my'
            /> 
          </div>
        </section>
        <section>
          <button className='game-button' onClick={() => this.startGame(this)}>Start Game</button>
          <button className='game-button' onClick={() => this.endGame(this)}>End Game</button>
        </section>
      </React.Fragment>
    );
  }
}

export default Game;