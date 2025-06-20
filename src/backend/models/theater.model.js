import mongoose from "mongoose"

const theaterSchema = mongoose.Schema({
        film_id : {type : String},
        host_id : { type : mongoose.Schema.Types.ObjectId, required : true, ref : "User"},
        title : { type : String, required : true},
        is_private : {type : Boolean, required : true},
        code : {type : String},
        media_type : {type : String}
    }, 
    {timestamps : true}
);

const Theater = mongoose.model("Theater", theaterSchema);

export default Theater;