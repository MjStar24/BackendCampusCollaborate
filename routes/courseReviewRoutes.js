import { Router } from "express";
import authMiddleWare from "../middleware/authMiddleWare.js";
import courseReviewController from "../controllers/courseReviewController.js";

const router=Router();

router.post("/create",authMiddleWare.isAuthenticated,courseReviewController.addCourseReview);
router.post("/addComments",authMiddleWare.isAuthenticated,courseReviewController.addComments);
export default router;