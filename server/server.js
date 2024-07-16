import express from "express";
import { postRouters } from "./routes/postRoutes.js";
import mongoose from "mongoose";
import { userRouters } from "./routes/userRoutes.js";
import cors from "cors";

import path from "path";
import { fileURLToPath } from "url";

//Resolving dirname for ES Module
const __filemame = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filemame);

//Initializing Express App
const app = express();

app.use(cors());

//Middleware to receive JSON
app.use(express.json());

//Adding the API endpoints and the routes handlers
app.use("/api/posts", postRouters);
app.use("/api/users", userRouters);

//Use the client app
app.use(express.static(path.join(__dirname, "/client/build")));

//Render client app for any path for the user
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/client/build/index.html"))
);

mongoose
  .connect(process.env.MONGO_ATLAS_URI, { dbName: "blog_db" })
  .then(() => {
    console.log("Connected to DB successfully");
    app.listen(8000, () => console.log("listening on port 8000"));
  })
  .catch((err) => console.log(err));
