import React, { Component } from 'react';

import Board from './Board.js';
import './Battleships.css';

import { handleOnClick } from './events/inputEvents.js'
import { startGame, endGame } from './requests/requests.js';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameHasStarted: false,
      squares: [],
    }

    this.startGame = startGame.bind(this)
    this.endGame = endGame.bind(this)
  }

    render() {
      return (
        <React.Fragment>
          <section className='game-info'>
            <div>status</div>
          </section>
          <section className='game'>
            <div className='game-board'>
              <Board 
                squares={this.state.squares}
                onClick={(row, column) => handleOnClick(row, column)}
                squareClass='square-enemy'
              />  
            </div>
            <div className='game-board'>
            <Board 
                onClick={() => console.log('These are your squares!')}
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