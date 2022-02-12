import mojs from '@mojs/core'
import { useContext, useEffect } from 'react';
import { LetterState } from '../constants/games';
import { GameContext } from '../hooks/GameContext';

export default function WinBoard() {

  const {boardState} = useContext(GameContext)

  const burst = new mojs.Burst({
    radius: {0:150},
    count: 15,
    opacity:  { 1: 0 },
    children: {
      shape: 'polygon',
      fill: { 'red' : 'yellow' },
      radius: 'rand(10,30)',
      rotate: { 360: 0 },
      duration: 2000
    }
  });

  useEffect(() => {
    burst.play()
  }, [])

  function handleCopy() {
    
    const soln = boardState.solves.map(v => {
      return v.map(w => {
        switch(w) {
            case LetterState.Correct : return '🟩';
            case LetterState.Misplaced : return '🟨';
            case LetterState.Wrong : return '⬛';
            default: return ''
        }
      }).join('')
    }).join("\r\n").trim()

    const tries = soln.split("\n").length;
    const lines = `Wordle with\nFriends ${tries}/6\n`;

    const solnInput = document.createElement('textarea')
    solnInput.value = lines+soln
    document.body.appendChild(solnInput)
    solnInput.select()
    document.execCommand('copy')
    document.body.removeChild(solnInput)
    burst.replay()
    console.log('copied')

    var copyBtn = document.querySelector('#copyBtn')
    copyBtn.innerHTML = 'Copied!';

    window.setTimeout(function() {
      copyBtn.innerHTML = "Copy & Share"
    }, 2000)
  }

  return (
    <div className="flex flex-col w-full justify-center flex-grow overflow-hidden">
      <div className="bg-green-400 p-4 mb-2 mx-auto rounded-xl text-gray-100 text-3xl font-bold uppercase shadow-xl custom-animate-drop">You won!</div>
      <button id="copyBtn" onClick={handleCopy} className="bg-gray-400 p-2 px-4 mb-2 mx-auto rounded-xl text-gray-100 text-xl font-bold uppercase">Copy & Share</button>
    </div>
  )
}