
import filmalogo from '../assets/filma.png'

function NavBar(){

    const buttoncss="px-4 mx-1 my-auto h-4/5 rounded-md text-indigo-100 font-light tracking-wider hover:text-indigo-950 transition-all b ease-out hover:px-6 hover:text-lg hover:backdrop-brightness-400 hover:font-black cursor-pointer"
    return (
        <div className="fixed top-5 z-2 flex w-19/20 h-12 left-1/2 transform -translate-x-1/2 rounded-xl bg-indigo-950/50 backdrop-blur-sm border-[2px] border-indigo-100/0 hover:border-indigo-100/100 transition-all">
            <p className="px-5 mx-1 my-auto h-4/5 rounded-md text-indigo-100 font-extrabold tracking-wider text-3xl"> FIL.MA </p>
            <button className={`${buttoncss}`}>✦︎ About</button>
            <button className={`${buttoncss}`}>➥ Films</button>
            <button className={`${buttoncss}`}>➥ Dicouvrir</button>
            <button className={`${buttoncss}`}>➥ Series</button>
            <button className={`absolute right-1 top-1 ${buttoncss}`}>❯❯ Se Connecter</button>
        </div>
    )
}

export default NavBar