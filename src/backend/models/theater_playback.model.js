import mongoose from "mongoose"

const Theater_pbSchema = mongoose.Schema({
        c_time : { type: Number, required: true},
        is_paused : { type: Number, required: true},
    }, 
    {timestamps : true}
);

const TheaterPlayback = mongoose("Theater_playback", Theater_pbSchema);

export default TheaterPlayback;