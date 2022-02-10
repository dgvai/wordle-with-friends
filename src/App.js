import Create from './pages/Create';
import Game from './pages/Game';
import Home from './pages/Home';
import Share from './pages/Share';
import { GameProvider } from './hooks/GameContext';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/create" element={<Create />} />
          <Route path="/share" element={<Share />} />
          <Route path="/:gameId" element={<Game />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </GameProvider>
  );
}

export default App;
