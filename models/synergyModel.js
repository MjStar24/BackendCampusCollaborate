import mongoose, { Schema } from "mongoose";


const commentsModel=new mongoose.Schema({
    user:{type:Schema.Types.ObjectId,ref:"User"},
    comment:{type:String,default:""}
},{_id:false})

const synergySchema=new mongoose.Schema({
    user:{type:Schema.Types.ObjectId,ref:"User"},
    title:{type:String,required:true},
    image:[{type:String}],
    description:{type:String,default:""},
    domains:[{type:String}],
    comments:[commentsModel]
})

const Synergy=mongoose.model("Synergy",synergySchema);
export default Synergy;