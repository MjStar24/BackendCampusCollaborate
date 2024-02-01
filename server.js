import "dotenv/config"

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import DbConnect from "./services/dbConnection.js";
import authRoutes from "./routes/authRoutes.js"
import authMiddleWare from "./middleware/authMiddleWare.js";

DbConnect();

const app=express();


app.use(cors());
app.use(cookieParser());



app.get("/",authMiddleWare.isAuthenticated,(req,res)=>{
    res.json({"hello":"homePage"});
})

app.use("/auth",authRoutes)

const PORT=4000;
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})