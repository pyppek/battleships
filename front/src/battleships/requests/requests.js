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
          squares: data['gameGrid'],
          gameId: data['gameId'],
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

}
