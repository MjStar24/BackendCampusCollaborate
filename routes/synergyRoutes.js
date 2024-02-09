import { Router} from "express";
import multer from "multer";
import synergyController from "../controllers/synergyController.js";
import authMiddleWare from "../middleware/authMiddleWare.js";
// import spamMiddleWare from "../middleware/spamMiddleware.js";

const storage=multer.memoryStorage();
const upload =multer();
const router=Router();

router.get("/searchSynergy/:name",authMiddleWare.isAuthenticated,synergyController.searchSynergy)
router.get("/getById",authMiddleWare.isAuthenticated,synergyController.getSynergyById)
router.get("/getAllSynergy",authMiddleWare.isAuthenticated,synergyController.getSynergy);
router.post("/create",[authMiddleWare.isAuthenticated],synergyController.createSynergy);
router.post("/addComments",[authMiddleWare.isAuthenticated],synergyController.addComments);
router.post("/addDomains",[authMiddleWare.isAuthenticated],synergyController.addDomains);
router.post("/addImages",[upload.array('images',5),authMiddleWare.isAuthenticated],synergyController.addImages);



export default router;