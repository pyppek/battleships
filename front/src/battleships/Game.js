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
      gameId: null,
      playerId: null,
      myTurn: false,
      mySquares: [],
      enemySquares: [],
    }

    this.startGame = startGame.bind(this)
    this.endGame = endGame.bind(this)
  }

  
  render() {
    const {
      gameHasStarted,
      gameId,
      myTurn,
      mySquares,
      enemySquares,
      playerId,
    } = this.state;

    return (
      <React.Fragment>
        <section className='game-info'>
          <div>
            game: {gameHasStarted ? 'on' : 'no'}<br></br>
            gameID: {gameId}<br></br>
            playerID: {playerId}<br></br>
            turn: {myTurn ? 'You' : 'Enemy'}<br></br>
          </div>
        </section>
        <section className='game'>
          <div className='game-board'>
            <Board 
              gameHasStarted={gameHasStarted}
              squares={enemySquares}
              onClick={(row, column) => handleOnClick(this, row, column)}
              squareClass='square-enemy'
            />  
          </div>
          <div className='game-board'>
          <Board
              gameHasStarted={gameHasStarted}
              squares={mySquares}
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