import React, { Component } from 'react';

const StatusBar = (props) => {
  const {
    game,
    player,
    enemy
  } = props;

  console.log(player)
  return (
    <section style={{backgroundColor: 'red'}} className='status-container'>
      <header  className='status-header'>
        <span>gameID: {game.id}</span>
      </header>
    </section>
  )
}


export default StatusBar;