import NavBar from "../components/navbar";

const TheaterPage = () => {

    return (
        <div>
            <div className="flex flex-col mx-auto mt-20 w-19/20 h-[2000px] rounded-xl bg-stone-950/50 border-t-3 backdrop-blur-xl">
            <h1 className="w-full h-20 text-center text-3xl pt-5 font-light tracking-widest border-b-1">Theatres</h1>

            <div className="relative flex content-start grid grid-cols-3 gap-1 relative m-auto mt-10 w-19/20 h-9/10 bg-stone-800/50 rounded-lg overflow-hidden">
                <div className="bg-stone-950/80 border-b-1 w-100 h-100 m-5 rounded-2xl cursor-pointer"></div>
                <div className="bg-stone-950/80 border-b-1 w-100 h-100 m-5 rounded-2xl cursor-pointer"></div>
                <div className="bg-stone-950/80 border-b-1 w-100 h-100 m-5 rounded-2xl cursor-pointer"></div>
                <div className="bg-stone-950/80 border-b-1 w-100 h-100 m-5 rounded-2xl cursor-pointer"></div>
                <div className="bg-stone-950/80 border-b-1 w-100 h-100 ml-5 rounded-2xl cursor-pointer"></div>
                <div className="bg-stone-950/80 border-b-1 w-100 h-100 ml-5 rounded-2xl cursor-pointer"></div>
                <div className="bg-stone-950/80 border-b-1 w-100 h-100 ml-5 rounded-2xl cursor-pointer"></div>
                <div className="bg-stone-950/80 border-b-1 w-100 h-100 ml-5 rounded-2xl cursor-pointer"></div>


            </div>
            </div>
            <NavBar/>
        </div>
    )
}

export default TheaterPage;