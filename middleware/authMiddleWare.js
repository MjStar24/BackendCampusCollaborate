import User from "../models/userModel.js";
import tokenService from "../services/tokenService.js";
class authMiddleWare{
    async isAuthenticated(req,res,next){
        try{
            const {accessToken}=req.cookies;
            if(!accessToken) res.status(401).json({message:"Access denied"});
            const {id}=tokenService.verifyToken(accessToken);
            if(!id) res.status(401).json({message:"Access denied"});
            const user=await User.findById(id);
            req.user=user;
            next();
        }catch(e){
            res.status(401).json({message:'Invalid Token'});
        }
    }
}

export default new authMiddleWare();