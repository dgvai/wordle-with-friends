import {useNavigate} from 'react-router-dom'

export default function MainMenu() {

  let navigate = useNavigate()

  return (
    <div className="flex flex-col">
      <div className="m-2 p-4 flex flex-col">
        <div className="flex flex-row justify-evenly">
          <div className="bg-green-500 text-gray-100 w-12 h-12 text-4xl font-bold text-center">L</div>
          <div className="bg-gray-50 w-12 h-12 text-4xl font-bold border-2 text-center">I</div>
          <div className="bg-gray-50 w-12 h-12 text-4xl font-bold border-2 text-center">G</div>
          <div className="bg-gray-50 w-12 h-12 text-4xl font-bold border-2 text-center">H</div>
          <div className="bg-gray-50 w-12 h-12 text-4xl font-bold border-2 text-center">T</div>
        </div>
        <span className="sm:ml-6 ml-4 my-2">The letter <b>L</b> is placed in correct position.</span>

        <div className="flex flex-row justify-evenly">
          <div className="bg-gray-50 w-12 h-12 text-4xl font-bold border-2 text-center">U</div>
          <div className="bg-gray-50 w-12 h-12 text-4xl font-bold border-2 text-center">N</div>
          <div className="bg-yellow-500 text-gray-100 w-12 h-12 text-4xl font-bold text-center">I</div>
          <div className="bg-gray-50 w-12 h-12 text-4xl font-bold border-2 text-center">T</div>
          <div className="bg-gray-50 w-12 h-12 text-4xl font-bold border-2 text-center">Y</div>
        </div>
        <span className="sm:ml-6 ml-4 my-2">The letter <b>I</b> is in the word but misplaced.</span>

        <div className="flex flex-row justify-evenly">
          <div className="bg-gray-50 w-12 h-12 text-4xl font-bold border-2 text-center">P</div>
          <div className="bg-gray-50 w-12 h-12 text-4xl font-bold border-2 text-center">O</div>
          <div className="bg-gray-50 w-12 h-12 text-4xl font-bold border-2 text-center">I</div>
          <div className="bg-gray-500 text-gray-100 w-12 h-12 text-4xl font-bold text-center">N</div>
          <div className="bg-gray-50 w-12 h-12 text-4xl font-bold border-2 text-center">T</div>
        </div>
        <span className="sm:ml-6 ml-4 my-2">The letter <b>N</b> is in not in the word.</span>
      </div>
      <button onClick={() => navigate('/create')}  className="rounded-full bg-green-400 w-64 text-2xl p-2 text-white font-medium uppercase mx-auto my-3">
        Create Word
      </button>
      <p className="m-2 p-4 text-justify bg-gray-100 rounded-lg text-gray-700 text-xs">
        This game <b>Wordle</b> was popularised by <i>Lingo</i>, a game show. Recently a daily wordle game created by <i>Josh Wardle</i> has gone viral. The gameplay of this game is similar, however, here you set 
        the word and challenge your friends to find out the word! 
        <br/> In addition to the original game, you can set hints (optional).
      </p>
    </div>
  )
}