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
    <button
      className={value === 'X' ? squareClass + '-hit' : squareClass}
      onClick={() => onClick(row, column)}
    >
      {value}
    </button>
  )
}

export default Square;