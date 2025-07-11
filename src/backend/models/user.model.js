
import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = mongoose.Schema({
        username : {type : String, required : true},
        email : { type : String, required : true},
        password : { type : String, required : true},
        bio : {type : String},
        location : {type : String, required : true},
        sexe : {type : Boolean, required : true},
        is_admin : { type : Boolean, required : true},
    }, 
    {timestamps : true}
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;