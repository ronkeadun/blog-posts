import User from "../models/UserModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import "dotenv/config.js"

/***********************Creating JSON Web Token********************************/
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: "3d"})
}

/***********************Register User***********************************/
const registerUser = async (req, res)=>{
    //Grab the User's data from the request body
    const {email, password} = req.body

    //Check if necessary fields are not empty
    if(!email || !password){
        return res.status(400).json({error: "All fields are required"})
    }
    //check if email already exists
    const existingUser = await User.findOne({email})
    if(existingUser){
        return res.status(400).json({error: "Email is already taken"})
    }

    //Hash the password
    const salt = await bcrypt.genSalt() // argument defaults to number 10
    const hashedPassword = await bcrypt.hash(password, salt)

    try {
        //Registers user
        const user = await User.create({email, password: hashedPassword})
        //Creates jsonwebtoken
        const token = createToken(user._id)
        //sends response along with user's token
        res.status(200).json({message: "Registered successfully", email, token})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

/***********************Login User***********************************/
const loginUser = async (req, res)=>{
    //Grab the User's data from the request body
    const {email, password} = req.body

    //Check if necessary fields are not empty
    if(!email || !password){
        return res.status(400).json({error: "All fields are required"})
    }
    //check if email already exists
    const existingUser = await User.findOne({email})
    if(!existingUser){
        return res.status(400).json({error: "user does not exist"})
    }
    //confirm user's password
    const matchedPassword =  await bcrypt.compare(password, existingUser.password)
    if (!matchedPassword){
        return res.status(400).json({error: "Incorrect password"})
    }
    try {
        //Creates jsonwebtoken
        const token = createToken(existingUser._id)
        //sends response along with user's token
        res.status(200).json({message: "Logged in successfully", email, token})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export {registerUser, loginUser}