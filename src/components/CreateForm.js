import { getFirestore, collection, addDoc } from "firebase/firestore"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkWordValidity } from "../classes/WordValidity";

export default function CreateForm() {

  const navigate = useNavigate();
  
  const [word, setWord] = useState("");
  const [name, setName] = useState("");
  const [hint, setHint] = useState("");
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState({is: false, text: ''});
  const created_at = (new Date()).toISOString()
  const length = 5;
  const tries = 6;
  
  async function handleCreateWord(event) {
    
    event.preventDefault();

    if(word.length != length) {
      setInvalid({is: true, text: 'Invalid word length!'})
      return;
    }

    if(!name) {
      setInvalid({is: true, text: 'Please provide a name!'})
      return;
    }

    const validWord = checkWordValidity(word)
    
    if(!validWord) {
      setInvalid({is: true, text: 'Invalid english word!'});
      return;
    }

    try {
      setLoading(true)
      const db = getFirestore();
      const docRef = await addDoc(collection(db, 'games'), {
        word, name, hint, length, tries, created_at
      })

      if(docRef.id) {
        navigate('/share', {state : {gameId: docRef.id}})
      }
      
    } catch(e) {
      console.log(e, 'Unexpected Exception from Firestore')
    }
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="m-2 p-4 text-justify bg-gray-100 rounded-lg text-gray-700 text-xs">
        <b>Rules</b>
        <ul>
          <li> &bull; English words.</li>
          <li> &bull; Dictionary valid.</li>
        </ul>
      </div>
      {invalid.is && 
        <p className="m-2 p-4 text-justify bg-red-100 rounded-lg text-gray-700 font-bold text-xs transition-all">
          {invalid.text}
        </p>
      }
      <form onSubmit={handleCreateWord} className="flex flex-col">

        <label className="mx-3 mb-1 p-1 text-gray-400 uppercase tracking-wider font-light">Enter word</label>
        <input id="word" type="text" maxLength="5" value={word} onChange={e => setWord(e.target.value)}
          className="mb-3 text-green-400 font-extrabold rounded-lg focus:shadow-xl border-green-400 border-2 bg-gray-100 p-2 mx-3 text-2xl uppercase text-center" 
        />

        <label className="mx-3 mb-1 p-1 text-gray-400 uppercase tracking-wider font-light">Your Name (Short)</label>
        <input id="name" type="text" maxLength={12} value={name} onChange={e => setName(e.target.value)}
          className="mb-3 text-gray-600 rounded-lg focus:shadow-xl border-green-400 border-2 bg-gray-100 p-2 mx-3 text-2xl" 
        />

        <label className="mx-3 mb-1 p-1 text-gray-400 uppercase tracking-wider font-light">Hints (optional)</label>
        <input id="hint" type="text" value={hint} onChange={e => setHint(e.target.value)}
          className="mb-3 text-gray-600 rounded-lg focus:shadow-xl border-green-400 border-2 bg-gray-100 p-2 mx-3 text-2xl" 
        />

        <button type="submit" disabled={loading} className={"rounded-lg bg-green-400 w-48 text-2xl p-4 text-white font-medium uppercase mx-auto my-3"}>
          {loading ? '...' : 'Create!'}
        </button>
      </form>
    </div>
  )
}