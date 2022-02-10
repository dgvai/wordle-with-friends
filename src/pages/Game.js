import GameBody from '../components/GameBody';
import Keyboard from '../components/Keyboard';
import Header from './../components/Header';
import { useParams } from 'react-router-dom';
import { useContext, useEffect} from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { GameContext } from '../hooks/GameContext';

export default function Game() {

  const {gameId} = useParams()
  const db = getFirestore();
  const [boardState, setBoardState] = useContext(GameContext)

  async function setGameData() {
    const gameDocRef = doc(db, "games", gameId)
    const gameSnap = await getDoc(gameDocRef);

    if(gameSnap.exists()) {

        localStorage.setItem('currentGameId', gameId)
        localStorage.setItem('currentGameRows', gameSnap.data().tries)
        localStorage.setItem('currentGameCols', gameSnap.data().length)

    } else {
      console.log('No game found')
    }
  }

  useEffect(() => {

    setGameData()

    const prevBoardState = JSON.parse(localStorage.getItem('boardState'));

    if(prevBoardState && prevBoardState.id === gameId) {
      setBoardState(prevBoardState);
    } else {
      prevBoardState.id = gameId
      setBoardState(prevBoardState)
    }

  }, []);

  return (
  
    <div className="container mx-auto max-w-md h-screen flex flex-col">
      <Header/>
      <GameBody />
      <Keyboard />
    </div>
  )
}