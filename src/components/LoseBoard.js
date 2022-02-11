import { useContext } from 'react';
import { GameContext } from '../hooks/GameContext';

export default function LoseBoard() {

  const {boardState} = useContext(GameContext)

  return (
    <div className="flex flex-col w-full justify-center flex-grow overflow-hidden">
      <div className="bg-red-400 p-4 mb-2 mx-auto rounded-xl text-gray-100 text-3xl font-bold uppercase shadow-xl custom-animate-drop">You Lost!</div>
      {/* <button className="bg-gray-400 p-2 px-4 mb-2 mx-auto rounded-xl text-gray-100 text-xl font-bold uppercase">Copy & Share</button> */}
    </div>
  )
}