import {motion} from 'motion/react'
import pic from "../assets/dune.jpg"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Tete () {

    const [ desc, setDesc] = useState(false)
    const navigate = useNavigate()
    
    return (
        <div className="relative flex w-full h-[40vw] mt-15">
            <motion.img whileInView={{opacity:1}} src={pic} className='absolute inset-x-0 -top-20 blur-[50px] size-[150%] object-cover opacity-0 -z-1 saturate-80'/>
            <div className="relative mx-auto flex w-95/100 h-full border-t-[2px] border-stone-100/50 rounded-xl overflow-hidden [box-shadow:0px_5px_10px_0px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-stone-100/80">
                <div className='absolute w-full h-full bg-white/10 z-2 pointer-events-none [box-shadow:inset_0px_0px_100px_0px_rgba(0,0,0,0.5)]'/>
                    <img className='absolute transition-all flex w-full h-full object-cover opacity-100' src={pic} alt="10"/>

                    <div className='absolute inline-flex gap-3 top-3 w-full h-20'>

                        <p className='relative p-1.5 tracking-[1px] text-5xl bg-stone-950/50 shadow-xl px-4 text-left w-auto h-10 rounded-lg backdrop-blur-sm text-white z-3 font-chakra font-bold uppercase left-3'> Dune </p>
                        <p className='relative p-1.5 tracking-wide text-lg bg-stone-950/50 px-4 text-left w-auto h-10 rounded-lg backdrop-blur-sm text-white z-3 font-light uppercase left-3'> ▧ Film </p>
                        <p className='relative p-1.5 tracking-wide text-lg bg-amber-300/50 px-4 text-left w-auto h-10 rounded-lg backdrop-blur-sm text-white z-3 font-light uppercase left-3'> ★ 9.1 </p>

                    </div>

                    <button onClick={() => navigate('/films/tt1160419') } className='absolute right-16 bottom-3 bg-stone-950/50 w-50 backdrop-blur-sm h-10 rounded-lg cursor-pointer text-stone-100 text-md p-1 font-bold hover:bg-stone-200 hover:text-stone-800 transition-all'> ► </button>
                    <button className='absolute right-3 bottom-3 bg-pink-800/50 w-10 backdrop-blur-sm h-10 rounded-lg cursor-pointer text-stone-100 text-md p-1 font-bold hover:bg-pink-500 hover:text-stone-800 transition-all'> ❤︎ </button>
                    <button onClick={() => setDesc(!desc)} className='absolute left-3 bottom-3 w-10 h-10 bg-stone-950/50 backdrop-blur-sm rounded-lg transition-all text-xl cursor-pointer'>{desc ? "◣" : "◥"}</button>
                    {desc && (<div className='absolute left-3 bottom-16 w-70 xl:h-72 h-50 bg-stone-950/50 backdrop-blur-sm rounded-lg transition-all cursor-pointer'>
                        <p className='p-5 text-left text-sm'>
                        ✸ 
                        Dune is set in the distant future in a feudal interstellar society, descended from terrestrial humans, in which various noble houses control planetary fiefs.
                        </p>
                        <p className='p-5 text-left text-sm'>
                        Drama # Sci-fi # Fantasy
                        </p>
                    </div>)}

            </div>
        </div>
    )
}

export default Tete;
