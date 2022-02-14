import { useContext } from "react";
import { GameContext } from "../hooks/GameContext";
import { getTileAnimation, getTileBGColor, getTileBorder, getTileTextColor } from "../classes/WordleEngine";

export default function GameBody() {

  const {boardState} = useContext(GameContext)
  const grid = boardState.matrix;
  const solv = boardState.solves;

  function generateStyle(row,col) {
    return {
      backgroundColor: getTileBGColor(solv,row,col),
      border: getTileBorder(solv,row, col),
      color: getTileTextColor(solv,row,col),
      animation: getTileAnimation(boardState.tempRow, row),
    }
  }

  return (
    <div className="w-full text-center flex justify-center" style={{fontFamily:'Arial'}}>
      <div className="flex flex-col w-80 h-96 justify-evenly">
          {
            grid.map((row, i) => (
              <div className="flex flex-row justify-evenly align-middle mt-3" key={i}>
                {
                  row.map((col, j) => (
                    <input key={j} value={grid[i][j]} type="text" disabled={true} style={generateStyle(i,j)} className="rounded w-12 h-12 text-4xl font-bold text-center transition-all" />
                  ))
                }
              </div>
            ))
          }
      </div>
    </div>
  )
}