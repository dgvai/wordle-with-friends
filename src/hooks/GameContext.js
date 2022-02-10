import { createContext, useState } from "react";

export const GameContext = createContext()

export const GameProvider = (props) => {

  function initializeMatrix() {

    const grid = [];
    const rows = localStorage.getItem('currentGameRows') || 6;
    const cols = localStorage.getItem('currentGameCols') || 5;

    for(var i = 0; i < rows; i++){
      grid.push([])
      for(var j = 0; j < cols; j++) {
        grid[i].push('')
      }
    }

    return grid;
  }

  const [boardState, setBoardState] = useState({
    id: '',
    row: 0,
    col: 0,
    matrix: initializeMatrix()
  })

  return(
    <GameContext.Provider value={[boardState, setBoardState]}>
      {props.children}
    </GameContext.Provider>
  )

}