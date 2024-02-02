import "dotenv/config"

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import DbConnect from "./services/dbConnection.js";
import authMiddleWare from "./middleware/authMiddleWare.js";

import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js"


DbConnect();

const app=express();


app.use(cors());
app.use(cookieParser());


//just for redirecting
app.get("/",authMiddleWare.isAuthenticated,(req,res)=>{
    res.json({"hello":"homePage"});
})

app.use("/auth",authRoutes);
app.use("/user",userRoutes);
app.use("/project",projectRoutes);

const PORT=4000;
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})