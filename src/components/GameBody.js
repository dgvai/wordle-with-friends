import { useContext } from "react";
import { GameContext } from "../hooks/GameContext";
import { Colors } from "../constants/colors";

export default function GameBody() {

  const {boardState} = useContext(GameContext)
  const grid = boardState.matrix;
  const solv = boardState.solves;
  
  function getTileBGColor(row,col) {
    switch(solv[row][col]) {
      case 1: return Colors.Matched;
      case 2: return Colors.Misplaced;
      case 3: return Colors.Wrong;
      default: return Colors.BlankTile;
    }
  }

  function getTileBorder(row,col) {
    return (solv[row][col]) ? 'none' : '2px solid #D1D5DB';
  }

  function getTileTextColor(row,col) {
    return (solv[row][col]) ? Colors.LightText : Colors.DarkText;
  }

  function generateStyle(row,col) {
    return {
      backgroundColor: getTileBGColor(row,col),
      border: getTileBorder(row, col),
      color: getTileTextColor(row,col),
    }
  }

  return (
    <div className="w-full text-center flex justify-center">
      <div className="flex flex-col w-80 h-96 justify-evenly">
          {
            grid.map((row, i) => (
              <div className="flex flex-row justify-evenly align-middle mt-3" key={i}>
                {
                  row.map((col, j) => (
                    <input key={j} value={grid[i][j]} id={`c${i}${j}`} type="text" disabled={true} style={generateStyle(i,j)} className="w-12 h-12 text-4xl font-bold text-center transition-all" />
                  ))
                }
              </div>
            ))
          }
      </div>
    </div>
  )
}