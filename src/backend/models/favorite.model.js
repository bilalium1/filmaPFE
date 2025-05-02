import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
    id_user: { type: mongoose.Schema.Types.ObjectId, ref:"User", required : true},
    id_film: { type: Number, required : true},
    media_type: {type: String, required : true},
}, {
    timestamps: true
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;