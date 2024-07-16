import mongoose from "mongoose";

const PostSchemer = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Post = mongoose.model("Post", PostSchemer)

export default Post