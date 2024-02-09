import "dotenv/config"

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import DbConnect from "./services/dbConnection.js";
import authMiddleWare from "./middleware/authMiddleWare.js";

import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js"
import synergyRoutes from "./routes/synergyRoutes.js";
import CourseReviewRoutes from "./routes/courseReviewRoutes.js";


DbConnect();

const app=express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());


//just for redirecting
app.get("/",authMiddleWare.isAuthenticated,(req,res)=>{
    res.json({"hello":"homePage"});
})

app.use("/auth",authRoutes);
app.use("/user",userRoutes);
app.use("/project",projectRoutes);
app.use("/synergy",synergyRoutes);
app.use("/courseReview",CourseReviewRoutes);

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})