import ImageKit from "imagekit";

const imagekit=new ImageKit({
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT
})

class uploadImage{
    async uploadImage(url,fileName){
        try{
            const uploadedImage= await imagekit.upload({
                file:url,
                fileName
            })
            return uploadedImage;
        }catch(e){
            console.log(e);
            return false;
        }
    }

    async generateUrl(){
        try{

        }catch(e){
            console.log(e);
            return false;
        }
    }
}

export default new uploadImage();