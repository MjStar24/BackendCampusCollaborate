import Project from "../models/projectModel.js";
import User from "../models/userModel.js";
import { v2 as cloudinary } from 'cloudinary';

function isFileTypeSupported(type,supported){
    return supported.includes(type);
}

async function uploadFileToCloudinary (file,folder) {
    const option = {folder};
    return await cloudinary.uploader.upload(file.tempFilePath,option);
}

class projectController{

    async getProject(req,res){

    }

    async getAllProjects(req,res){

    }


    async createProject(req,res){
        const data=req.body;
        if(!data.projectName && !data.duration) res.sendStatus(400);
        try{
            const file = req.files.file;
            const supportedTypes = ["pdf","docx"];
            const fileType = file.name.split('.')[1].toLowerCase();
            if(!isFileTypeSupported(fileType,supportedTypes)){
                return res.json({
                    success:false,
                    message:'file format not matched',
                })
            }
            const response = await uploadFileToCloudinary(file,"kriti");

            const projectData={
                projectName:data.projectName,
                description:data.description,
                skills:data.skills,
                urls:data.urls,
                owner:req.user._id,
                duration:data.duration,
                documentUrl:response.secure_url,
            }

            const project = new Project(projectData);
            const newProject = await project.save();

            res.json(newProject);

        }catch(e){
            console.log(e.message);
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
        if(!data.id && data.urls) res.sendStatus(400);
        try{
            const project=await Project.findById(data.id);
            if(!project) res.status(404).json({"message":"project not found"});
            data.urls.forEach(element => {
                const found=project.urls.find(elem=>elem===element);
                if(!found) project.urls.push(element);
            });
            const updatedProject=await Project.save();
            res.json(updatedProject);
        }catch(e){
            console.log(e.message);
            res.sendStatus(500);
        }
    }
    
    
}

export default new projectController();