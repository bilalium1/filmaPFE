import mongoose, { mongo } from 'mongoose'

const streamSchema = mongoose.Schema({
    film_id : {type : Number, required : true},
    platform : {type : String, required : true},
    url : {type : String, required : true},
})

const Stream = mongoose("Stream", streamSchema);

export default Stream;