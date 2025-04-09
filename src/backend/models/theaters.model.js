import mongoose from "mongoose"

const theatershema = mongoose.Schema({
        filmid : {type : Number, required : true},
        hostid : { type : Number, required : true},
        name : { type : String, required : true},
       
    
    }, 
    {timestamps : true}
);

const theater = mongoose("comment", theatershema);

export default theater;