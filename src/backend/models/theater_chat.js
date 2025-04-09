import mongoose from "mongoose"

const theatershema = mongoose.Schema({
        userid : {type : Number, required : true},
        theaterid : { type : Number, required : true},
        message : { type : String, required : true},
       
    
    }, 
    {timestamps : true}
);

const theater = mongoose("comment", theatershema);

export default theater;