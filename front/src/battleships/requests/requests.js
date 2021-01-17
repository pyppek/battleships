import axios from 'axios';

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
      self.setState(() => {
        return {
          gameHasStarted: true,
          gameId: data['gameId'],
          mySquares: data['myGrid'],
          enemySquares: data['enemyGrid'],
          playerId: data['playerId'],
          timestamp: data['timestamp'],
        }
      });
    });
}


export const endGame = async (self) => {
  console.log('endGame');

  const headers = {
    'Content-Type': 'application/json',
  }
  const params = {
    'gameId': `${self.state.gameId}`,
  }

  await axios.post(`${APIROOT}/game/end`, { params })
    .then(response => {
      console.log(response.status);
    });
  
    self.setState({
      gameHasStarted: false,
    })

}

export const postBomb = async (self, row, column) => {
  console.log('bomb');
  
  const params = {
    'gameId': `${self.state.gameId}`,
    'playerId': `${self.state.playerId}`,
    'row': `${row}`,
    'column': `${column}`,
  }

  await axios.post(`${APIROOT}/game/bomb`, { params })
    .then(response => {
      const data = response.data;
      self.setState({
        enemySquares: data['enemyGrid'],
      });
    });
}

export const getBomb = async (self) => {
  const params = {
    'gameId': `${self.state.gameId}`,
    'playerId': `${self.state.playerId}`,
  }

  await axios.get(`${APIROOT}/game/bomb`, { params })
    .then(response => {
      const data = response.data;
      console.log(response.data)
      self.setState({
        mySquares: data['gameGrid'],
      });
    });
}