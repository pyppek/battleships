import React, { Component } from 'react';

const StatusBar = (props) => {
  const {
    game,
    player,
    enemy
  } = props;

  console.log(player)
  return (
    <section className='top-bar-subcontainer'>
      <header className='status-header'>
        <span>game: {game.id}</span>
        <ul>
          <li>player: {player.id}</li>
          <li>enemy: {enemy.id ? enemy.id : 'computer'}</li>
        </ul>
      </header>
    </section>
  )
}


export default StatusBar;