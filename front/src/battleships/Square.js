import React from 'react';
import './Battleships.css';

const Square = (props) => {
  const {
    value,
    row,
    column,
    onClick,
    squareClass,
  } = props;

  return (
    <div
      className={squareClass}
      onClick={() => onClick(row, column)}
    >
      {value}
    </div>
  )
}

export default Square;