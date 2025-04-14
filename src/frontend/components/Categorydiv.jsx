
import { motion } from "motion/react"

function Category( title ){
    return (

        <div className="flex-col bg-indigo-950/50 w-19/20 mx-auto my-10 h-100 rounded-xl">
            <p className="text-center w-9/10 mx-auto h-10 text-3xl border-b-1" >Category</p>
            <div className="flex whitespace-nowrap scroll-none gap-2 w-39/40 h-85 my-3 mx-auto">
                <div className="bg-indigo-800/30 h-full w-60 rounded-lg">
                    <h3 className="text-3xl">FILM 1</h3>
                </div>
                <div className="bg-indigo-800/30 h-full w-60 rounded-lg">
                    <h3 className="text-3xl">FILM 2</h3>
                </div>
                <div className="bg-indigo-800/30 h-full w-60 rounded-lg">
                    <h3 className="text-3xl">FILM 3</h3>
                </div>
                <div className="bg-indigo-800/30 h-full w-60 rounded-lg">
                    <h3 className="text-3xl">FILM 4</h3>
                </div>
            </div>
        </div>
    )
}


export default Category