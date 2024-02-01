import mongoose,{Schema} from "mongoose";
import User from "./userModel.js";

const projectSchema=new mongoose.Schema({
    projectName:{type:String,required:true},
    description:{type:String,default:""},
    skills:[{type:String}],
    urls:[{type:String}],
    duration:{type:String,required:true},
    isActive:{type:Boolean},
    projectId:{type:String},
    admin:[{type:Schema.Types.ObjectId,ref:"User"}],
    startedBy:[{type:Schema.Types.ObjectId,ref:"User"}]
}) 

const Project=mongoose.model("Project",projectSchema);
export default Project;