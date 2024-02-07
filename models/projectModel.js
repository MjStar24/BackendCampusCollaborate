import mongoose,{Schema} from "mongoose";
import User from "./userModel.js";


const adminModel=new mongoose.Schema({
    userId:{type:Schema.Types.ObjectId,ref:"User"},
    name:{type:String,required:true},
    url:{type:String}
},{_id:false})

const projectSchema=new mongoose.Schema({
    projectName:{type:String,required:true},
    description:{type:String,default:""},
    skills:[{type:String}],
    urls:[{type:String}],
    duration:{type:String,required:true},
    documentUrl: { type: String },
    isActive:{type:Boolean,default:true},
    owner:{type:Schema.Types.ObjectId,ref:"User"},
    admin:[adminModel],
    starBy:[{type:Schema.Types.ObjectId,ref:"User"}]
}) 

const Project=mongoose.model("Project",projectSchema);
export default Project;