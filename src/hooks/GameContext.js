import { createContext, useState } from "react";

export const GameContext = createContext(undefined)

export const GameProvider = (props) => {

  function initializeMatrix() {

    const grid = [];
    const solv = [];
    const rows = localStorage.getItem('currentGameRows') || 6;
    const cols = localStorage.getItem('currentGameCols') || 5;

    for(var i = 0; i < rows; i++){
      grid.push([])
      solv.push([])
      for(var j = 0; j < cols; j++) {
        grid[i].push('')
        solv[i].push('')
      }
    }

    return {grid, solv};
  }

  const [boardState, setBoardState] = useState({
    id: '',
    row: 0,
    col: 0,
    matrix: initializeMatrix().grid,
    solves: initializeMatrix().solv,
    keyset: {
      correct: [],
      misplaced: [],
      wrong: []
    },
    state: 0,
  })

  return(
    <GameContext.Provider value={{boardState, setBoardState, gameState: boardState.state}}>
      {props.children}
    </GameContext.Provider>
  )

}