import { Link } from "react-router-dom";
import { htpModal } from "../utils/HowToPlayModal";
import { SwalAlert } from "../utils/TextModal";

export default function Header({gameScreen = false}) {

  function showHint() {
    const hint = localStorage.getItem('currentGameHint') || 'There\'s no hint :)';
    SwalAlert('Hints 😉', hint).fire();
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