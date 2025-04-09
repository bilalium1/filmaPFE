import { useState } from 'react'
import './App.css'
import  Tete from './components/tete.jsx'
import  NavBar  from './components/navbar.jsx'
import  Category from './components/Category2.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className='w-full h-full flex-row'>
        <h3>LE FRONTEND N'EST PAS ENCORE FINI </h3>
        <Tete/>
        <Category/>
        <NavBar/>
      </div>
  )
}

export default App
