import Header from './../components/Header';
import { useLocation } from 'react-router-dom';
import { CopyToClipboard } from '../classes/ClipboardCopier';

export default function Share() {

  const {state} = useLocation();
  const {gameId} = state;
  const gameLink = process.env.REACT_APP_SITE_URL+'/'+gameId;

  return (
    <div>
      <div className="container mx-auto max-w-md h-screen flex flex-col">
        <Header/>
        <div className="flex flex-col justify-center flex-grow">
          <img src="/images/success.svg" alt="Success Icon" className="w-64 mx-auto custom-animate-bounce"/>
          <span className='text-2xl text-center mt-3 font-light text-gray-600'>The wordle has been created!</span>
          <span className='text-center font-light text-sm tracking-wider'>Challenge your friend!</span>
          <input id="link" type="text" value={gameLink} readOnly={true} onClick={() => CopyToClipboard(gameLink)}
            className="my-3 text-gray-600 rounded-xl focus:shadow-xl border-green-400 border-2 bg-gray-100 p-4 mx-3 text-sm" 
          />
          <button id="copyBtn" onClick={() => CopyToClipboard(gameLink)} className={"rounded-xl bg-green-400 w-32 text-2xl p-4 text-white font-medium uppercase mx-auto"}>
            Copy
          </button>
        </div>
      </div>
    </div>
  )
}