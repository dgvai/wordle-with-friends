import { createContext, useState } from "react";

export const GameContext = createContext(undefined)

export const GameProvider = (props) => {
  
  const [boardState, setBoardState] = useState({
    id: '',
    row: 0,
    col: 0,
    matrix: [],
    solves: [],
    keyset: {
      correct: [],
      misplaced: [],
      wrong: []
    },
    tempRow: null,
    state: 0,
  })

  return(
    <GameContext.Provider value={{boardState, setBoardState}}>
      {props.children}
    </GameContext.Provider>
  )

}