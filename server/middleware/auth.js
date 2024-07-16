import jwt from "jsonwebtoken"
import User from "../models/UserModel.js"

const auth = async(req, res, next) => {
    // verify user's authentication
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error:"Authorization token required"})
    }
    //Grab the token from the header's authorization string (taking the "Bearer" string away)
    const token = authorization.split(" ")[1]
    try {
        //Decode and extract the user ID fron the token
        const {_id} = jwt.verify(token, process.env.SECRET)
        //Using the paylod ID to query the database to confirm the user's existence, then,
        //Create a user field/property in the request body and assign it the user's ID from the database
        req.user = await User.findById(_id).select("_id")
        next()
    } catch (error) {
        res.status(401).json({error:error.message})
    }
}

export default auth