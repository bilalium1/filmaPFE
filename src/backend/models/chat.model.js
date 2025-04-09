import mongoose from "mongoose"

const chatSchema = mongoose.Schema({
        user_id : {type : Number, required : true},
        friend_id : { type : Number, required : true},
        value : { type : String, required : true},
    }, 
    {timestamps : true}
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;