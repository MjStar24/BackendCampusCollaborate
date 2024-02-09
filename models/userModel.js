import mongoose,{Schema} from "mongoose";
import Project from "./projectModel.js";

const UserSchema=new mongoose.Schema({
    name:{type:String,required:true},
    rollNumber:{type:Number,required:true,},
    program:{type:String,required:true},
    skills:[{type:String}],
    projects:[{type:Schema.Types.ObjectId,ref:"Project"}],
    email:{type:String,required:true,},
    courses:[{type:String}],
    starBy:[{type:Schema.Types.ObjectId,ref:"Project"}],
    url:{type:String}
})

const User = mongoose.model("User",UserSchema);
export default User;
