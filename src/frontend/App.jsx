
import './App.css'
import { motion } from "motion/react"
import pic from "./assets/int.jpg"
import { Scale } from '@mui/icons-material';
import Tete from './components/tete.jsx'
import NavBar from './components/navbar.jsx';
import Category from './components/Category2.jsx'
import CategoryDiv from './components/Categorydiv.jsx'

function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<Aboutpage />} />
          <Route path="/films/:id" element={<MoviePage />}/>
          <Route path="/series/:id" element={<TvPage />}/>
        </Routes>
      </Router>
    );
}

export default App
