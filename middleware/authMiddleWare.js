import User from "../models/userModel.js";
import tokenService from "../services/tokenService.js";
class authMiddleWare{
    async isAuthenticated(req,res,next){
        try{
            const {accessToken}=req.cookies;
            if(!accessToken) res.status(401).json({message:"Access denied no token"});
            const {id}=tokenService.verifyToken(accessToken);
            if(!id) res.status(401).json({message:"Access denied"});
            const user=await User.findById(id).select("-_id -__v");
            req.user=user;
            next();
        }catch(e){
            console.log(e.message)
            res.status(401).json({message:'Invalid Token'});
        }
    }
}

export default new authMiddleWare();