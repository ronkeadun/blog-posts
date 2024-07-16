import mongoose from "mongoose"
import Post from "../models/PostModel.js"
import User from "../models/UserModel.js"

/***********************Create New Post's Controller***********************************/
const addPost = async(req, res)=> {
    // grab post data fields from the request's body
    const {title, body} = req.body
    // check if required post's fields are not empty
    if(!title || !body) {
        return res.status(400).json({error: "All fields are required"})
    }
    // grab the authenticated userId from the database using the user ID stored on the req.user object
    const userId = await User.findById(req.user._id).select("_id")
    try{
        const post = await Post.create({userId, title, body})
        res.status(200).json({success: "Post created", post})
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

/***********************Get All Post's Controller***********************************/
const getPosts = async(req, res)=>{
    try {
        const posts = await Post.find().sort({createAt: "desc"})
        res.status(200).json({posts})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

/***********************Get Specific User's Posts Controller***********************************/
const getUserPosts = async(req, res)=>{
    // grab the authenticated user from the database using the user ID stored on the req.user object
    const user = await User.findById(req.user._id)
    try {
        const userPosts = await Post.find({userId: user._id}).sort({createAt: "desc"})
        /*if(userPosts.length == 0){
            return res.status(400).json({error: "Post by user not found"})
        }*/
        res.status(200).json({userPosts, email: user.email})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

/***********************Delete Post's Controller***********************************/
const deletePost = async(req, res)=>{
    //Check if ID's type is valid
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({error: "Incorrect ID"})
    }

    //Check if Post exists
    const post = await Post.findById(req.params.id)
    if(!post){
        return res.status(400).json({error: "Post not found"})
    }
    //check the user/owner of the post
    const user = await User.findById(req.user._id)
    if(!post.userId.equals(user._id)){
        return res.status(401).json({error: "User not authorized"})
    }
    try {
        await post.deleteOne()
        res.status(200).json({success: "Post deleted successfully"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

/***********************Update Post's Controller***********************************/
const updatePost = async(req, res)=>{
    //Check if ID's type is valid
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({error: "Incorrect ID"})
    }
    //Check if Post exists
    const post = await Post.findById(req.params.id)
    if(!post){
        return res.status(400).json({error: "Post not found"})
    }
    // grab updated data fields from the request's body
    const {title, body} = req.body
    // check if required updated fields are not empty
    if(!title || !body) {
        return res.status(400).json({error: "All fields are required"})
    }
    //check the user/owner of the post
    const user = await User.findById(req.user._id)
    if(!post.userId.equals(user._id)){
        return res.status(401).json({error: "User not authorized"})
    }

    try {
        const newPost = await post.updateOne({title, body})
        res.status(200).json({success: "Post updated successfully"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export {addPost, getPosts, getUserPosts, deletePost, updatePost}