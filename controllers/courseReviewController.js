import courseReviewModel from "../models/courseReviewModel.js";



class courseReviewController{

    async searchCourse(req,res){
        const name=req.params.name;
            if(!name) res.sendStatus(400);
            try{
                const course=await courseReviewModel.find({
                    $or:[
                        {courseName:{$regex : name , $options : "i"}},
                    ]
                }).select("-__v")
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
            const course=await courseReviewModel.findById(id).select("-__v");
            if(!course) res.sendStatus(404);
            res.status(200).json(course);
        }catch(e){
            console.log(e);
            res.sendStatus(500);
        }
    }

    async getReviews(req,res){
        try{
            const courses=await courseReviewModel.find({}).select("-__v");
            if(courses.length==0) res.sendStatus(404);
            else res.status(200).json(courses);
        }catch(e){
            console.log(e);
            res.sendStatus(500);
        }
    }


  
    async addCourseReview(req,res){
        const data =req.body;
        if (!data.courseName && !data.title) res.sendStatus(400)
        console.log(req.user);
        try {
         const courseReviewData={
            userName:data.userName,
            email:data.email,
            courseName:data.courseName,
            professor:data.professor,
            description:data.description,
            title:data.title
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
        console.log(req.user.name);
        const data=req.body
        if (!data.id || !data.comment ) res.sendStatus(400);
        try {
            const courseReview = await courseReviewModel.findById(data.id);
            if (!courseReview )res.sendStatus(404).json({"errorMessage":"Course Review doesn't exist"})
            courseReview.comments.push({
                id:req.user._id,
                name:req.user.name,
                url:req.user.url,
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
