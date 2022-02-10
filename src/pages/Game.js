import GameBody from '../components/GameBody';
import Keyboard from '../components/Keyboard';
import Header from './../components/Header';

export default function Game() {
  return (
    <div className="container mx-auto max-w-md h-screen flex flex-col">
      <Header/>
      <GameBody />
      <Keyboard />
    </div>
  )
}