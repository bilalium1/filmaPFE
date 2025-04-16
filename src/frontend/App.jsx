import { useState } from 'react'
import './App.css'
import { motion } from "motion/react"
import pic from "./assets/int.jpg"
import { Scale } from '@mui/icons-material';
import Tete from './components/tete.jsx'
import Navbar from './src/frontend/components/navbar'; 
import Category from './components/Category2.jsx'
import CategoryDiv from './components/Categorydiv.jsx'
import App from './src/frontend/App.jsx'; 
import App from '@/frontend/App.jsx';  



function App() {
  const [count, setCount] = useState(0)

  return (
      <div className='w-full h-full flex-col'>
        <h3>LE FRONTEND N'EST PAS ENCORE FINI </h3>
        <Tete/>
        <NavBar/>
        <CategoryDiv title="Favorites"/>
        <CategoryDiv title="Drama"/>
      </div>
  )
}

export default App
