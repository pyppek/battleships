import { postBomb, getBomb } from '../requests/requests.js';

export const handleOnClick = (self, row, column) => {
  if (self.state.gameHasStarted) {

    const newEnemySquares = [...self.state.enemySquares]
    newEnemySquares[row][column] = 'bomb'
    self.setState({
      enemySquares: newEnemySquares,
    })
    
    postBomb(self, row, column);
    setTimeout(() => { getBomb(self); }, 2000);
  } else {
    alert('Start a game!')
  }
}