import { useContext, useState } from 'react';
import { Colors } from '../constants/colors';
import { GameContext } from '../hooks/GameContext';
import { GameStates } from '../constants/games';
import { secureStorage } from '../classes/SecureStorage';
import { compareWords, PressedBackspace, PressedKey, updateGameBoardState } from '../classes/WordleEngine';
import { EnterPressed } from './../classes/WordleEngine';

export default function Keyboard() {

  const {boardState, setBoardState} = useContext(GameContext);

  const [loading, setLoading] = useState(false)

  const rows = localStorage.getItem('currentGameRows') || 6;
  const cols = localStorage.getItem('currentGameCols') || 5;

  function generateStyle(key) {
    if(boardState.keyset.correct.includes(key)) {
      return {
        backgroundColor: Colors.Matched,
        color: Colors.LightText
      }
    } else if(boardState.keyset.misplaced.includes(key)) {
      return {
        backgroundColor: Colors.Misplaced,
        color: Colors.LightText
      }
    } else if(boardState.keyset.wrong.includes(key)) {
      return {
        backgroundColor: Colors.Wrong,
        color: Colors.LightText
      }
    }
  }

  async function checkWordValidity(word) {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    return response.status === 200;
  }

  async function handleKbClick(btn) {

    boardState.tempRow = null

    if(btn === 'enter') {
      
      if(boardState.row < rows && boardState.col == cols) {

        setLoading(true)
        const validWord = await checkWordValidity(boardState.matrix[boardState.row].join(''))

        if(validWord) {

          EnterPressed(boardState, setBoardState)
          setLoading(false)

        } else {
          boardState.tempRow = boardState.row
          setLoading(false)
          updateGameBoardState(boardState, setBoardState)
        }

      }

    } else if(btn === 'backsp') {

      PressedBackspace(boardState, setBoardState)

    } else {

      PressedKey(btn, boardState, setBoardState)

    }
  }

  return (
    <div id="kb" className="flex flex-col w-full justify-evenly flex-grow">
      <div className="flex justify-evenly">
        <button style={generateStyle("q")} onClick={() => handleKbClick("q")}>q</button>
        <button style={generateStyle("w")} onClick={() => handleKbClick("w")}>w</button>
        <button style={generateStyle("e")} onClick={() => handleKbClick("e")}>e</button>
        <button style={generateStyle("r")} onClick={() => handleKbClick("r")}>r</button>
        <button style={generateStyle("t")} onClick={() => handleKbClick("t")}>t</button>
        <button style={generateStyle("y")} onClick={() => handleKbClick("y")}>y</button>
        <button style={generateStyle("u")} onClick={() => handleKbClick("u")}>u</button>
        <button style={generateStyle("i")} onClick={() => handleKbClick("i")}>i</button>
        <button style={generateStyle("o")} onClick={() => handleKbClick("o")}>o</button>
        <button style={generateStyle("p")} onClick={() => handleKbClick("p")}>p</button>
      </div>
      <div className="flex justify-evenly">
        <div className="w-2"></div>
        <button style={generateStyle("a")} onClick={() => handleKbClick("a")}>a</button>
        <button style={generateStyle("s")} onClick={() => handleKbClick("s")}>s</button>
        <button style={generateStyle("d")} onClick={() => handleKbClick("d")}>d</button>
        <button style={generateStyle("f")} onClick={() => handleKbClick("f")}>f</button>
        <button style={generateStyle("g")} onClick={() => handleKbClick("g")}>g</button>
        <button style={generateStyle("h")} onClick={() => handleKbClick("h")}>h</button>
        <button style={generateStyle("j")} onClick={() => handleKbClick("j")}>j</button>
        <button style={generateStyle("k")} onClick={() => handleKbClick("k")}>k</button>
        <button style={generateStyle("l")} onClick={() => handleKbClick("l")}>l</button>
        <div className="w-2"></div>
      </div>
      <div className="flex justify-evenly">
        <button onClick={() => handleKbClick("enter")} style={{width: "3rem", backgroundColor: "#4B5563", color: "#eee", textTransform: "none"}}>{loading ? '...' : 'Enter'}</button>
        <button style={generateStyle("z")} onClick={() => handleKbClick("z")}>z</button>
        <button style={generateStyle("x")} onClick={() => handleKbClick("x")}>x</button>
        <button style={generateStyle("c")} onClick={() => handleKbClick("c")}>c</button>
        <button style={generateStyle("v")} onClick={() => handleKbClick("v")}>v</button>
        <button style={generateStyle("b")} onClick={() => handleKbClick("b")}>b</button>
        <button style={generateStyle("n")} onClick={() => handleKbClick("n")}>n</button>
        <button style={generateStyle("m")} onClick={() => handleKbClick("m")}>m</button>
        <button onClick={() => handleKbClick("backsp")} style={{width: "3rem", backgroundColor: "#FDE047", fontSize: "1.5rem"}}>←</button>
      </div>
    </div>
  )
}