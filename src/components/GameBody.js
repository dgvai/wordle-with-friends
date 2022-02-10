import { useContext } from "react";
import { GameContext } from "../hooks/GameContext";

export default function GameBody() {

  const [boardState] = useContext(GameContext)
  let grid = boardState.matrix;

  return (
    <div className="w-full text-center flex justify-center">
      <div className="flex flex-col w-80 h-96 justify-evenly">
          {
            grid.map((row, i) => (
              <div className="flex flex-row justify-evenly align-middle mt-3" key={i}>
                {
                  row.map((col, j) => (
                    <input key={j} value={grid[i][j]} id={`c${i}${j}`} type="text" disabled={true} className="bg-gray-50 border-2 w-12 h-12 text-4xl font-bold text-center" />
                  ))
                }
              </div>
            ))
          }
      </div>
    </div>
  )
}