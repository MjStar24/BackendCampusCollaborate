import { Router } from "express";

import projectController from "../controllers/projectController.js";
import authMiddleWare from "../middleware/authMiddleWare.js";
import spamMiddleWare from "../middleware/spamMiddleWare.js";
const router=Router();

router.post("/create",authMiddleWare.isAuthenticated,spamMiddleWare.isProjectDescriptionSpam,projectController.createProject);
router.post("/addSkills",authMiddleWare.isAuthenticated,spamMiddleWare.isProjectCommentSpam,projectController.addSkills);
router.post("/addUrls",authMiddleWare.isAuthenticated,projectController.addUrl);

export default router;

