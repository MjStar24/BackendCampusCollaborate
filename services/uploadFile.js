import { v2 as cloudinary } from 'cloudinary';

class documentUpload {
    cloudinaryConnect = ()=>{
        try{
            cloudinary.config({
                cloud_name:process.env.CLOUD_NAME,
                api_key:process.env.API_KEY,
                api_secret:process.env.API_SECRET,
            })
        }
        catch(err){
            console.log(err);
        }
    }
}

export default new documentUpload();

