import axios from "axios"
import qs from "qs"
import User from "../models/userModel.js";
import tokenService from "../services/tokenService.js";

class AuthController{
    async loginHandler(req,res){
        const {code}=req.query;
        // console.log("env",process.env.CLIENT_ID)

        try{
            const postData={
                client_id:process.env.CLIENT_ID,
                // client_secret:CLIENT_SECRET,
                grant_type:"authorization_code",
                redirect_uri:"https://campuscollaborate-server.onrender.com/auth/getCred",
                // redirect_uri:"http://localhost:4000/auth/getCred",
                scope:"user.read",
                code,
            }
    
            const URI=`https://login.microsoftonline.com/${process.env.TENENT_ID}/oauth2/v2.0/token`
    
            const response = await axios.post(URI,qs.stringify(postData),{
                "Content-Type": "application/x-www-form-urlencoded",
                client_secret:process.env.CLIENT_SECRET
            })
    
            // console.log(response.data);
            const accessToken=response.data.access_token;
            const refreshToken=response.data.refresh_token;
    
    
            const userData=await axios.get("https://graph.microsoft.com/v1.0/me",{
                headers:{
                    Authorization : `Bearer ${accessToken}`
                }
            })
    
            // console.log(userData.data)
    
            let existingUser=await User.findOne({email:userData.data.mail});
            console.log("existingUser",existingUser);
    
            if(!existingUser){
                const user=new User({
                    name:userData.data.displayName,
                    rollNumber:userData.data.surname,
                    program:userData.data.jobTitle,
                    email:userData.data.mail,
                })
    
                existingUser = await user.save();
            }
    
            console.log(existingUser)
    
            
    
            const token=tokenService.genrateToken({
                id:existingUser._id
            })
    
            console.log("token",token);
    
            // console.log(updateduser);
    
            res.cookie('accessToken',token,{
                maxAge:1000*60*60*24*30
            })
    
            const {id}=tokenService.verifyToken(token);
            console.log("id",id);
            
            
            const userDetails=await User.findById(id);
           
           //  res.redirect(`https://campuscollaborate-server.onrender.com/`);
            res.redirect(`campuscollaborate://success?token=${token}&user=${existingUser}`);
            // res.redirect(`http://localhost:4000/?token=${token}&user=${existingUser}`)
        }catch(e){
            console.log(e);
            if(!res.headersSent)
                res.sendStatus(500).json({message:"server error"});
        }
        // console.log(userDetails);


        
        

        
    }
}

export default new AuthController();
