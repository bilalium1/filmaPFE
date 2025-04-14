import mongoose from "mongoose"

const hisSchema= mongoose.Schema({
        user_id : {type : Number, required : true},
        film_id : { type : Number, required : true},
    }, 
    {timestamps : true}
);

const Historique = mongoose.model("Historique", hisSchema);

export default Historique;