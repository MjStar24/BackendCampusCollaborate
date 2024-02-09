import { Router } from "express";
import authMiddleWare from "../middleware/authMiddleWare.js";
import courseReviewController from "../controllers/courseReviewController.js";
import spamMiddleWare from "../middleware/spamMiddleWare.js";

const router=Router();

router.post("/create",authMiddleWare.isAuthenticated,spamMiddleWare.isReviewDescriptionSpam,courseReviewController.addCourseReview);
router.post("/addComments",authMiddleWare.isAuthenticated,spamMiddleWare.isReviewCommentSpam,courseReviewController.addComments);
export default router;