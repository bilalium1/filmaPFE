import mongoose from "mongoose"

const Historiqueshema = mongoose.Schema({
        userid : {type : Number, required : true},
        filmid : { type : Number, required : true},
    
    }, 
    {timestamps : true}
);

const HIS = mongoose("Historiques", Historiqueshema);

export default HIS;