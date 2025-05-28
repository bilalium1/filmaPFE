
import filmalogo from '../assets/filma.png'
import { useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import DropMenu from './dropMenu.jsx'
import { FaSearch } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import SearchBar from './searchBar.jsx';
import { AuthContext } from '../context/AuthContext.jsx'; 

function NavBar({medias}){

    const {user, isLoading} = useContext(AuthContext);
    const { logout } = useContext(AuthContext);

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

    const buttoncss=" h-3/4 lg:text-lg text-[7px] rounded-sm lg:mx-2 mx-0 mt-1.5 hover:backdrop-brightness-200 transition-all px-3 uppercase cursor-pointer"
    return (
        <div className="fixed inline-flex top-5 gap-0 my-auto z-50 w-19/20 sm:h-12 h-8 left-1/2 transform -translate-x-1/2 rounded-md bg-rose-950/80 backdrop-blur-sm border-1 border-emerald-500/0 hover:border-emerald-500/100 shadow-lg transition-all">
            <p onClick={() => navigate('/')} className="sm:px-5 px-1 my-auto h-4/5 w-auto rounded-md text-stone-100 font-light tracking-wider text-md sm:text-3xl hover:rotate-x-10 transition-all cursor-pointer hover:font-bold hover:text-emerald-500"> ⚝ FIL.MA </p>
            <button onClick={() => navigate('/about')} className={`${buttoncss}`}>✦︎ About</button>

            <DropMenu title={"Films"} elements={films} css={buttoncss} />
            <DropMenu title={"Series"} elements={series} css={buttoncss} />
            <DropMenu title={"Theatres"} elements={theatres} css={buttoncss} />

            <FaSearch onClick={() => setSopen(!s_open)} className='hover:backdrop-brightness-150 size-9 rounded-sm p-3 cursor-pointer my-auto'/>
            { user && (<CiLogout onClick={() => {logout(); navigate('/')}} className='absolute right-2 top-2 hover:bg-red-400 size-8 rounded-sm p-2 bg-red-400/50 cursor-pointer my-auto'/>)}

            <SearchBar css={ s_open ? "opacity-100 mt-15 blur-0" : "opacity-0 mt-10 pointer-events-none"}/>

            <button onClick={() => navigate('/auth')} className={`absolute ${ !user ? "right-0" : "right-10"} ${buttoncss}`}>❯❯ {!user ? "Se Connecter" : user.username}</button>
        </div>
    )
}

export default NavBar