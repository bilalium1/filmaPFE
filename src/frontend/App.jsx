
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage.jsx';
import Aboutpage from './pages/aboutpage.jsx';
import MoviePage from './pages/moviepage.jsx';
import TvPage from './pages/tvpage.jsx';


function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<Aboutpage />} />
          <Route path="/films/:id" element={<MoviePage />}/>
          <Route path="/series/:id/:season/:episode" element={<TvPage />}/>
        </Routes>
      </Router>
    );
}

export default App