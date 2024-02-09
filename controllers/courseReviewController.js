import courseReviewModel from "../models/courseReviewModel.js"


class courseReviewController{
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
            return res.json(updatedCourseReview);
        } catch (error) {
            console.log(error.message);
            res.sendStatus(500);
        }

    }

}

export default new courseReviewController;