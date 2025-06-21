
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage.jsx';
import Aboutpage from './pages/aboutpage.jsx';
import MoviePage from './pages/moviepage.jsx';
import TvPage from './pages/tvpage.jsx';
import Auth from './pages/authpage.jsx';
import { AuthProvider } from './context/AuthContext';
import ChatBot from './components/ChatBot.jsx';
import Footer from './pages/Footer.jsx';
import TheaterPage from './pages/theaterpage.jsx'
import UserPage from './pages/userpage.jsx';
import Chat from './components/Chat.jsx'
import ForumPage from "./pages/forumpage.jsx";
import PopularMovies from './pages/filmspage.jsx';
import TVShows from './pages/seriespage.jsx';

function App() {
    return (
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Router>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/about" element={<Aboutpage />} />
              <Route path="/films/:id" element={<MoviePage />}/>
              <Route path="/series/:id/:season/:episode" element={<TvPage />}/>
              <Route path="/auth" element={<Auth/>}/>
              <Route path="/theatres" element={<TheaterPage/>}/>
              <Route path="/user/:id" element={<UserPage/>}/>
              <Route path="/theatre/:id" element={<ForumPage/>}></Route> 
              <Route path="/films" element={<PopularMovies/>}></Route>
              <Route path="/series" element={<TVShows/>}></Route> 
            </Routes>
          </Router>
          <Footer /> 
          <Chat/> 
          <ChatBot />
        </div>
      </AuthProvider>
    );
}

export default App