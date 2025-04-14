import mongoose from "mongoose"

const theaterSchema = mongoose.Schema({
        film_id : {type : Number, required : true},
        host_id : { type : Number, required : true},
        name : { type : String, required : true},
    }, 
    {timestamps : true}
);

const Theater = mongoose.model("Theater", theaterSchema);

export default Theater;