import { postBomb, getBomb } from '../requests/requests.js';

export const handleOnClick = (self, row, column) => {
  if (self.state.game.hasStarted) {

    const newEnemySquares = [...self.state.enemy.squares]
    newEnemySquares[row][column] = '?'
    self.setState({
      enemy: {
        squares: newEnemySquares,
      }
    })
    
    postBomb(self, row, column);
    setTimeout(() => { getBomb(self); }, 2000);
  } else {
    alert('Start a game!')
  }
}