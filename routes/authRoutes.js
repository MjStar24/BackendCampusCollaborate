import { Router } from "express";
import authController from "../controllers/authController.js";

const router=Router();

router.get("/",(req,res)=>{
    console.log("hello");
    res.json({"hello":"hii"})
})
router.get("/getCred",authController.loginHandler);

export default router;