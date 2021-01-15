import axios from 'axios';
import React from 'react';
import ReactDom from 'react-dom';
import './index.css';


function Square(props) {
    return (
        <button className='square' onClick={props.onClick}>
            {props.value}
        </button>
    );
}


class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={i} // this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    renderGrid = () => {
        let grid = []

        for (let i = 0; i < 10; i++) {
            let children = []
            for (let j = 0; j < 10; j++) {
                children.push(this.renderSquare(i * 10 + j))
            }
            grid.push(
                <div className='board-row'>
                    {children}
                </div>);
        }
        return grid;
    }

    render() {
        return (
            <div>
                <div className='status'>{this.status}</div>
                {this.renderGrid()}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: null,
            moveNumber: 0,
        }
    }

    initGame() {
        var xhr = new XMLHttpRequest()

        // get a callback when the server responds
        xhr.addEventListener('load', () => {
            console.log(xhr.responseText);
        });

        // open the request with the verb and the url
        xhr.open('GET', 'http://localhost:5000/game');
        xhr.send();
    }

    async initGameAxios() {
        console.log(this)
        let self = this
        await axios
            .get('http://localhost:5000/game', 
                { headers: {'Content-Type': 'application/json'}})
            .then((response) => {
                console.log(response.data)
                self.setState({squares: response.data})
            });
    }

    handleClick(i) {
        return;
    }

    render() {

        return (
            <div className='game'>
                <button className='start-game' onClick={console.log(this),this.initGameAxios}>
                    Start Game
                </button>
                <div className='game-board'>
                    <Board
                        //squares={}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className='game-info'>
                    <div>status</div>
                    <ol>moves</ol>
                </div>
            </div>
        );
    }
}

// =====================================================

ReactDom.render(
    <Game />,
    document.getElementById('root')
);

