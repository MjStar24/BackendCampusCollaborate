import Project from "../models/projectModel.js";
import User from "../models/userModel.js";
class projectController{

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


    async createProject(req,res){
        const data=req.body;
        if(!data.projectName && !data.duration) res.sendStatus(400);
        try{
            const projectData={
                projectName:data.projectName,
                description:data.description,
                skills:data.skills,
                urls:data.urls,
                owner:req.user._id,
                duration:data.duration
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


}

export default new projectController();