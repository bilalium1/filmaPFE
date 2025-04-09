import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Button from '@mui/material/Button';

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className='w-full h-full flex-row'>
        <h3>LE FRONTEND N'EST PAS ENCORE FINI </h3>
        <Tete/>
        <NavBar/>
      </div>
    </>
  )
}

export default App
