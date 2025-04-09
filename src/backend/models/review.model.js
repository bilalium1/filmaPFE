import mongoose from "mongoose"

const reviewSchema = mongoose.Schema({
        user_id : {type : Number, required : true},
        film_id : { type : Number, required : true},
        rating : { type : Number, required : true},
        review : { type : String, required : true},  
    }, 
    {timestamps : true}
);

const Review = mongoose.model("review", reviewSchema);

export default Review;