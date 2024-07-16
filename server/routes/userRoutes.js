import express from "express"
import { registerUser, loginUser} from "../controllers/userControllers.js"

const router = express.Router()

/***********************Create/Register New User's Route***********************************/
router.post("/", registerUser)

/***********************User Login Route***********************************/
router.post("/login", loginUser)



export {router as userRouters}