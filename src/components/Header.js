import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

export default function Header({gameScreen = false}) {

  const htpModal = Swal.mixin({
    title: '<span class="text-sm">Guess the word in 6 tries!</span>',
    icon: 'question',
    html:
      '<div class="flex flex-col"><div class="m-2 p-4 flex flex-col"><div class="flex flex-row justify-evenly"><div class="bg-green-500 text-gray-100 w-12 h-12 text-4xl font-bold text-center">L</div><div class="bg-gray-50 w-12 h-12 text-4xl font-bold border-2 text-center">I</div><div class="bg-gray-50 w-12 h-12 text-4xl font-bold border-2 text-center">G</div><div class="bg-gray-50 w-12 h-12 text-4xl font-bold border-2 text-center">H</div><div class="bg-gray-50 w-12 h-12 text-4xl font-bold border-2 text-center">T</div></div><span class="ml-4 my-2 text-xs">The letter <b>L</b> is placed in correct position.</span><div class="flex flex-row justify-evenly"><div class="bg-gray-50 w-12 h-12 text-4xl font-bold border-2 text-center">U</div><div class="bg-gray-50 w-12 h-12 text-4xl font-bold border-2 text-center">N</div><div class="bg-yellow-500 text-gray-100 w-12 h-12 text-4xl font-bold text-center">I</div><div class="bg-gray-50 w-12 h-12 text-4xl font-bold border-2 text-center">T</div><div class="bg-gray-50 w-12 h-12 text-4xl font-bold border-2 text-center">Y</div></div><span class="text-xs ml-4 my-2">The letter <b>I</b> is in the word but misplaced.</span><div class="flex flex-row justify-evenly"><div class="bg-gray-50 w-12 h-12 text-4xl font-bold border-2 text-center">P</div><div class="bg-gray-50 w-12 h-12 text-4xl font-bold border-2 text-center">O</div><div class="bg-gray-50 w-12 h-12 text-4xl font-bold border-2 text-center">I</div><div class="bg-gray-500 text-gray-100 w-12 h-12 text-4xl font-bold text-center">N</div><div class="bg-gray-50 w-12 h-12 text-4xl font-bold border-2 text-center">T</div></div><span class="text-xs ml-4 my-2">The letter <b>N</b> is in not in the word.</span></div></div> ',
    showCloseButton: true,
    showConfirmButton: false,
  })

  function showHint() {
    const hint = localStorage.getItem('currentGameHint') || 'There\'s no hint :)';

    Swal.fire({
      title: 'Hints 😉',
      icon: 'info',
      text: '"'+hint+'"',
      showCloseButton: true,
      showConfirmButton: false,
    })
  }

  return (
    <>
    <div className="flex border-b-2">
      <div className="w-2/12 flex justify-center align-middle">
        {gameScreen && <img onClick={() => htpModal.fire()} className="rounded-full border-2 border-green-400 m-auto p-1 w-8 h-8" src="/images/htp.svg" width="25px" alt="How to Play" /> }
      </div>
      <Link to="/" className="flex flex-col w-10/12 text-center uppercase">
        <span className="text-4xl font-bold text-green-400">Wordle</span>
        <span className="font-light tracking-widest">with friends</span>
      </Link>
      <div className="w-2/12 flex justify-center align-middle">
        {gameScreen && <img onClick={() => showHint()} className="rounded-full border-2 border-yellow-400 m-auto p-1 w-8 h-8" src="/images/hint.svg" width="25px" alt="Show Hint" />}
      </div>
    </div>
    </>
  )
}