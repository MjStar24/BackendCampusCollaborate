import mongoose,{Schema} from "mongoose";


const commentModel=new mongoose.Schema({
    id:{type:Schema.Types.ObjectId,ref:"User"},
    name:{type:String},
    url:{type:String},
    comment:{type:String}
},{_id:false})

const postedByModel=new mongoose.Schema({
    id:{type:Schema.Types.ObjectId,ref:"User"},
    name:{type:String},
    url:{type:String},
    program:{type:String},
    rollNumber:{type:String}
},{_id:false})

const courseReviewSchema=new mongoose.Schema({
    email:{type:String,required:true},
    userName:{type:String,required:true},
    courseName:{type:String,required:true},
    title:{type:String,required:true},
    professor:{type:String,required:true},
    description:{type:String,default:""},
    // comments:[commentModel]
})

const CourseReview=mongoose.model("CourseReview",courseReviewSchema);
export default CourseReview;
