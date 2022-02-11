import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { Colors } from '../constants/colors';
import { GameContext } from '../hooks/GameContext';
import { GameStates, LetterState } from '../constants/games';

export default function Keyboard() {

  const {boardState, setBoardState} = useContext(GameContext);

  const [loading, setLoading] = useState(false)

  const rows = localStorage.getItem('currentGameRows') || 6;
  const cols = localStorage.getItem('currentGameCols') || 5;

  function updateGameBoardState() {
    setBoardState({...boardState, ...boardState})
    localStorage.setItem('boardState', JSON.stringify(boardState))
  }

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

  async function handleKbClick(btn) {

    boardState.tempRow = null

    if(btn === 'enter') {
      
      if(boardState.row < rows && boardState.col == cols) {

        setLoading(true)
        const validWordCheck = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${boardState.matrix[boardState.row].join('')}`)

        if(validWordCheck.status === 200) {

          const db = getFirestore();
          const gameDocRef = doc(db, "games", boardState.id)
          const gameSnap = await getDoc(gameDocRef);
      
          if(gameSnap.exists()) {

              const userWordArray = boardState.matrix[boardState.row];
              const solnWordArray = (gameSnap.data().word).toUpperCase().split('')
  
              var winCounter = 0;
              
              userWordArray.forEach((v,i) => {
  
                if(solnWordArray.includes(v)) {
                  if(solnWordArray[i] == v) {
                    boardState.solves[boardState.row][i] = LetterState.Correct
                    boardState.keyset.correct.push(v.toLowerCase())
                    winCounter++;
                  } else {
                    boardState.solves[boardState.row][i] = LetterState.Misplaced
                    boardState.keyset.misplaced.push(v.toLowerCase())
                  }
                } else {
                  boardState.solves[boardState.row][i] = LetterState.Wrong
                  boardState.keyset.wrong.push(v.toLowerCase())
                }
  
              })
  
              if(winCounter == cols) {
                boardState.state = GameStates.Won;
              }
  
              if(boardState.row == rows - 1) {
                boardState.state = GameStates.Lost;
              }
  
              boardState.row++;
              boardState.col = 0
              setLoading(false)
              updateGameBoardState();
      
          }
        } else {
          boardState.tempRow = boardState.row
          setLoading(false)
          updateGameBoardState()
        }

      }

    } else if(btn === 'backsp') {

      if(boardState.col > 0) {

        boardState.matrix[boardState.row][boardState.col - 1] = ''
        boardState.col--;
        updateGameBoardState()
      }

    } else {

      if(boardState.col < cols) {

        boardState.matrix[boardState.row][boardState.col] = btn.toUpperCase()
        boardState.col++;
        updateGameBoardState()
      }

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