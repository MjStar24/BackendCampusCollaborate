import { Router } from "express";

import projectController from "../controllers/projectController.js";
import authMiddleWare from "../middleware/authMiddleWare.js";

const router=Router();

router.get("/getProject",authMiddleWare.isAuthenticated,projectController.getProject);
router.get("/getAllProject",authMiddleWare.isAuthenticated,projectController.getAllProjects);
router.post("/create",authMiddleWare.isAuthenticated,projectController.createProject);
router.post("/addSkills",authMiddleWare.isAuthenticated,projectController.addSkills);
router.post("/addUrls",authMiddleWare.isAuthenticated,projectController.addUrl);
router.post("/addAdmin",authMiddleWare.isAuthenticated,projectController.addAdmin);

export default router;

