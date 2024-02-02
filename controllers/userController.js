import User from "../models/userModel.js";
import Project from "../models/projectModel.js";

class userController{
    /**
     * 
     * @param {object} req - the request object 
     * @param {object} res -the response object
     */
    async addSkills(req,res){
        const data=req.body;
        if(!data.id && !data.skills) res.sendStatus(400);
        try{
            const user=await User.findById(data.id);
            if(!user) res.status(404).json({"message":"User not found"})
            data.skills.forEach(element => {
                const found=user.skills.find(elem=>elem===element);
                if(!found) user.skills.push(element);
            });
            const updatedUser=await user.save();
            res.json(updatedUser);
        }catch(e){
            console.log(e.message);
            res.sendStatus(500);
        }
    }

    async addProject(req,res){
        const data=req.body;
        const user=req.user;
        if(!data.projectId || !data.userId) res.sendStatus(400);
        try{
            const project=await Project.findById(data.ProjectId);
            const getUser=await Project.findById(data.req.user._id);
            if(!project) res.status(401).json({message:"Project Not found"})

            const found = getUser.projects.find(element=>element===data.projectId);
            if(!found) getUser.projects.push(data.projectId);
            const updatedUser=await getUser.save();
            res.json(updatedUser);
        }catch(e){
            console.log(e.message);
            res.sendStatus(500);
        }
    }
}

export default new userController();