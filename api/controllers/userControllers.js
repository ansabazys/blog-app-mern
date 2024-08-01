import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Post from "../models/Post.js";



//Update
export const updateUser = async (req, res) => {
    try {

        if(req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hashSync(req.body.password, salt)
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(200).json(error)
    }
}

//Delete
export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        await Post.deleteMany({userId: req.params.id})

        res.status(200).json({message: "User has been deleted"})
    } catch (error) {
        res.status(200).json(error)
    }
}

//Get user
export const getUser = async (req, res) => {
    try {
       const user = await User.findById(req.params.id)
       const {password, ...info} = user._doc
       res.status(200).json(info)
    } catch (error) {
        res.status(200).json(error)
    }
}