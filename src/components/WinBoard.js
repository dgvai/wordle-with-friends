import { useContext, useEffect } from 'react';
import { MapToTextTiles } from '../classes/AnswerMapper';
import { CopyToClipboard } from '../classes/ClipboardCopier';
import { GameContext } from '../hooks/GameContext';
import { burst } from '../utils/MojsBurst';

export default function WinBoard() {

  const {boardState} = useContext(GameContext)
  const name = localStorage.getItem('currentGameCreator')

  useEffect(() => {
    burst.play()
  }, [])

  function handleCopy() {

    const tiles = new MapToTextTiles(boardState.solves)
    tiles.AddTitle(name)
    CopyToClipboard(tiles.text)

  }

  return (
    <div className="flex flex-col w-full justify-center flex-grow overflow-hidden">
      <div className="bg-green-400 p-4 mb-2 mx-auto rounded-xl text-gray-100 text-3xl font-bold uppercase shadow-xl custom-animate-drop">You won!</div>
      <button id="copyBtn" onClick={handleCopy} className="bg-gray-400 p-2 px-4 mb-2 mx-auto rounded-xl text-gray-100 text-xl font-bold uppercase">Copy & Share</button>
    </div>
  )
}