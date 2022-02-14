import { getDocs, getFirestore, collection, limit, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import ExampleTiles from './ExampleTiles'

export default function MainMenu() {

  const navigate = useNavigate()
  const [recentGames, pushGames] = useState([])

  useEffect(async () => {
    
    const db = getFirestore();
    const q = query(collection(db, "games"), orderBy("created_at", "desc"), limit(5));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      pushGames(recentGames => [...recentGames, {id: doc.id, data: doc.data()}])
    });

  },[])

  return (
    <div className="flex flex-col">
      <ExampleTiles />
      <button onClick={() => navigate('/create')}  className="rounded-full bg-green-400 w-64 text-2xl p-2 text-white font-medium uppercase mx-auto my-3">
        Create Word
      </button>
      <div className="m-2 mt-4 p-4 bg-gray-700 rounded-lg">
        <span className="text-gray-200 font-bold uppercase tracking-wide">Recently created</span>
        {recentGames.map((game, i) => (
          <div key={i} className="flex flex-row justify-between text-gray-400 my-1 divide-y-reverse divide-y-2 divide-gray-600">
            <div className="rounded-full bg-gray-200 text-xl w-8 h-8 text-gray-800 font-bold text-center my-auto">
              {game.data.length}
            </div>
            <div className="flex-grow flex flex-col my-auto px-2">
              <div className="flex justify-between text-xs">
                <span>Created By</span>
                <span>{game.data.solves || 0} solves</span>
              </div>
              <span className="font-bold text-green-400">{game.data.name}</span>
            </div>
            <Link to={'/'+game.id} className="rounded-full bg-green-400 text-xl w-8 h-8 text-gray-100 font-black text-center my-auto">→</Link>
          </div>
        ))}
      </div>
      <p className="m-2 p-4 text-justify bg-gray-100 rounded-lg text-gray-700 text-xs">
        This game <b>Wordle</b> was popularised by <i>Lingo</i>, a game show. Recently a daily wordle game created by <i>Josh Wardle</i> has gone viral. The gameplay of this game is similar, however, here you set 
        the word and challenge your friends to find out the word! 
        <br/> In addition to the original game, you can set hints (optional).
      </p>
    </div>
  )
}