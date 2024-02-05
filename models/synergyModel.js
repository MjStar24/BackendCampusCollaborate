import mongoose, { Schema } from "mongoose";

const synergySchema=new mongoose.Schema({
    user:{type:Schema.Types.ObjectId,ref:"User"},
    title:{type:String,required:true},
    image:[{type:String}],
    description:{type:String,default:""},
    domains:[{type:String}],
    comments:[{
        user:{type:Schema.Types.ObjectId,ref:"User"},
        comment:{type:String,default:""}
    }]
})

const Synergy=mongoose.model("Synergy",synergySchema);
export default Synergy;