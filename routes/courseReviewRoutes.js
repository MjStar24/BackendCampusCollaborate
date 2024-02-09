import { Router } from "express";
import authMiddleWare from "../middleware/authMiddleWare.js";
import courseReviewController from "../controllers/courseReviewController.js";
import spamMiddleWare from "../middleware/spamMiddleware.js";

const router=Router();

router.get("/searchCourse/:name",authMiddleWare.isAuthenticated,courseReviewController.searchCourse);
router.get("/getCourse",authMiddleWare.isAuthenticated,courseReviewController.getCouseById);
router.get("/getAllCourses",authMiddleWare.isAuthenticated,courseReviewController.getReviews);
router.post("/create",[authMiddleWare.isAuthenticated],courseReviewController.addCourseReview);
router.post("/addComments",[spamMiddleWare.isReviewCommentSpam,authMiddleWare.isAuthenticated],courseReviewController.addComments);

export default router;