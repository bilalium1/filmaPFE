import mongoose from "mongoose"

const commrnetshema = mongoose.Schema({
        userid : {type : Number, required : true},
        filmid : { type : Number, required : true},
        value : { type : String, required : true},
       
    
    }, 
    {timestamps : true}
);

const COM = mongoose("comment", commrnetshema);

export default COM;