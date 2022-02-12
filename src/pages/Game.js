import GameBody from '../components/GameBody';
import Controller from '../components/Controller';
import Header from './../components/Header';
import { useParams } from 'react-router-dom';
import { useContext, useEffect} from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { GameContext } from '../hooks/GameContext';
import WinBoard from '../components/WinBoard';
import LoseBoard from '../components/LoseBoard';
import { GameStates } from '../constants/games';

export default function Game() {

  const {gameId} = useParams()
  const db = getFirestore();
  const {boardState, setBoardState} = useContext(GameContext)

  async function setGameData() {
    const gameDocRef = doc(db, "games", gameId)
    const gameSnap = await getDoc(gameDocRef);

    if(gameSnap.exists()) {

        localStorage.setItem('currentGameId', gameId)
        localStorage.setItem('currentGameRows', gameSnap.data().tries)
        localStorage.setItem('currentGameCols', gameSnap.data().length)
        localStorage.setItem('currentGameHint', gameSnap.data().hint)

    } else {
      console.log('No game found')
    }
  }

  useEffect(() => {

    setGameData()

    const prevBoardState = JSON.parse(localStorage.getItem('boardState'));

    if(prevBoardState) {
      if(prevBoardState.id == gameId) {
        setBoardState(prevBoardState);
      } else {
        setBoardState({...boardState, id: gameId})
      }
    } else {
      setBoardState({...boardState, id: gameId})
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('boardState', JSON.stringify(boardState))
  })

  function renderStatefulObject() {
    switch(boardState.state) {
      case GameStates.Won: return <WinBoard />
      case GameStates.Lost: return <LoseBoard />
      default: return <Controller />
    }
  }

  return (

    <div className="container mx-auto max-w-md h-screen flex flex-col overflow-hidden">
      <Header gameScreen={true}/>
      <GameBody />
      {renderStatefulObject()}
    </div>
  )
}