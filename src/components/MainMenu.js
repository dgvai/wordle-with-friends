import {useNavigate} from 'react-router-dom'

export default function MainMenu() {

  let navigate = useNavigate()

  return (
    <div className="flex flex-col">
      <p className="m-2 p-4 text-justify bg-gray-100 rounded-lg text-gray-700">
        This game is the same as <b>Wordle</b> game, by <i>Josh Wordle</i>. Instead, here you set 
        the word and challenge your friends to find out the word! 
        <br/> In addition to the original game, you can set hints (optional).
      </p>
      <button onClick={() => navigate('/create')}  className="rounded-full bg-green-400 w-64 text-2xl p-2 text-white font-medium uppercase mx-auto my-3">
        Create Word
      </button>
    </div>
  )
}