import mongoose,{Schema} from "mongoose";
import User from "./userModel.js";


const adminModel=new mongoose.Schema({
    id:{type:Schema.Types.ObjectId,ref:"User"},
    name:{type:String,required:true},
    url:{type:String}
},{_id:false})

const projectSchema=new mongoose.Schema({
    projectName:{type:String,required:true},
    description:{type:String,default:""},
    skills:[{type:String}],
    thumbnail:{type:String},
    urls:[{type:String}],
    duration:{type:String,required:true},
    isActive:{type:Boolean,default:true},
    owner:{type:Schema.Types.ObjectId,ref:"User"},
    admin:[adminModel],
    starBy:[{type:Schema.Types.ObjectId,ref:"User"}],
    docs:[{type:String}]
}) 

const Project=mongoose.model("Project",projectSchema);
export default Project;