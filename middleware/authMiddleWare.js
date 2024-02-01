import User from "../models/userModel.js";
import tokenService from "../services/tokenService.js";
class authMiddleWare{
    async isAuthenticated(req,res,next){
        console.log("cookies",req.cookies);
        const {accessToken}=req.cookies;
        if(!accessToken) res.status(404).json({message:"Access denied"});
        const {id}=tokenService.verifyToken(accessToken);
        if(!id) res.status(404).json({message:"Access denied"});
        const user=await User.findById(id);
        console.log(user);
        req.user=user;
        next();
    }
}

export default new authMiddleWare();