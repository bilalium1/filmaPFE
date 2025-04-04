
import User from "../models/user.model.js"

export const createUser = async(req, res) => {
    try {
        const user = new User(req.body);
        await User.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({error : error.message});
    }
}

export const getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}

export const getUserId = async (req, res) => {
    try {
        const user = await User.findbyId(req.params.id);
        if (!user) return res.status(404).json({ error:"User not found"});
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

export const  updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!user) return res.status(404).json({ error: "User not found "});
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

export const deleteUser = async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id, req.body, {new: true});
        if (!user) return res.status(404).json({ error: "User not found"});
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}
