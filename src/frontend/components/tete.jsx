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

                        <p className='relative p-1.50 tracking-[1px] text-4xl lg:text-6xl bg-stone-950/50 [box-shadow:0px_10px_20px_0px_rgba(0,0,0,0.3)] lg:px-4 px-2 text-left w-auto lg:h-10 h-6 lg:rounded-lg rounded-sm backdrop-blur-lg text-white z-3 font-chakra font-bold uppercase left-3'>Dune</p>
                        <p className='relative lg:p-1.5 p-1 tracking-wide text-xs lg:text-lg bg-stone-950/50 lg:px-4 px-2 text-left w-auto lg:h-10 h-6 lg:rounded-lg rounded-sm backdrop-blur-lg text-white z-3 font-light uppercase left-3'>▧ Film</p>
                        <p className='relative lg:p-1.5 p-1 tracking-wide text-xs lg:text-lg bg-amber-300/50 lg:px-4 px-2 text-left w-auto lg:h-10 h-6 slg:rounded-lg rounded-sm backdrop-blur-lg text-white z-3 font-light uppercase left-3'>★ 9.1</p>
                        <p className={`absolute ${ sauve ? "opacity-100" : "opacity-0"} lg:p-1.5 p-1 tracking-wide text-xs lg:text-lg bg-pink-400/80 lg:px-4 px-2 text-left w-auto lg:h-10 h-6 lg:rounded-lg rounded-sm backdrop-blur-lg text-white z-3 font-light uppercase right-3 transition-all`}>Favorite</p>

                    </div>

                    <button onClick={() => navigate('/films/tt1160419') } className='absolute lg:right-16 right-10 bottom-3 bg-stone-950/50 lg:w-50 w-30 backdrop-blur-lg lg:h-10 h-6 lg:rounded-lg rounded-sm cursor-pointer text-stone-100 lg:text-md text-xs p-1 font-bold hover:bg-stone-200 hover:text-stone-800 transition-all'> ► </button>
                    <button onClick={() => setSauve(!sauve)} className={`absolute right-3 bottom-3 ${ sauve ? "bg-pink-600/50" : "bg-pink-500"} lg:w-10 w-6 backdrop-blur-lg lg:h-10 h-6 lg:rounded-lg rounded-sm cursor-pointer text-stone-100 lg:text-md text-xs p-1 font-bold hover:bg-pink-500 active:bottom-2 hover:text-stone-800 transition-all`}> {` ${ sauve ? "✖" : "❤"}`} </button>
                    <button onClick={() => setDesc(!desc)} className={`absolute ${ desc ? "-rotate-180" : "rotate-0"} left-3 bottom-3 lg:w-10 w-6 lg:h-10 h-6 bg-stone-950/50 backdrop-blur-lg lg:rounded-lg rounded-sm transition-all duration-500 lg:text-xl text-m cursor-pointer`}>◥</button>
                    <div className={`absolute pointer-events-none ${ desc ? "lg:bottom-16 bottom-10 opacity-100" : "opacity-0 bottom-5"} left-3 lg:w-70 w-40 xl:h-72 lg:h-50 h-20 bg-stone-950/50 backdrop-blur-lg lg:rounded-lg rounded-sm transition-all duration-500 cursor-pointer`}>
                        <p className='lg:p-5 p-1 text-left lg:text-lg text-[6px]'>
                        ✸ 
                        Dune is set in the distant future in a feudal interstellar society, descended from terrestrial humans, in which various noble houses control planetary fiefs.
                        </p>
                        <p className='lg:p-5 p-1 text-left lg:text-lg text-[6px]'>
                        Action ✖ Sci-fi ✖ Fantastique
                        </p>
                    </div>

            </div>
        </div>
    )
}

export default Tete;
