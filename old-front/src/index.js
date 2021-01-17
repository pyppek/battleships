import axios from 'axios';
import React, { Fragment } from 'react';
import ReactDom from 'react-dom';
import './index.css';


function Square(props) {
    const {
        value,
        index,
        row,
        column,
        onClick,
        squareClass,
    } = props

    //console.log(row, column);
    return (
        <button 
            className={squareClass} 
            onClick={() => onClick(row, column)}
        >
            {value}
        </button>
    );
}


class Board extends React.Component {
    renderSquare(i, j) {
        const value = this.props.gameHasStarted ? this.props.squares[i][j] : ''
        let index = i * 10 + j;
        return (
            <Square
                key={index}
                value={value}
                row={i}
                column={j}
                onClick={() => this.props.onClick(i, j)}
                squareClass={this.props.squareClass}
            />
        );
    }

    renderGrid = () => {
        let grid = []

        for (let i = 0; i < 10; i++) {
            let children = []
            for (let j = 0; j < 10; j++) {
                children.push(this.renderSquare(i, j))
            }
            grid.push(
                <div className='board-row' key={'row-' + i}>
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
            gameHasStarted: false,
            squares: null,
            moveNumber: 0,
        }

        this.initGameAxios = this.initGameAxios.bind(this)
        this.setSquareValues = this.setSquareValues(this)
    }
    
    
    async initGameAxios() {
        this.setState((state) => {
            return {
                gameHasStarted: true
            }
        });
        console.log(this)
        await axios
        .get('http://localhost:5000/game', 
        { headers: {'Content-Type': 'application/json'}})
        .then((response) => {
            console.log(response.data)
            this.setState(() => {
                response = response.data[0]
                return {
                    squares: response['game_grid'],
                    gameId: response['game_id'],
                    timestamp: response['timestamp'],
                }
            });
        });
        
    }
    
    setSquareValues() {
        return
    }
    
    handleClick(row, column) {
        if (!this.state.gameHasStarted) {
            console.log('start a game first!')
            return
        }

        const clickedSquare = this.state.squares[row][column]

        if (clickedSquare) {
            console.log(clickedSquare)
        } else {
            console.log('eipä ollu')
        }
        
    }

    render() {

        return (
            <React.Fragment>
                <div className='game-info'>
                    <div>status</div>
                    <ol>moves</ol>
                </div>
                <div className='game'>
                    <div className='game-board'>
                        <Board
                            squares={this.state.squares}
                            onClick={(row, column) => this.handleClick(row, column)}
                            squareClass='square-enemy'
                        />
                    </div>
                    <div className='game-board'>
                        <Board 
                            onClick={() => console.log('These are your squares!')}
                            squareClass='square-my'
                        />
                    </div>
                </div>
                <div>
                    <button className='start-game' onClick={this.initGameAxios}>
                        Start Game
                    </button>
                </div>
            </React.Fragment>
        );
    }
}

// =====================================================

ReactDom.render(
    <Game />,
    document.getElementById('root')
);

