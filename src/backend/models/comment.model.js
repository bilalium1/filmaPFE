import mongoose from "mongoose"

const commentSchema = mongoose.Schema({
        user_id : {type : mongoose.Schema.Types.ObjectId, required : true, ref : "User"},
        film_id : { type : Number, required : true},
        value : { type : String, required : true},
        likes : { type : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], default : []},
        dislikes : { type : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], default : []},
        media_type : {type : String, required : true}
    }, 
    {timestamps : true}
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;