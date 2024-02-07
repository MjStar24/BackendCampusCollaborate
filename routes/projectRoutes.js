import { Router } from "express";

import projectController from "../controllers/projectController.js";
import authMiddleWare from "../middleware/authMiddleWare.js";

const router=Router();

router.post("/create",projectController.createProject);
router.post("/addSkills",authMiddleWare.isAuthenticated,projectController.addSkills);
router.post("/addUrls",authMiddleWare.isAuthenticated,projectController.addUrl);

export default router;

