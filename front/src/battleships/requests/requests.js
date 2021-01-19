import axios from 'axios';
import update from 'immutability-helper';

const APIROOT = 'http://localhost:5000/api'


export const startGame = async (self) => {
  console.log('startGame');

  const headers = { 
    'Content-Type': 'application/json',
  }

  await axios.get(`${APIROOT}/game`, { headers })
    .then(response => {
      const data = response.data;
      console.log(data);
      let game = {...self.state.game}
      let player = {...self.state.player}
      let enemy = {...self.state.enemy}
      let timestamp = {...self.state.timestamp}
      game.hasStarted = true
      game.id = data['gameId']
      player.id = data['playerId']
      player.squares = data['myGrid']
      enemy.id = data['enemyId']
      enemy.squares = data['enemyGrid']
      timestamp = data['timestamp']

      self.setState({
        game,
        player,
        enemy,
        timestamp,
      })
    });
}


export const endGame = async (self) => {
  console.log('endGame');

  const headers = {
    'Content-Type': 'application/json',
  }
  const params = {
    'gameId': `${self.state.game.id}`,
  }

  await axios.post(`${APIROOT}/game/end`, { params })
    .then(response => {
      console.log(response.status);
    });
  
    self.setState({
      game: {
        hasStarted: false,
      }
    })

}

export const postBomb = async (self, row, column) => {
  console.log('bomb');
  
  const params = {
    'gameId': `${self.state.game.id}`,
    'playerId': `${self.state.player.id}`,
    'row': `${row}`,
    'column': `${column}`,
  }

  await axios.post(`${APIROOT}/game/bomb`, { params })
    .then(response => {
      const data = response.data;
      let enemy = {...self.state.enemy}
      enemy.squares = data['enemyGrid']
      self.setState({
        enemy,
      });
    });
}

export const getBomb = async (self) => {
  const params = {
    'gameId': `${self.state.game.id}`,
    'playerId': `${self.state.player.id}`,
  }

  await axios.get(`${APIROOT}/game/bomb`, { params })
    .then(response => {
      const data = response.data;
      let player = {...self.state.player}
      player.squares = data['gameGrid']
      self.setState({
          player,
      });
    });
}