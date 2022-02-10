import Home from './pages/Home';
import Create from './pages/Create';
import Share from './pages/Share';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/create" element={<Create />} />
        <Route path="/share" element={<Share />} />
        <Route path="/:gameId" />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
