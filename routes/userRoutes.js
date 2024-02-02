import { Router } from "express";

import userController from "../controllers/userController.js";
import authMiddleWare from "../middleware/authMiddleWare.js";

const router=Router();

router.post("/addSkills",authMiddleWare.isAuthenticated,userController.addSkills);
router.post("/addProject",authMiddleWare.isAuthenticated,userController.addProject);

export default router;