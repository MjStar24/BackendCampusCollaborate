import jwt from "jsonwebtoken";
const secret=process.env.ACCESS_TOKEN_SECRET
class tokenService{
    genrateToken(payload){
        return jwt.sign(payload,secret,{
            expiresIn:"3d"
        });
    }

    verifyToken(token){
        return jwt.verify(token,secret);
    }
}

export default new tokenService();