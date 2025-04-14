import mongoose from "mongoose"

const theater_chatSchema = mongoose.Schema({
        user_id : {type : Number, required : true},
        theater_id : { type : Number, required : true},
        message : { type : String, required : true},
    }, 
    {timestamps : true}
);

const Theater_chat = mongoose.model("Theater_chat", theater_chatSchema);

export default Theater_chat;