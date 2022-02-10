import { useContext, useEffect } from 'react';
import { GameContext } from './../hooks/GameContext';

export default function Keyboard() {

  const [boardState, setBoardState] = useContext(GameContext);

  const rows = localStorage.getItem('currentGameRows') || 6;
  const cols = localStorage.getItem('currentGameCols') || 5;

  function handleKbClick(btn) {
    if(btn === 'enter') {

    } else if(btn === 'backsp') {

      if(boardState.col > 0) {

        boardState.matrix[boardState.row][boardState.col - 1] = ''
        const tile = document.getElementById(`c${boardState.row}${boardState.col - 1}`)
        tile.value = ''

        if(boardState.col > 0) {
          boardState.col--;
        }

        setBoardState(boardState)
        localStorage.setItem('boardState', JSON.stringify(boardState))
      }

    } else {

      if(boardState.col < cols) {
        btn = btn.toUpperCase()
  
        boardState.matrix[boardState.row][boardState.col] = btn
        const tile = document.getElementById(`c${boardState.row}${boardState.col}`)
        tile.value = btn
  
        if(boardState.col < cols) {
          boardState.col++;
        }
  
        setBoardState(boardState)
        localStorage.setItem('boardState', JSON.stringify(boardState))
      }

    }
  }

  return (
    <div id="kb" className="flex flex-col w-full justify-evenly flex-grow">
      <div className="flex justify-evenly">
        <button onClick={() => handleKbClick("q")}>q</button>
        <button onClick={() => handleKbClick("w")}>w</button>
        <button onClick={() => handleKbClick("e")}>e</button>
        <button onClick={() => handleKbClick("r")}>r</button>
        <button onClick={() => handleKbClick("t")}>t</button>
        <button onClick={() => handleKbClick("y")}>y</button>
        <button onClick={() => handleKbClick("u")}>u</button>
        <button onClick={() => handleKbClick("i")}>i</button>
        <button onClick={() => handleKbClick("o")}>o</button>
        <button onClick={() => handleKbClick("p")}>p</button>
      </div>
      <div className="flex justify-evenly">
        <div className="w-2"></div>
        <button onClick={() => handleKbClick("a")}>a</button>
        <button onClick={() => handleKbClick("s")}>s</button>
        <button onClick={() => handleKbClick("d")}>d</button>
        <button onClick={() => handleKbClick("f")}>f</button>
        <button onClick={() => handleKbClick("g")}>g</button>
        <button onClick={() => handleKbClick("h")}>h</button>
        <button onClick={() => handleKbClick("j")}>j</button>
        <button onClick={() => handleKbClick("k")}>k</button>
        <button onClick={() => handleKbClick("l")}>l</button>
        <div className="w-2"></div>
      </div>
      <div className="flex justify-evenly">
        <button onClick={() => handleKbClick("enter")} style={{width: "3rem", backgroundColor: "#4B5563", color: "#eee", textTransform: "none"}}>Enter</button>
        <button onClick={() => handleKbClick("z")}>z</button>
        <button onClick={() => handleKbClick("x")}>x</button>
        <button onClick={() => handleKbClick("c")}>c</button>
        <button onClick={() => handleKbClick("v")}>v</button>
        <button onClick={() => handleKbClick("b")}>b</button>
        <button onClick={() => handleKbClick("n")}>n</button>
        <button onClick={() => handleKbClick("m")}>m</button>
        <button onClick={() => handleKbClick("backsp")} style={{width: "3rem", backgroundColor: "#FDE047", fontSize: "1.5rem"}}>←</button>
      </div>
    </div>
  )
}