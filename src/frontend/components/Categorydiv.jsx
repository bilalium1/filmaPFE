
import { motion } from "motion/react"

function Category(){
    return (

        <div className="flex-col bg-indigo-950/50 w-19/20 mx-auto my-10 h-100 rounded-xl">
            <p className="text-center w-9/10 mx-auto h-10 text-3xl border-b-1" >Favorites ❤ ~</p>
            <div className="flex w-39/40 h-85 my-3 mx-auto">
                <div className="bg-white/50 h-full w-60 rounded-lg mr-5"/>
                <div className="bg-white/50 h-full w-60 rounded-lg mr-5"/>
            
            </div>
        </div>
    )
}


export default Category