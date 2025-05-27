import mongoose from "mongoose"

const commentSchema = mongoose.Schema({
        user_id : {type : mongoose.Schema.Types.ObjectId, required : true},
        film_id : { type : Number, required : true},
        value : { type : String, required : true},
        likes : { type : Number, required : true},
        dislike : { type : Number, required : true}
    }, 
    {timestamps : true}
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;