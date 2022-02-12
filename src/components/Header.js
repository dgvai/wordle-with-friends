import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

export default function Header({gameScreen = false}) {

  const htpModal = Swal.mixin({
    title: '<span class="text-sm">Guess the word in 6 tries!</span>',
    icon: 'question',
    html:
      '<div class="flex flex-col text-xs"><div class="p-4 flex flex-col"><div class="flex flex-row justify-evenly"><img class="w-12 h-12 custom-animate-flip" src="/images/tiles/light_l.svg" alt="light_l"><img class="w-12 h-12" src="/images/tiles/light_i.svg" alt="light_i"><img class="w-12 h-12" src="/images/tiles/light_g.svg" alt="light_g"><img class="w-12 h-12" src="/images/tiles/light_h.svg" alt="light_h"><img class="w-12 h-12" src="/images/tiles/light_t.svg" alt="light_t"></div><span class="sm:ml-6 ml-4 my-2">The letter <b>L</b> is placed in correct position.</span><div class="flex flex-row justify-evenly"><img class="w-12 h-12" src="/images/tiles/unity_u.svg" alt="unity_u"><img class="w-12 h-12" src="/images/tiles/unity_n.svg" alt="unity_n"><img class="w-12 h-12 custom-animate-flip" src="/images/tiles/unity_i.svg" alt="unity_i"><img class="w-12 h-12" src="/images/tiles/unity_t.svg" alt="unity_t"><img class="w-12 h-12" src="/images/tiles/unity_y.svg" alt="unity_y"></div><span class="sm:ml-6 ml-4 my-2">The letter <b>I</b> is in the word but misplaced.</span><div class="flex flex-row justify-evenly"><img class="w-12 h-12" src="/images/tiles/point_p.svg" alt="point_p"><img class="w-12 h-12" src="/images/tiles/point_o.svg" alt="point_o"><img class="w-12 h-12" src="/images/tiles/point_i.svg" alt="point_i"><img class="w-12 h-12 custom-animate-flip" src="/images/tiles/point_n.svg" alt="point_n"><img class="w-12 h-12" src="/images/tiles/point_t.svg" alt="point_t"></div><span class="sm:ml-6 ml-4 my-2">The letter <b>N</b> is in not in the word.</span></div></div> ',
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