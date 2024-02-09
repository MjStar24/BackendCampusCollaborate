import mongoose, { Schema } from "mongoose";


const commentsModel=new mongoose.Schema({
    id:{type:Schema.Types.ObjectId,ref:'User'},
    name:{type:String},
    url:{type:String},
    comment:{type:String}
},{_id:false})

const synergySchema=new mongoose.Schema({
    user:commentsModel,
    title:{type:String,required:true},
    images:[{type:String}],
    description:{type:String,default:""},
    domains:[{type:String}],
    comments:[commentsModel]
})

const Synergy=mongoose.model("Synergy",synergySchema);
export default Synergy;