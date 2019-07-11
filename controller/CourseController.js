const uModel = require("../model/CourseModel");
const Bcrypt = require("bcrypt");

function addCourse(req, res, next){
    console.log(req.body);
    uModel.COURSE_MODEL.create({
        coursename: req.body.coursename,
        coursedesc: req.body.coursedesc
    }).then(function(result){
        next();
    }).catch(function(err){
        console.log(err);
        next({
            "status": 500,
            "message": "Couldnot Add Course!!, Database Error!"
        });
    });
}

//getting all coursse
function getCourse(req, res, next){
    uModel.COURSE_MODEL.findAll({})
    .then(function(result){
        console.log(req.body);
        res.status(200);
        res.json(result);
    }).catch(function(err){
        console.log(err);
    })
}


//getting all course by id
function getCourseById(req, res, next){
    uModel.COURSE_MODEL.findAll({
        where:{courseId:req.params.cid}
    })
    .then(function(result){
        console.log(req.body);
        res.status(200);
        res.json(result);
    }).catch(function(err){
        console.log(err);
    })
}


//deleting all course
function deleteCourse(req, res, next){
    uModel.COURSE_MODEL.destroy({
        where: { courseId: req.params.cid }
    }).then(function(result){
        console.log(req.body);
        res.status(200);
        res.send({ "message": "Deleted Successfully!!" });
    }).catch(function(err){
        console.log(err);
    })
}

//updating all course
function updateCourse(req, res, next){
    console.log( req.params.cid );
    var course = {
        coursename: req.body.coursename,
        coursedesc: req.body.coursedesc
    }

    uModel.COURSE_MODEL.update(course, {
        where: { courseId: req.params.cid }
    }).then(function(result){
        console.log(req.body);
        res.send({ "message": "Updated Successfully!!" });
    }).catch(function(err){
        console.log(err);
    })
}



module.exports = {
    addCourse,
    getCourse,
    deleteCourse,
    updateCourse,
    getCourseById

}