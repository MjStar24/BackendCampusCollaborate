import { Router} from "express";
import multer from "multer";
import synergyController from "../controllers/synergyController.js";
import authMiddleWare from "../middleware/authMiddleWare.js";
import spamMiddleWare from "../middleware/spamMiddleWare.js";

const storage=multer.memoryStorage();
const upload =multer();
const router=Router();

router.get("/getById",authMiddleWare.isAuthenticated,synergyController.getSynergyById)
router.get("/getAllSynergy",authMiddleWare.isAuthenticated,synergyController.getSynergy);
router.post("/create",[upload.array('images',5),authMiddleWare.isAuthenticated],spamMiddleWare.isSynergySpam,synergyController.createSynergy);
router.post("/addComments",authMiddleWare.isAuthenticated,spamMiddleWare.isSynergyCommentSpam,synergyController.addComments);
router.post("/addDomains",authMiddleWare.isAuthenticated,spamMiddleWare.isSynergyDomainsSpam,synergyController.addDomains);



export default router;