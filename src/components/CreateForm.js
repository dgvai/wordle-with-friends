import { getFirestore, collection, addDoc } from "firebase/firestore"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateForm() {

  const navigate = useNavigate();
  
  const [word, setWord] = useState("");
  const [hint, setHint] = useState("");
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const created_at = (new Date()).toISOString()
  const length = 5;
  const tries = 6;
  
  async function handleCreateWord(event) {
    
    event.preventDefault();

    if(word.length != length) {
      setInvalid(true)
      return;
    }

    try {
      setLoading(true);
      const validWordCheck = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      
      if(validWordCheck.status === 404) {
        setInvalid(true);
        setLoading(false);
        return;
      }

      const db = getFirestore();

      try {
        const docRef = await addDoc(collection(db, 'games'), {
          word, hint, length, tries, created_at
        })

        if(docRef.id) {
          navigate('/share', {state : {gameId: docRef.id}})
        }
        
      } catch(e) {
        console.log(e, 'Unexpected Exception from Firestore')
      }


    } catch(e) {
      console.log(e, 'Unexpected Exception')
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
      {invalid && 
        <p className="m-2 p-4 text-justify bg-red-100 rounded-lg text-gray-700 font-bold text-xs transition-all">
          Invalid word! Try again!
        </p>
      }
      <form onSubmit={handleCreateWord} className="flex flex-col">
        <label className="mx-3 mb-1 p-1 text-gray-400 uppercase tracking-wider font-light">Enter word</label>
        <input id="word" type="text" maxLength="5" value={word} onChange={e => setWord(e.target.value)}
          className="mb-3 text-green-400 font-extrabold rounded-xl focus:shadow-xl border-green-400 border-2 bg-gray-100 p-4 mx-3 text-2xl uppercase text-center" 
        />

        <label className="mx-3 mb-1 p-1 text-gray-400 uppercase tracking-wider font-light">Hints (optional)</label>
        <input id="hint" type="text" value={hint} onChange={e => setHint(e.target.value)}
          className="mb-3 text-gray-600 rounded-xl focus:shadow-xl border-green-400 border-2 bg-gray-100 p-4 mx-3 text-2xl" 
        />
        <button type="submit" disabled={loading} className={"rounded-xl bg-green-400 w-64 text-2xl p-4 text-white font-medium uppercase mx-auto my-3"}>
          {loading ? '...' : 'Create!'}
        </button>
      </form>
    </div>
  )
}