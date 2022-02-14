import GameBody from '../components/GameBody';
import Controller from '../components/Controller';
import Header from './../components/Header';
import { useParams } from 'react-router-dom';
import { useContext, useEffect} from 'react';
import { GameContext } from '../hooks/GameContext';
import WinBoard from '../components/WinBoard';
import LoseBoard from '../components/LoseBoard';
import { GameStates } from '../constants/games';
import { loadNewGameData } from '../classes/WordleEngine';
import LoadScreen from '../components/LoadScreen';

export default function Game() {

  const {gameId} = useParams()
  const prevBoardState = JSON.parse(localStorage.getItem('boardState'));
  const {boardState, setBoardState} = useContext(GameContext)

  useEffect(async () => {
    if(prevBoardState) {
      if(prevBoardState.id == gameId) {
        setBoardState(prevBoardState);
      } else {
        await loadNewGameData(boardState, setBoardState, gameId)
      }
    } else {
      await loadNewGameData(boardState, setBoardState, gameId)
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
      {boardState.id ? <GameBody /> : <LoadScreen/>}
      {renderStatefulObject()}
    </div>
  )
}