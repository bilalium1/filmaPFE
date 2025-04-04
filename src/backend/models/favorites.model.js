import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
    id_user: { type: Number, required : true},
    id_film: { type: Number, required : true},
}, {
    timestamps: true
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;