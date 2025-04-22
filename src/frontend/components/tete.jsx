import {motion} from 'motion/react'
import pic from "../assets/dune.jpg"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Tete () {

    const [sauve, setSauve] = useState(false);

    const [ desc, setDesc] = useState(false)
    const navigate = useNavigate()
    
    return (
        <div className="relative flex w-full h-[40vw] mt-15">
            <motion.img whileInView={{opacity:1}} src={pic} className='absolute inset-x-0 -top-20 blur-[50px] size-[150%] object-cover opacity-0 -z-1 saturate-80'/>
            <div className="relative mx-auto flex w-95/100 h-full border-t-[2px] border-stone-100/50 rounded-md overflow-hidden [box-shadow:0px_5px_10px_0px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-stone-100/80">
                <div className='absolute w-full h-full bg-white/10 z-2 pointer-events-none [box-shadow:inset_0px_0px_100px_0px_rgba(0,0,0,0.5)]'/>
                    <img className='absolute transition-all flex w-full h-full object-cover opacity-100' src={pic} alt="10"/>

                    <div className='absolute inline-flex gap-3 top-3 w-full h-20'>

                        <p className='relative p-1.5 tracking-[1px] text-6xl bg-stone-950/50 [box-shadow:0px_10px_20px_0px_rgba(0,0,0,0.3)] px-4 text-left w-auto h-10 rounded-lg backdrop-blur-sm text-white z-3 font-chakra font-bold uppercase left-3'>Yacine 13</p>
                        <p className='relative p-1.5 tracking-wide text-lg bg-stone-950/50 px-4 text-left w-auto h-10 rounded-lg backdrop-blur-sm text-white z-3 font-light uppercase left-3'> ▧ Film </p>
                        <p className='relative p-1.5 tracking-wide text-lg bg-amber-300/50 px-4 text-left w-auto h-10 rounded-lg backdrop-blur-sm text-white z-3 font-light uppercase left-3'> ★ 9.1 </p>
                        <p className={`absolute ${ sauve ? "opacity-100" : "opacity-0"} p-1.5 tracking-wide text-lg bg-pink-400/80 px-4 text-left w-auto h-10 rounded-lg backdrop-blur-sm text-white z-3 font-light uppercase right-3 transition-all`}> Favorite </p>

                    </div>

                    <button onClick={() => navigate('/films/tt1160419') } className='absolute right-16 bottom-3 bg-stone-950/50 w-50 backdrop-blur-sm h-10 rounded-lg cursor-pointer text-stone-100 text-md p-1 font-bold hover:bg-stone-200 hover:text-stone-800 transition-all'> ► </button>
                    <button onClick={() => setSauve(!sauve)} className={`absolute right-3 bottom-3 ${ sauve ? "bg-pink-600/50" : "bg-pink-500"} w-10 backdrop-blur-sm h-10 rounded-lg cursor-pointer text-stone-100 text-md p-1 font-bold hover:bg-pink-500 active:bottom-2 hover:text-stone-800 transition-all`}> {` ${ sauve ? "✖" : "❤"}`} </button>
                    <button onClick={() => setDesc(!desc)} className={`absolute ${ desc ? "-rotate-180" : "rotate-0"} left-3 bottom-3 w-10 h-10 bg-stone-950/50 backdrop-blur-sm rounded-lg transition-all duration-500 text-xl cursor-pointer`}>◥</button>
                    <div className={`absolute ${ desc ? "bottom-16 opacity-100 pointer-events-auto" : "opacity-0 bottom-10 pointer-events-none"} left-3 w-70 xl:h-72 h-50 bg-stone-950/50 backdrop-blur-sm rounded-lg transition-all duration-500 cursor-pointer`}>
                        <p className='p-5 text-left text-sm'>
                        ✸ 
                        Dune is set in the distant future in a feudal interstellar society, descended from terrestrial humans, in which various noble houses control planetary fiefs.
                        </p>
                        <p className='p-5 text-left text-sm'>
                        Action ✖ Sci-fi ✖ Fantastique
                        </p>
                    </div>

            </div>
        </div>
    )
}

export default Tete;
