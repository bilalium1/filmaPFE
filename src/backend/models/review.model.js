import mongoose from "mongoose"

const reviewshema = mongoose.Schema({
        userid : {type : Number, required : true},
        filmid : { type : Number, required : true},
        rating : { type : Number, required : true},
        review : { type : String, required : true},
    
    }, 
    {timestamps : true}
);

const riv = mongoose("review", reviewshema);

export default riv;