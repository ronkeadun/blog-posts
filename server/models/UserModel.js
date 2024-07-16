import mongoose from "mongoose";

const UserSchemer = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
}, {timestamps:true})

const User = mongoose.model("User", UserSchemer)

export default User