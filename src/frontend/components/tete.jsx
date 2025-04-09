import {motion} from 'motion/react'
import pic from "../assets/int.jpg"

function Tete () {
    
    return (
        <div className="relative flex w-full h-full mt-15">
            <motion.img whileInView={{opacity:1}} src={pic} className='absolute inset-x-0 -top-20 contrast-150 brightness-100 saturation-200 blur-[50px] w-dvw opacity-0 -z-1'/>
            <motion.img whileInView={{opacity:1}} src={pic} className='absolute inset-x-0 -top-20 contrast-150 brightness-100 saturation-200 blur-[100px] w-dvw opacity-0 -z-1'/>
            <div className="relative mx-auto flex w-95/100 h-[50vw] border-[2px] border-indigo-900/0 rounded-xl overflow-hidden [box-shadow:0px_10px_10px_5px_rgba(0,0,50,0.5)] hover:shadow-none transition-all hover:w-94/100 hover:h-[48vw] duration-500 hover:border-indigo-100 hover:mt-5">
                <div className='absolute w-full h-full bg-white/10 z-2 pointer-events-none [box-shadow:inset_0px_0px_20px_0px_rgba(0,0,50,0.5)]'></div>
                    <motion.img transition={{type: "cubic"}} whileHover={{scale:1.05}} className='absolute flex duration-500 w-full h-full object-cover' src={pic} alt="10"/>
                    <div className="absolute bottom-0 flex bg-indigo-950/75 w-full h-10 backdrop-blur-[5px] overflow-hidden hover:h-30 transition-all duration-300 backdrop-saturate-300 backdrop-contrast-300">
                        <h3 className="flex pl-2 font-bold text-3xl h-10 w-1/3 z-1 backdrop-blur-5px  ">
                        ❯❯ Interstellar
                        </h3>
                        <h3 className="absolute pt-1 ml-60 font-light text-xl z-1 text-yellow-200 tracking-tighter">✦ 9.1</h3>
                        <p className='absolute h-full w-1/3 pt-10 pl-4 text-left text-sm text-indigo-200'> ▸ In Earth's future, a global crop blight and second Dust Bowl are slowly rendering the planet uninhabitable.</p>
                        <div className='absolute w-1/3 h-30 inset-x-1/3 flex border-solid border-l-[1px]'>
                        <h3 className='pt-2 h-8 w-2/3 font-light'>Drama  ●  Sci-fi  ●  Action</h3>
                        <h3 className='pt-2 h-10 w-1/3 border-l-[1px] border-solid font-light'>2024/04/02</h3>
                        <button className="p-0 absolute inset-y-1/3 w-full h-1/3 text-white hover:bg-white transition-all hover:cursor-pointer hover:text-black border-solid border-t-[1px]">❯❯ Visiter l'homepage</button>
                        <button className="p-0 absolute inset-y-2/3 w-full h-1/3 text-white hover:bg-white transition-all hover:cursor-pointer hover:text-black border-solid border-t-[1px]">❯❯ Regardez le Trailer</button>
                    </div>
                    <div className='absolute flex w-1/3 h-full right-0 '>
                        <button className="p-0 relative hover:text-3xl w-3/4 h-full bg-bluez-500 text-white hover:bg-white/0 transition-all hover:cursor-pointer hover:text-bluez-500 hover:border-solid hover:border-l-[1px] border-white hover:font-black ">Watch ►</button>
                        <button className="p-0 relative hover:text-3xl w-1/4 h-full bg-redz-500 text-white hover:bg-white/0 transition-all hover:cursor-pointer hover:text-redz-500 ">❤︎</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tete;
