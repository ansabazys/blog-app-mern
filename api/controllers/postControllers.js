import User from "../models/User.js";
import bcrypt from "bcrypt";
import Post from "../models/Post.js";

//Create
export const createPost = async (req, res) => {
  try {
    const newPost = await Post(req.body);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost)
  } catch (error) {
    res.status(200).json(error);
  }
};

//Update
export const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(200).json(error);
  }
};

//Delete
export const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Post has been deleted" });
  } catch (error) {
    res.status(200).json(error);
  }
};

//Get post details
export const getPostdetails = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(200).json(error);
  }
};

//Get user post
export const getUserPost = async (req, res) => {
  try {
    const post = await Post.find({userId: req.params.userId});
    res.status(200).json(post);
  } catch (error) {
    res.status(200).json(error);
  }
};



//Get posts
export const getPosts = async (req, res) => {
    const query = req.query
  try {
    const searchFilter = {
        title: {$regex: query.search, $options: "i"}
    }
    const post = await Post.find(query.search && searchFilter );
    res.status(200).json(post);
  } catch (error) {
    res.status(200).json(error);
  }
};
