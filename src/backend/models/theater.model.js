import mongoose from "mongoose"

const theaterSchema = mongoose.Schema({
        film_id : {type : Number},
        host_id : { type : mongoose.Schema.Types.ObjectId, required : true, ref : "User"},
        title : { type : String, required : true},
        is_private : {type : Boolean, required : true},
        code : {type : String}
    }, 
    {timestamps : true}
);

const Theater = mongoose.model("Theater", theaterSchema);

export default Theater;