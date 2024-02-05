import User from "../models/userModel.js";
import Project from "../models/projectModel.js";
import CourseReview from "../models/courseReviewModel.js";

class userController{
    /**
     * 
     * @param {object} req - the request object 
     * @param {object} res -the response object
     */

    async addProfile(req,res){

    }

    async addSkills(req,res){
        const data=req.body;
        if(!data.skills) res.sendStatus(400);
        try{
            const user=await User.findById(req.user._id);
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
        if(!data.projectId) res.sendStatus(400);
        try{
            const project=await Project.findById(data.projectId);
            const getUser=await User.findById(req.user._id);
            if(!getUser) res.status(404).json({message:"User not found"})
            if(!project) res.status(404).json({message:"Project Not found"})

            const found = getUser.projects.find(element=>element===data.projectId);
            if(!found) getUser.projects.push(data.projectId);
            const updatedUser=await getUser.save();
            res.json(updatedUser);
        }catch(e){
            console.log(e.message);
            res.sendStatus(500);
        }
    }

    async addCourses(req,res){
        const data=req.body;
        if(!data.courseId) res.sendStatus(400);
        try{
            const course=await CourseReview.findById(data.courseId);
            const getUser=await User.findById(req.user._id);
            if(!course) res.status(401).json({message:"course Not found"})

            const found = getUser.courses.find(element=>element===data.courseId);
            if(!found) getUser.courses.push(data.courseId);
            const updatedUser=await getUser.save();
            res.json(updatedUser);
        }catch(e){
            console.log(e.message);
            res.sendStatus(500);
        }
    }
}

export default new userController();