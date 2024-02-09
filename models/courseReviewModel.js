import mongoose,{Schema} from "mongoose";


const commentModel=new mongoose.Schema({
    id:{type:Schema.Types.ObjectId,ref:"User"},
    name:{type:String},
    url:{type:String},
    comment:{type:String}
},{_id:false})

const courseReviewSchema=new mongoose.Schema({
    postedBy:{type:Schema.Types.ObjectId,ref:"User"},
    courseName:{type:String,requied:true},
    title:{type:String,requied:true},
    professor:{type:String,required:true},
    description:{type:String,default:""},
    comments:[commentModel]
})

const CourseReview=mongoose.model("CourseReview",courseReviewSchema);
export default CourseReview;