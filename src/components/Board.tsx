import React, { useState } from "react";
import Square from "./Square";
import "../index.css";

const Board = () => {
  const [square, setSquare] = useState(Array(9).fill(null));
  const [isTurnOfX, setTurnOfX] = useState(true);
  const [history, setHistory] = useState<number[]>([]);

  const resetHandler = () => {
    setSquare(Array(9).fill(null));
    setTurnOfX(true);
  };
  const undoHandler = () => {
    const newSquare = [...square];
    if (history.length > 0) {
      newSquare[history.pop()!] = null;
      setSquare(newSquare);
      setTurnOfX(!isTurnOfX);
    }
  };

  const calculateWinner = (squares: string[] | null[]) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  };

  const handleClick = (i: number) => {
    const squares = [...square];

    if (squares[i] === null && winner === null) {
      squares[i] = isTurnOfX ? "X" : "O";
      setSquare(squares);
      setTurnOfX(!isTurnOfX);
      setHistory([...history, i]);
    } else {
      alert("This is not allowed");
    }
  };

  const winner = calculateWinner(square);
  let status;
  if (winner) {
    status = `Player ${isTurnOfX ? "2" : "1"} Won!`;
  } else {
    status = `Player ${isTurnOfX ? "1'S" : "2'S"} Turn`;
  }

  const renderSquare = (i: number) => {
    return <Square value={square[i]} onClick={() => handleClick(i)} />;
  };

  return (
    <div className="board">
      <h3>{status}</h3>

      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div>
        <button className="btngroup" onClick={() => resetHandler()}>
          Reset
        </button>
        <button className="btngroup" onClick={() => undoHandler()}>
          Undo
        </button>
      </div>
    </div>
  );
};

export default Board;
