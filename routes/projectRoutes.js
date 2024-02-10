import { Router } from "express";
import multer from "multer";

import projectController from "../controllers/projectController.js";
import authMiddleWare from "../middleware/authMiddleWare.js";
import spamMiddleWare from "../middleware/spamMiddleware.js";

const router=Router();
const storage=multer.memoryStorage();
const upload =multer({storage});

router.get("/searchProjects/:name",authMiddleWare.isAuthenticated,projectController.searchProjects);
router.get("/getProject",authMiddleWare.isAuthenticated,projectController.getProject);
router.get("/getAllProject",authMiddleWare.isAuthenticated,projectController.getAllProjects);
router.post("/create",[spamMiddleWare.isProjectDescriptionSpam,authMiddleWare.isAuthenticated],projectController.createProject);
router.post("/addSkills",[spamMiddleWare.isProjectCommentSpam,authMiddleWare.isAuthenticated],projectController.addSkills);
router.post("/addUrls",authMiddleWare.isAuthenticated,projectController.addUrl);
router.post("/addAdmin",authMiddleWare.isAuthenticated,projectController.addAdmin);
router.post("/addThumbnail",[upload.single('thumbnail'),authMiddleWare.isAuthenticated],projectController.addThumbnail);
router.post("/addStarBy",authMiddleWare.isAuthenticated,projectController.addSatrBy);
router.post("/addDocs",[upload.array("docs",5),authMiddleWare.isAuthenticated],projectController.addDocs);

export default router;

