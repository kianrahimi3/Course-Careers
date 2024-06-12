import { useState } from "react";
import Square from "./Square";
import next from "next";


export default function Board({turn, squares, onPlay}) {
    const winner = checkWinner(squares);
    let status;
    
    function squareClick(idx) {
        if (winner || squares[idx])
            return
        const newSquares = squares.slice();
        if (turn)
            newSquares[idx] = "X";
        else
            newSquares[idx] = "O";

        onPlay(newSquares);
    }

    if (winner) {
        status = "Winner: " + winner;
    }
    else
    {
        status = 'Next player: ' + (turn ? 'X' : 'O');
    }

    return (
        <>
            <div className="status">{status}</div>

            <div className="board-row">
                <Square value={squares[0]} squareClick={() => squareClick(0)}/>
                <Square value={squares[1]} squareClick={() => squareClick(1)}/>
                <Square value={squares[2]} squareClick={() => squareClick(2)}/>
            </div>
            <div className="board-row">
                <Square value={squares[3]} squareClick={() => squareClick(3)}/>
                <Square value={squares[4]} squareClick={() => squareClick(4)}/>
                <Square value={squares[5]} squareClick={() => squareClick(5)}/>
            </div>
            <div className="board-row">
                <Square value={squares[6]} squareClick={() => squareClick(6)}/>
                <Square value={squares[7]} squareClick={() => squareClick(7)}/>
                <Square value={squares[8]} squareClick={() => squareClick(8)}/>
            </div>
        </>
    );
  }


function checkWinner(squares) {
    const wins = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for (let i = 0; i < wins.length; i++) {
        const [a, b, c] = wins[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
    return null;
}