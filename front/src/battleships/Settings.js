import React, { Component } from 'react';
import './Battleships.css';

class Settings extends Component {
  constructor (props) {
    super(props);
    this.state = {
      twoPlayers: false,
      joinGame: null,
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({twoPlayers: !this.state.twoPlayers});
  }
  render() {

    return (
      <div className='top-bar-subcontainer top-bar-subcontainer-left'>
        <label htmlFor='twoPlayers'>
          2 players
        </label>
        <input 
          type='checkbox' 
          onChange={this.handleChange} 
          checked={this.state.twoPlayers}
          id='twoPlayers'
        />
      </div>

    );
  }
}

export default Settings;