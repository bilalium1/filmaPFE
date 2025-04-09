import mongoose from 'mongoose'

const streamSchema = mongoose.Schema({
    film_id : {type : Number, required : true},
    platform : {type : String, required : true},
    url : {type : String, required : true},
}, {
    timestamp : true,
})

const Stream = mongoose.model("Stream", streamSchema);

export default Stream;