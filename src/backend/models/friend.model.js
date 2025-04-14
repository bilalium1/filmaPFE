import mongoose from "mongoose"

const friendSchema= mongoose.Schema({
        user_id : {type : Number, required : true},
        friend_id : { type : Number, required : true},
    }, 
    {timestamps : true}
);

const Friend = mongoose.model("Friend", friendSchema);

export default Friend;