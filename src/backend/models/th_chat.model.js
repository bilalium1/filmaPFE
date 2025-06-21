import mongoose from "mongoose"

const theater_chatSchema = mongoose.Schema({
        user_id : {type : mongoose.Schema.Types.ObjectId, required : true, ref : "User"},
        theater_id : { type : mongoose.Schema.Types.ObjectId, required : true, ref : "Theater"},
        message : { type : String, required : true},
    }, 
    {timestamps : true}
);

const Theater_chat = mongoose.model("Theater_chat", theater_chatSchema);

export default Theater_chat;