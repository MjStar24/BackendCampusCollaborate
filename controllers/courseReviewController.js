import courseReviewModel from "../models/courseReviewModel.js";



class courseReviewController{

    async searchCourse(req,res){
        const name=req.params.name;
            if(!name) res.sendStatus(400);
            try{
                const course=await courseReviewModel.findOne({
                    $or:[
                        {courseName:{$regex : name , $options : "i"}},
                        {courseCode:{$regex : name , $options : "i"}}
                    ]
                }).select("-_id -__v")
                if(!course) res.sendStatus(404);
                else res.status(200).json(course);
            }catch(e){
                console.log(e);
                res.sendStatus(500);
            }
    }

    async getCouseById(req,res){
        const {id}=req.body;
        if(!id) res.sendStatus(400);
        try{
            const course=await courseReviewModel.findById(id).select("-_id -__v");
            if(!course) res.sendStatus(404);
            res.status(200).json(course);
        }catch(e){
            console.log(e);
            res.sendStatus(500);
        }
    }

    async getReviews(req,res){
        try{
            const courses=await courseReviewModel.find({}).select("-_id -__v");
            if(courses.length==0) res.sendStatus(404);
            else res.status(200).json(courses);
        }catch(e){
            console.log(e);
            res.sendStatus(500);
        }
    }


  
    async addCourseReview(req,res){
        const data =req.body;
        if (!data.courseName && !data.courseCode) res.sendStatus(400)
        try {
        const courseReviewData={
            courseCode:data.courseCode,
            courseName:data.courseName,
            professor:data.professor,
            description:data.description,
            rating:data.rating,
            
        }
        const courseReview=new courseReviewModel(courseReviewData);
        const newCourseReview=await courseReview.save();
        res.json(newCourseReview);

        } catch (error) {
            console.log(error.message);
            res.sendStatus(500);
        }
    }

    async addComments(req,res){
        const data=req.body
        if (!data.id || !data.comment ) res.sendStatus(400);
        try {
            const courseReview = await courseReviewModel.findById(data.id);
            if (!courseReview )res.sendStatus(404).json({"errorMessage":"Course Review doesn't exist"})
            courseReview.comments.push({
                user:user.req.user._id,
                comment:data.comment
            })
            const updatedCourseReview=await courseReview.save();
            res.json(updatedCourseReview);
        } catch (error) {
            console.log(error.message);
            res.sendStatus(500);
        }

    }

}

export default new courseReviewController;