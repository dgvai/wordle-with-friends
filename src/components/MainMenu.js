import {useNavigate} from 'react-router-dom'
import ExampleTiles from './ExampleTiles'

export default function MainMenu() {

  let navigate = useNavigate()

  return (
    <div className="flex flex-col">
      <ExampleTiles />
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