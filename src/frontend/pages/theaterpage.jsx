import NavBar from "../components/navbar";
import male from "../assets/dunepost.jpg"
import { FaLock } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { FaLockOpen } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { FaMasksTheater } from "react-icons/fa6";
import CreateThread from "../components/MakeThread";


const TheaterPage = () => {

    return (
        <div>
            <div className="flex flex-col mx-auto mt-20 w-19/20 h-[2000px] rounded-xl bg-stone-950/20 border-t-3 backdrop-blur-sm">
            <FaMasksTheater className="absolute size-10 left-5 top-5" />
            <h1 className="w-full h-20 text-left pl-20 text-3xl pt-5 font-semibold">Theatres</h1>
            <CreateThread/>

            <div className="relative flex content-start grid grid-cols-3 gap-1 relative m-auto mt-10 w-19/20 h-9/10 overflow-hidden">
                <div className="relative bg-rose-950/80 border-b-2 lg:size-70 size-50 m-5 rounded-2xl cursor-pointer hover:brightness-120 transition-all hover:border-b-4 overflow-hidden">
                    <img src={male} alt="MEL" className="absolute size-full top-0 right-0 mix-blend-overlay m-auto object-cover overflow-hidden" />
                    <p className="relative w-19/20 mx-auto rounded-xl pt-3 bg-stone-950/20 h-12 top-2 font-bold">Dune EST MAGNIFIQUE !</p>
                    <FaLock className="absolute bottom-5 left-5 size-6 text-rose-300" />
                    <FaMessage className="absolute bottom-5 right-5 size-6" />
                    <p className="absolute bottom-5 right-15 text-xl font-bold">1.2K</p>
                </div>
            </div>
            </div>
            <NavBar/>
        </div>
    )
}

export default TheaterPage;