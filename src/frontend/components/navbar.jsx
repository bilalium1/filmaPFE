
import filmalogo from '../assets/filma.png'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import DropMenu from './dropMenu.jsx'
import { FaSearch } from "react-icons/fa";
import SearchBar from './searchBar.jsx';

function NavBar({medias}){

    const [s_open, setSopen] = useState(false)

    const navigate = useNavigate()

    const films = {
        "✦ films Populaires" : "/api/movies/popular",
        "✦ films Tendances" : "/api/movies/popular",
        "✦ films Recentes": "/api/movies/popular"
    }

    const series = {
        "✦ series Populaires" : "/api/tv/popular",
        "✦ series Tendances" : "/api/tv/popular",
        "✦ series Recentes": "/api/tv/popular"
    }

    const theatres = {
        "✦ Theatres Publiques" : "/api/tv/popular",
        "✦ Theatres Privees" : "/api/tv/popular",
        "✦ Theatres Amicals": "/api/tv/popular"
    }

    const buttoncss=" h-3/4 rounded-sm mx-2 mt-1.5 hover:backdrop-brightness-200 transition-all px-3 uppercase cursor-pointer"
    return (
        <div className="fixed inline-flex top-5 gap-0 my-auto z-10 w-19/20 h-12 left-1/2 transform -translate-x-1/2 rounded-md bg-stone-950/50 backdrop-blur-sm border-[2px] border-stone-100/0 hover:border-stone-100/100 transition-all">
            <p onClick={() => navigate('/')} className="px-5 my-auto h-4/5 rounded-md text-stone-100 font-light tracking-wider text-3xl hover:rotate-x-10 transition-all cursor-pointer hover:font-black"> FIL.MA 🇲🇦 </p>
            <button onClick={() => navigate('/about')} className={`${buttoncss}`}>✦︎ About</button>

            <DropMenu title={"Films"} elements={films} css={buttoncss} />
            <DropMenu title={"Series"} elements={series} css={buttoncss} />
            <DropMenu title={"Theatres"} elements={theatres} css={buttoncss} />

            <FaSearch onClick={() => setSopen(!s_open)} className='hover:backdrop-brightness-150 size-9 rounded-sm p-3 cursor-pointer my-auto'/>

            <SearchBar css={ s_open ? "opacity-100 mt-15 blur-0" : "opacity-0 mt-10 pointer-events-none"}/>

            <button onClick={() => navigate('/auth')} className={`absolute right-0 ${buttoncss}`}>❯❯ Se Connecter</button>
        </div>
    )
}

export default NavBar