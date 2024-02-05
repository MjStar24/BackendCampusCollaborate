import mongoose,{Schema} from "mongoose";

const courseReviewSchema=new mongoose.Schema({
    courseCode:{type:String,required:true},
    courseName:{type:String,requied:true},
    professor:{type:String,required:true},
    description:{type:String,default:""},
    rating:{type:Number,required:true},
    comments:[{
        user:{type:Schema.Types.ObjectId,ref:"User"},
        comment:{type:String,default:""}
    }]
})

const CourseReview=mongoose.model("CourseReview",courseReviewSchema);
export default CourseReview;