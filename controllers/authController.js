import axios from "axios"
import qs from "qs"
import User from "../models/userModel.js";
import tokenService from "../services/tokenService.js";

class AuthController{
    async loginHandler(req,res){
        const {code}=req.query;
        // console.log("env",process.env.CLIENT_ID)

        const postData={
            client_id:process.env.CLIENT_ID,
            // client_secret:CLIENT_SECRET,
            grant_type:"authorization_code",
            redirect_uri:"http://localhost:4000/auth/getCred",
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

        let existingUser=await User.find({email:userData.data.mail});

        if(existingUser.length===0){
            const user=new User({
                name:userData.data.displayName,
                rollNumber:userData.data.surname,
                program:userData.data.jobTitle,
                email:"aandbhaat"
            })

            existingUser = await user.save();
        }

        console.log(existingUser)

        

        const token=tokenService.genrateToken({
            id:existingUser._id
        })

        // console.log("token",token);

        // console.log(updateduser);

        res.cookie('accessToken',token,{
            maxAge:1000*60*60*24*30
        })

        const {id}=tokenService.verifyToken(token);
        console.log("id",id);
        let userDetails;
        try{
            userDetails=await User.findById(id);
        }catch(e) {
            console.log(e.message)
        }
        // console.log(userDetails);


        
        res.redirect("http://localhost:4000/")

        
    }
}

export default new AuthController();