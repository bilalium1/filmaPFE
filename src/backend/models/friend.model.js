import mongoose from "mongoose"

const friendSchema= mongoose.Schema({
        user_id : {type : mongoose.Schema.Types.ObjectId, required : true, ref: "User"},
        friend_id : { type : mongoose.Schema.Types.ObjectId, required : true, ref: "User"},
    }, 
    {timestamps : true}
);

const Friend = mongoose.model("Friend", friendSchema);

export default Friend;