import {useRef} from 'react';
import './Battleships.css';

const Square = (props) => {
  const {
    value,
    row,
    column,
    onClick,
    squareClass,
  } = props;

  const btnRef = useRef();
  const onSquareClick = e => {
    if(btnRef.current) {
      onClick(row, column);
      btnRef.current.setAttribute('disabled', 'disabled');
    }
  }

  // TODO enable buttons when new game starts
  // Now requires page refresh

  return (
    <button
      className={value === 'X' ? squareClass + '-hit' : squareClass}
      ref={btnRef}
      onClick={() => onSquareClick()}
    >
      {value}
    </button>
  )
}

export default Square;