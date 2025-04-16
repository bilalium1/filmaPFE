import {motion} from 'motion/react'
import pic from "../assets/dune.jpg"

function Tete () {
    
    return (
        <div className="relative flex w-full h-[40vw] mt-15">
            <motion.img whileInView={{opacity:0.7}} src={pic} className='absolute inset-x-0 -top-20 blur-[50px] size-[150%] object-cover opacity-0 -z-1 saturate-80'/>
            <div className="relative mx-auto flex w-95/100 h-full border-t-[2px] border-stone-100/50 rounded-3xl overflow-hidden [box-shadow:0px_5px_10px_0px_rgba(0,0,0,0.5)] hover:shadow-xl transition-all duration-500 hover:border-stone-100/80">
                <div className='absolute w-full h-full bg-white/10 z-2 pointer-events-none [box-shadow:inset_0px_0px_100px_0px_rgba(0,0,0,0.5)]'></div>
                    <motion.img whileHover={{scale:1.05}}  className='absolute flex duration-300 w-full h-full object-cover contrast-90 opacity-80 hover:opacity-100 hover:saturate-120' src={pic} alt="10"/>
                    <div className="flex border-white border-t-[1px] mt-auto mb-5 mx-auto bg-stone-950/50 w-24/25 h-10 rounded-xl backdrop-blur-[5px] shadow-xl overflow-hidden hover:h-30 transition-all duration-300">
                        <h3 className="flex lg:w-1/3 w-2/3 pl-2 pt-0.5 font-bold text-3xl lg:text-xl h-10 z-1 backdrop-blur-5px transition-all">
                        ❯❯ Dune : Messiah
                        </h3>
                        <h3 className="absolute lg:w-39/120 w-2/3 pl-2 font-bold bg-linear-20 from-white/0 from-50% to-amber-500/50 text-amber-300 text-xl rounded-2xl h-10 text-right p-1.5 pr-4 z-1 backdrop-blur-5px transition-all">✪ 9.1</h3>
                        <p className='absolute lg:w-1/3 w-2/3 h-full pt-10 pl-4 text-left text-sm text-stone-200 transition-all'> ▸ In Earth's future, a global crop blight and second Dust Bowl are slowly rendering the planet uninhabitable.</p>

                        <div className='hidden lg:flex absolute w-1/3 h-30 inset-x-1/3 border-solid border-x-[1px] transition-all'>
                            <h3 className='pt-2 h-8 w-2/3 font-light'>Drama  ●  Sci-fi  ●  Action</h3>
                            <h3 className='pt-2 h-10 w-1/3 border-l-[1px] border-solid font-light'>2024/04/02</h3>
                            <button className="p-0 absolute inset-y-1/3 w-full h-1/3 text-white hover:bg-white transition-all hover:cursor-pointer hover:text-black border-white border-solid border-t-[1px]">❯❯ Visiter l'homepage</button>
                            <button className="p-0 absolute inset-y-2/3 w-full h-1/3 text-white hover:bg-white transition-all hover:cursor-pointer hover:text-black border-white border-solid border-t-[1px]">❯❯ Regarder le Trailer</button>
                        </div>
                    <div className='absolute flex w-1/3 h-full right-0 gap-2 '>
                        <button className="p-0 relative hover:text-3xl ml-3 w-26/40 h-8/10 rounded-md my-auto bg-stone-600/70 text-white hover:bg-white/100 transition-all hover:cursor-pointer hover:text-stone-700">Regarder ►</button>
                        <button className="p-0 relative hover:text-3xl mr-3 w-1/4 h-4/5 rounded-md my-auto bg-stone-600/70 text-redz-500 hover:bg-white/100 transition-all hover:cursor-pointer hover:text-redz-500 ">❤︎</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tete;
