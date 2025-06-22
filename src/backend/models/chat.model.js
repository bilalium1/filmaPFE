import mongoose from "mongoose"

const chatSchema = mongoose.Schema({
        user_id : {type : mongoose.Schema.Types.ObjectId , required : true, ref : "User"},
        friend_id : { type : mongoose.Schema.Types.ObjectId , required : true, ref : "User"},
        value : { type : String, required : true},
    }, 
    {timestamps : true}
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;