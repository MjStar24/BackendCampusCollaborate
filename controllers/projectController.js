import Project from "../models/projectModel.js";
import imageService from "../services/uploadImage.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
    
})

class projectController{


    async searchProjects(req,res){
        const name=req.params.name;
            if(!name) res.sendStatus(400);
            try{
                const project=await Project.findOne({
                    projectName:{$regex : name , $options : "i"}
                }).select("-_id -__v")
                if(!project) res.sendStatus(404);
                else res.status(200).json(project);
            }catch(e){
                console.log(e);
                res.sendStatus(500);
            }
    }

    async getProject(req,res){
        const {id}=req.body;
        try{
            const project=await Project.findById(id).select("-_id -__v");
            if(!project) res.sendStatus(404);
            res.json(project);
        }catch(e){
            console.log(e);
            res.sendStatus(500);
        }
    }

    async getAllProjects(req,res){
        try{
            const projects=await Project.find({}).select("-_id -__v");
            if(!projects) res.sendStatus(404);
            res.json(projects);
        }catch(e){
            console.log(e);
            res.sendStatus(500);
        }
    }

    async addThumbnail(req,res){
        if(!req.file) res.status(500).json({message:"please provide image"});
        try{
            const project=Project.findById(req.user._id);
            if(!project) res.status(404).json({message:"user not found"})
            const thumbnail=req.file.buffer;
            const filename=req.file.originalname;
            const uploadedImage=await imageService.uploadImage(thumbnail,filename);
            project.thumbnail=uploadedImage.url;

            const updatedProject=await project.save();
            res.stauts(200).json(updatedProject);
            
        }catch(e){
            console.log(e);
            res.sendStatus(500);
        }

    }


    async createProject(req,res){
        console.log(req.file)
        const data=req.body;
        if(!data.projectName && !data.duration) res.sendStatus(400);
        try{
            const thumbNail=req.file.buffer;
            const filename=req.file.originalname;
            const uploadedImage=await imageService.uploadImage(thumbNail,filename);
            const projectData={
                projectName:data.projectName,
                description:data.description,
                skills:data.skills,
                urls:data.urls,
                isActive:data.isActive,
                owner:req.user._id,
                duration:data.duration,
                thumbnail:uploadedImage.url,
                admin:data.admin,
            }

            const project = new Project(projectData);
            const newProject = await project.save();

            res.json(newProject);

        }catch(e){
            console.log(e.message);
            res.sendStatus(500);
        }
    }

    async addDocs(req,res){
        console.log(req.files);
        const data=JSON.parse(JSON.stringify(req.body))
        const {id}=data;
        try{
            const project=await Project.findById(id);

            if(!project) res.sendStatus(400);
            else{
                for(const file of req.files){
                    const b64 = Buffer.from(file.buffer).toString("base64");
                    let dataURI = "data:" + file.mimetype + ";base64," + b64;
                    const res = await cloudinary.uploader.upload(dataURI, {
                        resource_type: "auto",
                });
                project.docs.push(res.secure_url);
                    
                }
                const updatedProject=await project.save();
                res.status(200).json(updatedProject);
            }
            }
            
        catch(e){
            console.log(e);
            res.sendStatus(500);
        }
    }

    async addSkills(req,res){
        const data=req.body;
        if(!data.id && !data.skills) res.sendStatus(400);
        try{
            const project=await Project.findById(data.id);
            if(!project) res.status(404).json({"message":"project not found"})
            data.skills.forEach(element => {
                const found=project.skills.find(elem=>elem===element);
                if(!found) project.skills.push(element);
            });
            const updatedProject=await project.save();
            res.json(updatedProject);
        }catch(e){
            console.log(e.message);
            res.sendStatus(500);
        }
    }
    
    async addUrl(req,res){
        if(!data.id && !data.urls) res.sendStatus(400);
        try{
            const project=await Project.findById(data.id);
            if(!project) res.status(404).json({"message":"project not found"});
            data.urls.forEach(element => {
                const found=project.urls.find(elem=>elem===element);
                if(!found) project.urls.push(element);
            });
            const updatedProject=await project.save();
            res.json(updatedProject);
        }catch(e){
            console.log(e.message);
            res.sendStatus(500);
        }
    }

    async addAdmin(req,res){
        const {projectId}=req.body;
        if(!projectId) res.sendStatus(400);

        try{
            const project=await Project.findById(projectId);
            if(!project) res.sendStatus(404).json({message:"project not found"});
            const found=project.admin.find(element=>element.userId===req.user._id);
            if(!found){
                project.admin.push({
                    id:req.user._id,
                    name:req.user.name,
                    url:req.user.url
                })
            }

            const updatedProject=await project.save();
            res.status(200).json(updatedProject);
        }catch(e){
            console.log(e);
            res.sendStatus(500);
        }
    }

    async addSatrBy(req,res){
        const {id}=req.body;
        if(!id) res.sendStatus(400);

        try{
            const project=await Project.findById(id);
            if(!project) res.sendStatus(404);
            else {
                project.starBy.push(id);
                await project.save();
                res.json(project);
            }
        }catch(e){
            console.log(e);
            res.sendStatus(500);
        }
    }


}

export default new projectController();