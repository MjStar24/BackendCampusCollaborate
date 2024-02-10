import imageService from "../services/uploadImage.js";
import Synergy from "../models/synergyModel.js";
class synergyController{

    async searchSynergy(req,res){
        const name=req.params.name;
            if(!name) res.sendStatus(400);
            try{
                const synergy=await Synergy.findOne({
                    title:{$regex : name , $options : "i"}
                }).select("-__v")
                if(!synergy) res.sendStatus(404);
                else res.status(200).json(synergy);
            }catch(e){
                console.log(e);
                res.sendStatus(500);
        }
    }

    async getSynergyById(req,res){
        const {id}=req.body;
        if(!id) res.sendStatus(400);
        try{
            const synergy=await Synergy.findById(id).select("-__v")
            if(!synergy) res.status(404).json({message:"not found"})
            res.status(200).json(synergy);
        }catch(e){
            console.log(e);
            res.sendStatus(500);
        }
    }

    async getSynergy(req,res){
        try{
            const synergies=await Synergy.find({}).select("-__v").populate({
                path:'user',
                select:"name program"
            });
            res.status(200).json(synergies);
        }catch(e){
            console.log(e);
            res.sendStatus(500);
        }
    }

    async createSynergy(req,res){
        const data=req.body;

        try{
            if(!data.title || !data.description || !data.domains) res.sendStatus(400);
        
                const synergy=new Synergy({
                user:{
                    id:req.user._id,
                    name:req.user.name,
                    url:req.user.url,
                    rollNumber:req.user.rollNumber,
                    program:req.user.program
                },
                title:data.title,
                description:data.description,
                domains:data.domains,

            })

            const updatedSynergy=await synergy.save();
            

            res.status(200).json(updatedSynergy);
        }catch(e){
            console.log(e);
            res.sendStatus(500);
        }
    }

    async addImages(req,res){
        console.log(req.files);
        const {id}=req.body;
        if(!id) res.sendStatus(400);
        try{
            const synergy=await Synergy.findById(id);
            if(!synergy) res.sendStatus(404)
            for(const file of req.files){
                const url=file.buffer;
                const filename=file.originalname;
                const uploadedImage=await imageService.uploadImage(url,filename);
                synergy.images.push(uploadedImage.url);
            }

            const updatedSynergy=await synergy.save();
            res.status(200).json(updatedSynergy);
        }catch(e){
            console.log(e);
            res.sendStatus(500);
        }
    }

    async addComments(req,res){
        const data=req.body;
        console.log(data);
        if(!data.comment || !data.id) res.sendStatus(400).json({"message":"comment field is missing"})
        try{
            const synergy = await Synergy.findById(data.id);
            if(!synergy) res.sendStatus(404).json({message : "not found"})
            else{
                synergy.comments.push({
                    id:req.user._id,
                    name:req.user.name,
                    url:req.user.url,
                    comment:data.comment,
                    })
                }

            const updatedSynergy=await synergy.save();

            res.status(200).json(updatedSynergy);
        }catch(e){
            console.log(e);
            res.sendStatus(500);
        }

    }

    async addDomains(req,res){
        const data=req.body;
        if(!data.domains || !data.id) res.sendStatus(400).json({message:"domains field is missing"})
        try{
            const synergy=await Synergy.findOne({
                _id:data.id,
            });
            if(!synergy) res.status(404).json({message:"not found"})
            data.domains.forEach(element => {
                const found=synergy.domains.find(elem=>elem===element);
                if(!found) synergy.domains.push(element);
            });
            const updatedSynergy=await synergy.save();
            res.json(updatedSynergy);
        }catch(e){
            console.log(e.message);
            res.sendStatus(500);
        }
    }

}

export default new synergyController();