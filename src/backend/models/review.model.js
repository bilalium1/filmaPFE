import { User } from "lucide-react";
import mongoose from "mongoose"

const reviewSchema = mongoose.Schema({
        user_id : {type : mongoose.Schema.Types.ObjectId, required : true, ref: "User"},
        film_id : { type : Number, required : true},
        rating : { type : Number, required : true},
        review : { type : String, required : true},  
        media_type : { type : String, required : true}
    }, 
    {timestamps : true}
);

const Review = mongoose.model("review", reviewSchema);

export default Review;