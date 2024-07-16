import express from "express"
import {addPost, getPosts, getUserPosts, deletePost, updatePost} from "../controllers/postControllers.js"
import auth from "../middleware/auth.js"

const router = express.Router()
/***********************Create New Post's Route***********************************/
router.post("/", auth, addPost)

/***********************Get All Post's Route***********************************/
router.get("/", getPosts)

/***********************Get User's Post's Route***********************************/
router.get("/user", auth, getUserPosts)

/***********************Delete Post's Route***********************************/
router.delete("/:id", auth, deletePost)

/***********************Delete Post's Route***********************************/
router.put("/:id", auth, updatePost)

export {router as postRouters}