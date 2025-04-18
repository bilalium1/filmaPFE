import mongoose from "mongoose"

const commentSchema = mongoose.Schema({
        user_id : {type : Number, required : true},
        film_id : { type : Number, required : true},
        value : { type : String, required : true},
    }, 
    {timestamps : true}
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;