
import filmalogo from '../assets/filma.png'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import DropMenu from './dropMenu.jsx'

function NavBar({medias}){

    const navigate = useNavigate()

    const drops = {
      "About" : "/about",
      "Films" : "/api/movies/popular",
      "Series": "/api/tv/popular"
    }

    const buttoncss="px-4 mx-1 my-auto h-4/5 rounded-md text-stone-100 font-light tracking-wider hover:text-stone-950 transition-all b ease-out hover:px-6 hover:text-lg hover:backdrop-brightness-400 hover:font-black cursor-pointer"
    return (
        <div className="fixed top-5 my-auto z-10 flex w-19/20 h-12 left-1/2 transform -translate-x-1/2 rounded-xl bg-stone-950/50 backdrop-blur-sm border-[2px] border-stone-100/0 hover:border-stone-100/100 transition-all">
            <p onClick={() => navigate('/')} className="px-5 my-auto h-4/5 rounded-md text-stone-100 font-light tracking-wider text-3xl hover:rotate-x-10 transition-all cursor-pointer hover:font-black"> FIL.MA </p>
            <button onClick={() => navigate('/about')} className={`${buttoncss}`}>✦︎ About</button>
            <button className={`${buttoncss}`}>➥ Films</button>
            <button className={`${buttoncss}`}>➥ Dicouvrir</button>
            <button className={`${buttoncss}`}>➥ Genres</button>

            <DropMenu title={"Medias"} elements={drops} css={buttoncss} />

            <button className={`absolute right-1 top-1 ${buttoncss}`}>❯❯ Se Connecter</button>
        </div>
    )
}

export default NavBar